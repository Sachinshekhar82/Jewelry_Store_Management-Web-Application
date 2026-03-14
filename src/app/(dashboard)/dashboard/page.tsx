import AnalyticsEngine from "@/components/AnalyticsEngine";
import { getLiveMetalPrices } from "@/services/metalPrices";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 0; // Ensure live data

export default async function DashboardPage() {
    const prices = await getLiveMetalPrices();

    // Fetch fresh data for transactions
    const recentTransactions = await prisma.transaction.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: {
            customer: true,
            items: true
        }
    });

    const allTransactions = await prisma.transaction.findMany();

    // Calculate stats
    const totalRevenue = allTransactions.reduce((acc: number, curr: any) => acc + (curr as any).finalAmount, 0);
    const totalCount = allTransactions.length;

    // Weekly revenue
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyTransactions = allTransactions.filter((t: any) => new Date(t.createdAt) >= oneWeekAgo);
    const weeklyRevenue = weeklyTransactions.reduce((acc: number, curr: any) => acc + (curr as any).finalAmount, 0);

    return (
        <div className="animate-fade-in" style={{ position: 'relative' }}>
            {/* Top Right "New Transaction" Button */}
            <div style={{ position: 'absolute', top: '-10px', right: '0' }}>
                <Link href="/pos" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)', border: '1px solid var(--accent-gold)' }}>
                    <span style={{ fontSize: "1.2rem", marginRight: '8px' }}>+</span> New Transaction
                </Link>
            </div>

            <div className="page-header" style={{ marginTop: '20px', marginBottom: '40px' }}>
                <div>
                    <h1 className="gold-gradient-text" style={{ fontSize: '3.8rem', marginBottom: '4px', letterSpacing: '-1px' }}>Dashboard</h1>
                    <p style={{ color: "var(--text-secondary)", letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
                        Unified Shop Control & Market Intel
                    </p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="glass-panel">
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "8px" }}>Weekly Performance</p>
                        <h2 className="blue-gradient-text" style={{ fontSize: "2.8rem" }}>₹{weeklyRevenue.toLocaleString()}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4ade80', fontSize: '0.8rem' }}>
                            <span style={{ fontWeight: 700 }}>LIVE TRACKING</span>
                        </div>
                    </div>

                    <div className="glass-panel">
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "8px" }}>Total Volume</p>
                        <h2 className="gold-gradient-text" style={{ fontSize: "2.8rem" }}>₹{totalRevenue.toLocaleString()}</h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{totalCount} total orders</p>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '0', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                    <AnalyticsEngine />
                </div>
            </div>

            {/* Activity Table */}
            <div className="glass-panel" style={{ border: '1px solid rgba(251, 191, 36, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 className="gold-gradient-text" style={{ fontSize: '1.5rem' }}>Live Transaction Stream</h3>
                    <Link href="/transactions" className="btn-glass" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>Full Audit History →</Link>
                </div>

                {recentTransactions.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>
                        <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>Awaiting first transaction of the session...</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                                    <th>TXID</th>
                                    <th>Customer Profile</th>
                                    <th>Composition</th>
                                    <th>Settlement</th>
                                    <th style={{ textAlign: 'right' }}>Valuation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((t: any) => (
                                    <tr key={t.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: 'background 0.3s ease' }}>
                                        <td style={{ opacity: 0.5, fontSize: '0.8rem' }}>#{t.id.slice(-8).toUpperCase()}</td>
                                        <td>
                                            <div style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{t.customer?.name || "Walk-in Guest"}</div>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{new Date(t.createdAt).toLocaleString()}</div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                {Array.from(new Set(t.items.map((i: any) => i.type))).map((type: any, idx: number) => (
                                                    <span key={idx} className="badge" style={{ fontSize: '0.6rem', padding: '2px 8px', borderColor: type === 'GOLD' ? 'var(--accent-gold)' : 'var(--glass-border)' }}>{type}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td><span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{t.paymentMethod}</span></td>
                                        <td style={{ textAlign: 'right', fontWeight: '800' }} className="gold-gradient-text">₹{t.finalAmount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
