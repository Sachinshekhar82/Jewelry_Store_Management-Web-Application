"use client";

import React, { useState, useEffect } from "react";
import { fetchPrices } from "@/app/(dashboard)/actions/prices";

export default function PriceTicker() {
    type PricesData = {
        gold: Record<number, number>;
        silver: number;
        platinum: number;
        palladium: number;
    };
    const [prices, setPrices] = useState<PricesData | null>(null);

    useEffect(() => {
        const loadPrices = async () => {
            try {
                const data = await fetchPrices();
                setPrices(data);
            } catch (error) {
                console.error("Ticker fetch error:", error);
            }
        };
        loadPrices();
        // Strict 1-minute refresh
        const interval = setInterval(loadPrices, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (!prices) return (
        <div className="ticker-wrap">
            <div className="ticker">
                <div className="ticker-item">Fetching Live Market Rates...</div>
            </div>
        </div>
    );

    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {[1, 2].map((i) => (
                    <React.Fragment key={i}>
                        <div className="ticker-item">
                            <span className="gold-gradient-text">GOLD 24K:</span>
                            <span style={{ marginLeft: '8px', color: 'white' }}>₹{prices.gold[24].toLocaleString()}/g</span>
                        </div>
                        <div className="ticker-item">
                            <span className="gold-gradient-text">GOLD 22K:</span>
                            <span style={{ marginLeft: '8px', color: 'white' }}>₹{prices.gold[22].toLocaleString()}/g</span>
                        </div>
                        <div className="ticker-item">
                            <span className="gold-gradient-text">GOLD 18K:</span>
                            <span style={{ marginLeft: '8px', color: 'white' }}>₹{prices.gold[18].toLocaleString()}/g</span>
                        </div>
                        <div className="ticker-item">
                            <span className="blue-gradient-text">SILVER 999:</span>
                            <span style={{ marginLeft: '8px', color: 'white' }}>₹{prices.silver.toLocaleString()}/g</span>
                        </div>
                        <div className="ticker-item">
                            <span className="blue-gradient-text">PLATINUM 950:</span>
                            <span style={{ marginLeft: '8px', color: 'white' }}>₹{prices.platinum.toLocaleString()}/g</span>
                        </div>
                        <div className="ticker-item">
                            <span className="blue-gradient-text" style={{ filter: 'grayscale(1)' }}>PALLADIUM:</span>
                            <span style={{ marginLeft: '8px', color: 'white' }}>₹{prices.palladium.toLocaleString()}/g</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
