"use client";

import { useState } from "react";
import { addCustomer } from "@/app/(dashboard)/actions/customers";

export default function AddCustomerBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const result = await addCustomer(formData);

        if (result.success) {
            setIsOpen(false);
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    return (
        <>
            <button className="btn-primary" onClick={() => setIsOpen(true)}>
                <span style={{ fontSize: "1.2rem" }}>+</span> Add Customer
            </button>

            {isOpen && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                    justifyContent: 'center', alignItems: 'center', zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }}>
                    <div className="glass-panel" style={{ width: '400px', padding: '32px' }}>
                        <h2 style={{ marginBottom: '24px' }}>New Customer</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input name="name" className="input-glass" required placeholder="Full Name" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number *</label>
                                <input name="phone" className="input-glass" required placeholder="Unique Phone No." />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input name="email" type="email" className="input-glass" placeholder="Email Address" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <textarea name="address" className="input-glass" rows={3} placeholder="Address" style={{ background: 'transparent', resize: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={loading}>
                                    {loading ? "Adding..." : "Save Customer"}
                                </button>
                                <button type="button" className="btn-glass" style={{ flex: 1 }} onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
