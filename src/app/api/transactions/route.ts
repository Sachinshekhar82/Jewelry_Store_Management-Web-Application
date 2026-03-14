import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                customer: true,
                items: true
            }
        });
        return NextResponse.json(transactions);
    } catch {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}
