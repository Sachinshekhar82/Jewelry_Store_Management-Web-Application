"use client";

import React, { useState, useEffect } from "react";
import { getLiveAnalytics } from "@/app/(dashboard)/actions/analytics";

export default function AnalyticsEngine() {
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
        const interval = setInterval(loadStats, 30000); // 30s heartbeat
        return () => clearInterval(interval);
    }, []);

    // totalRevenue is unused
    const totalCount = Object.values(stats).reduce((acc, curr) => acc + curr.count, 0);
    const maxRevenue = Math.max(...Object.values(stats).map(s => s.revenue), 1);

    // Calculate Pie Chart segments (CSS Conic Gradient)
    let cumulativePercent = 0;
    const segments = Object.entries(stats)
        .filter(([, data]) => data.count > 0)
        .map(([type, data]) => {
            const percent = (data.count / (totalCount || 1)) * 100;
            const start = cumulativePercent;
            cumulativePercent += percent;
            return { type, start, end: cumulativePercent, color: getColor(type) };
        });

    const conicGradient = segments.length > 0
        ? `conic-gradient(${segments.map(s => `${s.color} ${s.start}% ${s.end}%`).join(', ')})`
        : 'rgba(255,255,255,0.05)';

    function getColor(type: string) {
        switch (type) {
            case 'GOLD': return '#fbbf24';
            case 'SILVER': return '#38bdf8';
            case 'PLATINUM': return '#94a3b8';
            case 'PALLADIUM': return '#64748b';
            default: return '#ccc';
        }
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Revenue Bar Chart (Financial Yield) */}
            <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(251, 191, 36, 0.1)' }}>
                <h3 className="gold-gradient-text" style={{ fontSize: '1.2rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Financial Yield</h3>
                <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 10px' }}>
                    {Object.entries(stats).map(([type, data]) => (
                        <div key={type} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                            <div
                                style={{
                                    width: '100%',
                                    height: `${(data.revenue / maxRevenue) * 100}%`,
                                    background: getColor(type),
                                    borderRadius: '6px 6px 0 0',
                                    boxShadow: `0 0 15px ${getColor(type)}44`,
                                    transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative'
                                }}
                                title={`₹${data.revenue.toLocaleString()}`}
                            >
                                {data.revenue > 0 && (
                                    <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 800 }}>
                                        ₹{(data.revenue / 1000).toFixed(1)}k
                                    </div>
                                )}
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.7 }}>{type.slice(0, 4)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transaction Mix (Pie Chart) */}
            <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
                <h3 className="blue-gradient-text" style={{ fontSize: '1.2rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Transaction Mix</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '50%',
                        background: conicGradient,
                        boxShadow: '0 0 30px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.05)',
                        border: '4px solid rgba(15, 23, 42, 0.5)',
                        position: 'relative'
                    }}>
                        {/* Inner Hole for Donut Look */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '70px',
                            height: '70px',
                            background: 'var(--bg-primary)',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                        }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{totalCount}</span>
                            <span style={{ fontSize: '0.5rem', opacity: 0.5, letterSpacing: '1px' }}>TXNS</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                        {Object.entries(stats).map(([type, data]) => {
                            const percent = totalCount > 0 ? ((data.count / totalCount) * 100).toFixed(0) : 0;
                            return (
                                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: getColor(type) }} />
                                    <span style={{ flex: 1, opacity: 0.8 }}>{type}</span>
                                    <span style={{ fontWeight: 700 }}>{percent}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
