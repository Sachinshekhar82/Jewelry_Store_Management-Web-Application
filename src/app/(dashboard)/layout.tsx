"use client";

import React, { useState } from "react";
import Link from "next/link";
import { logoutUser } from "@/app/(dashboard)/actions/auth";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                {/* Hamburger Toggle - Fixed to clear ticker and body */}
                <button
                    onClick={toggleSidebar}
                    className="hamburger-btn"
                    style={{
                        position: 'fixed',
                        top: '50px',
                        left: isCollapsed ? '20px' : '300px',
                        transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1000,
                        marginTop: '10px'
                    }}
                    title={isCollapsed ? "Open Menu" : "Close Menu"}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        {isCollapsed ? (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        ) : (
                            <path d="M18 6L6 18M6 6l12 12" />
                        )}
                    </svg>
                </button>

                {/* Sidebar Navigation */}
                <nav
                    className={`glass-panel sidebar-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}
                    style={{
                        width: "280px",
                        height: "calc(100vh - 70px)",
                        margin: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        position: "fixed",
                        top: "50px",
                        background: 'rgba(15, 23, 42, 0.95)',
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.05)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        padding: '30px 20px',
                        zIndex: 999
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-gold)" }}>
                            <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                            <path d="M2 9h20" />
                            <path d="M12 21L6 9" />
                            <path d="M12 21l6-12" />
                        </svg>
                        <h1 className="gold-gradient-text" style={{ fontSize: "2.8rem", letterSpacing: "8px", margin: 0 }}>
                            DRIP
                        </h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 700 }}>
                            Luxury Hub
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                        <Link href="/dashboard" className="btn-glass" style={{ justifyContent: "flex-start", padding: '14px 18px', border: '1px solid rgba(212, 175, 55, 0.1)', background: 'transparent' }}>
                            📊 Dashboard
                        </Link>
                        <Link href="/pos" className="btn-glass" style={{ justifyContent: "flex-start", padding: '14px 18px', border: '1px solid rgba(212, 175, 55, 0.1)', background: 'transparent' }}>
                            💎 Transaction Hub
                        </Link>
                        <Link href="/transactions" className="btn-glass" style={{ justifyContent: "flex-start", padding: '14px 18px', border: '1px solid rgba(212, 175, 55, 0.1)', background: 'transparent' }}>
                            🧾 Analytics & Reports
                        </Link>
                        <Link href="/customers" className="btn-glass" style={{ justifyContent: "flex-start", padding: '14px 18px', border: '1px solid rgba(212, 175, 55, 0.1)', background: 'transparent' }}>
                            👥 Customer Matrix
                        </Link>
                        <div style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.1)', margin: '12px 0' }}></div>
                        <Link href="/settings" className="btn-glass" style={{ justifyContent: "flex-start", padding: '14px 18px', border: 'none', background: 'transparent', opacity: 0.7 }}>
                            ⚙️ Realtime Config
                        </Link>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                        <form action={logoutUser}>
                            <button type="submit" className="btn-glass" style={{ width: "100%", justifyContent: "center", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                                🚪 Logout
                            </button>
                        </form>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main
                    className="main-content"
                    style={{
                        flex: 1,
                        padding: "60px",
                        paddingLeft: isCollapsed ? "60px" : "340px",
                        width: "100%",
                        marginTop: '40px',
                        transition: 'padding-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
