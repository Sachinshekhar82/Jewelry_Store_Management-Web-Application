"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeTransaction(data: {
    customerName: string;
    customerPhone?: string;
    customerEmail?: string;
    customerAddress?: string;
    items: {
        itemName: string;
        type: string;
        carat?: number;
        weight: number;
        ratePerGram: number;
        makingCharge: number;
        totalPrice: number;
    }[];
    totalAmount: number;
    discount: number;
    finalAmount: number;
    paymentMethod: string;
}) {
    try {
        // Use a Prisma transaction to ensure data integrity
        const result = await prisma.$transaction(async (tx) => {
            // 1. Find or create customer
            let customerId = null;
            if (data.customerName) {
                const customer = await tx.customer.upsert({
                    where: {
                        // Note: If you don't have a unique field like phone, 
                        // you might want to search by phone or just create.
                        // For simplicity in this demo, we'll try to find by phone if provided.
                        phone: data.customerPhone || "UNKNOWN"
                    },
                    update: {
                        name: data.customerName,
                        email: data.customerEmail || null,
                        address: data.customerAddress || null,
                    },
                    create: {
                        name: data.customerName,
                        phone: data.customerPhone || null,
                        email: data.customerEmail || null,
                        address: data.customerAddress || null,
                    },
                });
                customerId = customer.id;
            }

            // 2. Create the transaction
            const transaction = await tx.transaction.create({
                data: {
                    customerId: customerId,
                    totalAmount: data.totalAmount,
                    discount: data.discount,
                    finalAmount: data.finalAmount,
                    paymentMethod: data.paymentMethod,
                    items: {
                        create: data.items.map(item => ({
                            itemName: item.itemName,
                            type: item.type,
                            carat: item.carat,
                            weight: item.weight,
                            ratePerGram: item.ratePerGram,
                            makingCharge: item.makingCharge,
                            totalPrice: item.totalPrice,
                        }))
                    }
                }
            });

            return transaction;
        });

        revalidatePath("/");
        revalidatePath("/transactions");
        revalidatePath("/customers");

        return { success: true, transactionId: result.id };
    } catch (error: unknown) {
        console.error("Transaction Error:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to complete transaction" };
    }
}
