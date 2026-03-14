"use client";

import React, { useState, useEffect } from "react";
import { getLiveAnalytics } from "@/app/(dashboard)/actions/analytics";

export default function LiveInventoryChart() {
    const [stats, setStats] = useState<Record<string, { revenue: number, count: number }>>({
        GOLD: { revenue: 0, count: 0 },
        SILVER: { revenue: 0, count: 0 },
        PLATINUM: { revenue: 0, count: 0 },
        PALLADIUM: { revenue: 0, count: 0 }
    });

    const loadStats = async () => {
        const data = await getLiveAnalytics();
        setStats(data);
    };

    useEffect(() => {
        loadStats();
        const interval = setInterval(loadStats, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const maxVal = Math.max(...Object.values(stats).map(s => s.revenue), 1);

    return (
        <div className="chart-container" style={{ paddingTop: '10px' }}>
            {Object.entries(stats).map(([type, data]) => (
                <div key={type} className="chart-bar-wrap">
                    <div
                        className="chart-bar"
                        style={{
                            height: `${(data.revenue / maxVal) * 100}%`,
                            background: type === 'GOLD' ? 'var(--accent-gold)' : 'linear-gradient(to top, #0ea5e9, #38bdf8)',
                            transition: 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        title={`₹${data.revenue.toLocaleString()}`}
                    />
                    <span className="chart-label" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{type}</span>
                </div>
            ))}
        </div>
    );
}
