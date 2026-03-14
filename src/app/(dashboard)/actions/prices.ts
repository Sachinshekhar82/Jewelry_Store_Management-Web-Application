"use server";

import { getLiveMetalPrices } from "@/services/metalPrices";

export async function fetchPrices() {
    return await getLiveMetalPrices();
}
