"use client";

// This page would be where users change their password.
// For now, it's a placeholder to satisfy the user request.

export default function ProfilePage() {
    return (
        <div className="animate-fade-in">
            <h1 className="gold-gradient-text" style={{ fontSize: "2.5rem", marginBottom: "24px" }}>Account Settings</h1>

            <div className="glass-panel" style={{ padding: "32px", maxWidth: "600px" }}>
                <h3 style={{ color: "var(--accent-gold)", marginBottom: "16px" }}>Manage Profile</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                    Welcome to your profile. Here you can manage your credentials and store information.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input className="input-glass" defaultValue="Store Member" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Change Password</label>
                        <input type="password" title="password" className="input-glass" placeholder="New Password" />
                    </div>

                    <button className="btn-primary" style={{ width: "fit-content" }}>
                        Update Account
                    </button>
                </div>
            </div>
        </div>
    );
}
