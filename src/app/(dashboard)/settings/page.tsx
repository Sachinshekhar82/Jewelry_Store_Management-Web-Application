"use client";
import { useState } from "react";

export default function SettingsPage() {
    const [rate24, setRate24] = useState("7500");
    const [rate22, setRate22] = useState("6875");
    const [rate18, setRate18] = useState("5625");

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="title-glow">Settings & Prices</h1>
                    <p style={{ color: "var(--text-secondary)" }}>Update daily gold rates and system preferences</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                {/* Daily Rates Panel */}
                <div className="glass-panel">
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Daily Market Rates (per gram)</h2>

                    <div className="form-group">
                        <label className="form-label text-gold">24K Gold Rate</label>
                        <input
                            type="number"
                            className="input-glass"
                            value={rate24}
                            onChange={(e) => setRate24(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">22K Gold Rate</label>
                        <input
                            type="number"
                            className="input-glass"
                            value={rate22}
                            onChange={(e) => setRate22(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">18K Gold Rate</label>
                        <input
                            type="number"
                            className="input-glass"
                            value={rate18}
                            onChange={(e) => setRate18(e.target.value)}
                        />
                    </div>

                    <button className="btn-primary" style={{ marginTop: "16px" }}>
                        Save Rates
                    </button>
                </div>

                {/* Shop Profile Panel */}
                <div className="glass-panel">
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Shop Profile</h2>

                    <div className="form-group">
                        <label className="form-label">Shop Name</label>
                        <input
                            type="text"
                            className="input-glass"
                            defaultValue="Aura Premium Jewelry"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Address / Registration Info</label>
                        <textarea
                            className="input-glass"
                            rows={3}
                            defaultValue="123 Luxury Avenue, Diamond District&#10;Tax ID: XX-XXXXXXX"
                        />
                    </div>

                    <button className="btn-primary" style={{ marginTop: "16px" }}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
