"use server";

import prisma from "@/lib/prisma";

export async function getLiveAnalytics() {
    try {
        const transactions = await prisma.transaction.findMany({
            include: { items: true }
        });

        const typeStats: Record<string, { revenue: number, count: number }> = {
            GOLD: { revenue: 0, count: 0 },
            SILVER: { revenue: 0, count: 0 },
            PLATINUM: { revenue: 0, count: 0 },
            PALLADIUM: { revenue: 0, count: 0 }
        };

        transactions.forEach((t: { items: Array<{ type?: string | null; totalPrice: number }> }) => {
            t.items.forEach((item: { type?: string | null; totalPrice: number }) => {
                if (!item.type) return;
                const type = item.type.toUpperCase();
                if (typeStats[type]) {
                    typeStats[type].revenue += item.totalPrice;
                    typeStats[type].count += 1;
                }
            });
        });

        return typeStats;
    } catch (error) {
        console.error("Failed to fetch live analytics:", error);
        return {
            GOLD: { revenue: 0, count: 0 },
            SILVER: { revenue: 0, count: 0 },
            PLATINUM: { revenue: 0, count: 0 },
            PALLADIUM: { revenue: 0, count: 0 }
        };
    }
}
