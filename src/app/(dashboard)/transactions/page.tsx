"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Transaction {
    id: string;
    createdAt: string;
    customer?: { name: string; phone?: string };
    paymentMethod: string;
    finalAmount: number;
    items: { itemName: string; type: string; weight: number; carat?: number; ratePerGram: number; makingCharge: number; totalPrice: number }[];
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filter, setFilter] = useState("all"); // all, weekly, monthly, custom
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDetailed, setShowDetailed] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch("/api/transactions");
            const data = await res.json();
            setTransactions(data);
            setLoading(false);
        };
        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter(t => {
        const date = new Date(t.createdAt);
        const now = new Date();

        if (filter === "custom") {
            if (startDate && date < new Date(startDate)) return false;
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                if (date > end) return false;
            }
            return true;
        }

        if (filter === "all") return true;

        if (filter === "weekly") {
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return date >= oneWeekAgo;
        }
        if (filter === "monthly") {
            const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return date >= oneMonthAgo;
        }
        return true;
    });

    const totalRevenue = filteredTransactions.reduce((acc, t) => acc + t.finalAmount, 0);

    const handlePrint = () => {
        setShowDetailed(true);
        setTimeout(() => {
            window.print();
        }, 300);
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>Loading Shop Intel...</div>;

    return (
        <div className="animate-fade-in printable-report">
            <div className="page-header no-print" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="gold-gradient-text" style={{ fontSize: '3.5rem', marginBottom: '8px' }}>Sales Audit</h1>
                    <p style={{ color: "var(--text-secondary)", textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Detailed Transaction Logs & Reporting</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="checkbox"
                            className="no-print"
                            id="detailed-toggle"
                            checked={showDetailed}
                            onChange={(e) => setShowDetailed(e.target.checked)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="detailed-toggle" style={{ fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>Itemized View</label>
                    </div>

                    {filter === "custom" && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input type="date" className="input-glass" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: '8px', width: '140px' }} />
                            <input type="date" className="input-glass" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: '8px', width: '140px' }} />
                        </div>
                    )}
                    <select
                        className="input-glass"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ width: 'auto', padding: '10px 20px' }}
                    >
                        <option value="all">Lifetime Audit</option>
                        <option value="weekly">Weekly Audit</option>
                        <option value="monthly">Monthly Audit</option>
                        <option value="custom">Range Selection</option>
                    </select>
                    <button onClick={handlePrint} className="btn-primary">
                        🖨️ PRINT REPORT
                    </button>
                </div>
            </div>

            {/* Print Only Header */}
            <div className="print-only" style={{ display: 'none', textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: 'black' }}>DRIP JEWELRY HUB</h1>
                <p style={{ letterSpacing: '8px', fontSize: '0.9rem', opacity: 0.8, margin: 0, color: 'black' }}>OFFICIAL SALES AUDIT REPORT</p>
                <div style={{ borderBottom: '3px solid black', margin: '30px 0' }}></div>
            </div>

            {/* Summary Panel */}
            <div className="glass-panel" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }} className="no-print">Active Period</h4>
                    <p style={{ fontWeight: 700, fontSize: '1.4rem', margin: 0 }}>
                        {filter === 'all' ? 'LIFETIME AUDIT' : filter === 'weekly' ? 'WEEKLY SALES AUDIT' : filter === 'monthly' ? 'MONTHLY SALES AUDIT' : 'TEMPORAL RANGE AUDIT'}
                    </p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '4px' }}>Generated: {new Date().toLocaleString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }} className="no-print">Total Volume</h4>
                    <h2 className="gold-gradient-text" style={{ fontSize: '2.8rem', margin: 0 }}>₹{totalRevenue.toLocaleString()}</h2>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '4px' }}>{filteredTransactions.length} Records</p>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: showDetailed ? '0' : '24px' }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--glass-border)" }}>
                            <th style={{ padding: "16px" }}>TXID</th>
                            <th style={{ padding: "16px" }}>DATE</th>
                            <th style={{ padding: "16px" }}>CUSTOMER</th>
                            <th style={{ padding: "16px" }}>METHOD</th>
                            <th style={{ padding: "16px", textAlign: 'right' }}>VALUATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: "60px", textAlign: "center", color: "var(--text-secondary)", fontStyle: 'italic' }}>
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            filteredTransactions.map((t) => (
                                <React.Fragment key={t.id}>
                                    <tr style={{ borderBottom: showDetailed ? "none" : "1px solid rgba(255,255,255,0.03)" }}>
                                        <td style={{ padding: "16px", opacity: 0.5, fontSize: '0.8rem' }}>#{t.id.slice(-8).toUpperCase()}</td>
                                        <td style={{ padding: "16px", fontSize: '0.9rem' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{t.customer?.name || "Walk-in Guest"}</div>
                                        </td>
                                        <td style={{ padding: "16px" }}><span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{t.paymentMethod}</span></td>
                                        <td style={{ padding: "16px", textAlign: 'right', fontWeight: '800' }} className="gold-gradient-text">
                                            ₹{t.finalAmount.toLocaleString()}
                                        </td>
                                    </tr>
                                    {showDetailed && (
                                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                                            <td colSpan={5} style={{ padding: '0 16px 24px 16px' }}>
                                                <div style={{
                                                    background: 'rgba(56, 189, 248, 0.03)',
                                                    padding: '20px',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(56, 189, 248, 0.08)'
                                                }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                                        {t.items.map((item, idx) => (
                                                            <div key={idx} style={{ fontSize: '0.85rem' }}>
                                                                <div style={{ fontWeight: 700 }}>{item.itemName}</div>
                                                                <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>
                                                                    {item.weight}g {item.type} {item.carat ? `${item.carat}K` : ''}
                                                                </div>
                                                                <div style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>₹{item.totalPrice?.toLocaleString()}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
