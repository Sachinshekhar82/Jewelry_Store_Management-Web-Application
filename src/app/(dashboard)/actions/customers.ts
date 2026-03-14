/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCustomer(formData: FormData) {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;

    if (!name) return { error: "Name is required" };

    try {
        await prisma.customer.create({
            data: {
                name,
                phone: phone || null,
                email: email || null,
                address: address || null,
            },
        });
        revalidatePath("/customers");
        return { success: true };
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return { error: "A customer with this phone number already exists." };
        }
        return { error: error instanceof Error ? error.message : "Failed to add customer" };
    }
}

export async function fetchCustomers() {
    try {
        return await prisma.customer.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { transactions: true }
                }
            }
        });
    } catch (error) {
        console.error("Fetch Customers Error:", error);
        return [];
    }
}
