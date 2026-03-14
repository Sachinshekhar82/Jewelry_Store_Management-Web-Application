// src/services/metalPrices.ts

export type MetalPrices = {
    gold: {
        24: number;
        22: number;
        18: number;
    };
    silver: number;    // per gram
    platinum: number;  // per gram
    palladium: number; // per gram
    lastUpdated: Date;
};

// Fallback rates - Minimal use, strictly for system stability
const FALLBACK_RATES: MetalPrices = {
    gold: { 24: 7500, 22: 6875, 18: 5625 },
    silver: 90,
    platinum: 4500,
    palladium: 3500,
    lastUpdated: new Date()
};

let cachedPrices: MetalPrices | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute for strict real-time accuracy

export async function getLiveMetalPrices(): Promise<MetalPrices> {
    const apiKey = process.env.METAL_API_KEY;

    if (cachedPrices && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return cachedPrices;
    }

    if (!apiKey || apiKey.trim() === '') {
        console.warn("CRITICAL: No METAL_API_KEY found. Market data is NOT live.");
        return FALLBACK_RATES;
    }

    try {
        console.log(`[${new Date().toLocaleTimeString()}] Fetching FRESH live metal prices...`);
        // Fetching Gold, Silver, Platinum, and Palladium
        const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=INR,XAU,XAG,XPT,XPD`;

        const response = await fetch(url, {
            cache: 'no-store', // Bypass cache completely for ticker/POS
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.rates) {
            console.error("API returned failure:", data);
            throw new Error("API returned invalid data");
        }

        console.log(`[${new Date().toLocaleTimeString()}] Live Rates Received: XAU=${data.rates.XAU}, XAG=${data.rates.XAG}`);

        // 1 Troy Ounce = 31.1034768 grams
        const gramsPerOz = 31.1034768;

        const goldInrPerOz = 1 / data.rates.XAU;
        const silverInrPerOz = 1 / data.rates.XAG;
        const platInrPerOz = 1 / data.rates.XPT;
        const palInrPerOz = 1 / data.rates.XPD;

        const gold24kPerGram = goldInrPerOz / gramsPerOz;
        const silverPerGram = silverInrPerOz / gramsPerOz;
        const platPerGram = platInrPerOz / gramsPerOz;
        const palPerGram = palInrPerOz / gramsPerOz;

        const livePrices: MetalPrices = {
            gold: {
                24: Math.round(gold24kPerGram),
                22: Math.round(gold24kPerGram * (22 / 24)),
                18: Math.round(gold24kPerGram * (18 / 24)),
            },
            silver: Math.round(silverPerGram),
            platinum: Math.round(platPerGram),
            palladium: Math.round(palPerGram),
            lastUpdated: new Date()
        };

        cachedPrices = livePrices;
        lastFetchTime = Date.now();

        return livePrices;
    } catch (error) {
        console.error("METAL API FAILURE:", error);
        // If we have any cache, use it even if expired rather than hardcoded fallbacks
        return cachedPrices || FALLBACK_RATES;
    }
}
