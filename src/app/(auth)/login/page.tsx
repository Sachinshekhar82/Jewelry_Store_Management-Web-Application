"use client";

import { useState } from "react";
import { loginUser } from "@/app/(dashboard)/actions/auth";
import Link from "next/link";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        const result = await loginUser(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
        // On success, middleware/redirect handles navigation natively
    }

    return (
        <div className="animate-fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative" }}>

            {/* Background Ambience Glow */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60vw",
                height: "60vh",
                background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
                zIndex: -1,
                pointerEvents: "none"
            }} />

            <div className="glass-panel" style={{ width: "100%", maxWidth: "440px", padding: "48px 40px" }}>

                <div style={{ textAlign: "center", marginBottom: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-gold)" }}>
                        <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                        <path d="M2 9h20" />
                        <path d="M12 21L6 9" />
                        <path d="M12 21l6-12" />
                        <path d="M6 3l6 6" />
                        <path d="M18 3l-6 6" />
                    </svg>
                    <h1 className="gold-gradient-text" style={{ fontSize: "2.5rem", letterSpacing: "4px", margin: 0 }}>DRIP</h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>Welcome back. Sign in to your shop.</p>
                </div>

                <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="input-glass"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group" style={{ position: "relative" }}>
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="input-glass"
                            placeholder="••••••••"
                            style={{ paddingRight: "40px" }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: "absolute", right: "12px", top: "38px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {error && (
                        <div style={{ color: "#ef4444", fontSize: "0.9rem", textAlign: "center", padding: "8px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ width: "100%", marginTop: "8px", padding: "14px", fontSize: "1.05rem" }}
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>

                </form>

                <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--glass-border)" }}>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" style={{ color: "var(--accent-gold)", textDecoration: "none", fontWeight: 600 }}>
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
