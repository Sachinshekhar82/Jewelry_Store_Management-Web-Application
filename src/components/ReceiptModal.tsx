/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: {
        id: string;
        customerName: string;
        customerPhone?: string;
        customerEmail?: string;
        customerAddress?: string;
        items: any[];
        totalAmount: number;
        discount: number;
        finalAmount: number;
        paymentMethod: string;
        createdAt: Date;
    } | null;
}

export default function ReceiptModal({ isOpen, onClose, transaction }: ReceiptModalProps) {
    React.useEffect(() => {
        if (isOpen && transaction) {
            // Short delay to ensure modal content is rendered before print dialog pops up
            const timer = setTimeout(() => {
                window.print();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, transaction]);

    if (!isOpen || !transaction) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="modal-overlay">
            <div className="glass-panel" style={{
                width: '420px',
                padding: '0',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                position: 'relative',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.2)'
            }}>
                {/* Print Content */}
                <div id="receipt-capture" style={{ padding: '40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <h1 className="blue-gradient-text" style={{ fontSize: '2.5rem', margin: 0, letterSpacing: '6px' }}>DRIP</h1>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: '4px 0', letterSpacing: '2px' }}>EXQUISITE JEWELRY HUB</p>
                        <div style={{ borderBottom: '1px dashed var(--glass-border)', margin: '20px 0' }}></div>
                    </div>

                    <div style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ opacity: 0.6 }}>Receipt No:</span>
                            <span style={{ fontWeight: 600 }}>#{transaction.id.slice(-10).toUpperCase()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ opacity: 0.6 }}>Date:</span>
                            <span>{new Date(transaction.createdAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
                        <h4 className="blue-gradient-text" style={{ marginBottom: '8px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer Profile</h4>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{transaction.customerName}</p>
                        <div style={{ marginTop: '6px', opacity: 0.8, lineHeight: '1.4' }}>
                            {transaction.customerPhone && <p style={{ margin: 0 }}>📞 {transaction.customerPhone}</p>}
                            {transaction.customerEmail && <p style={{ margin: 0 }}>✉️ {transaction.customerEmail}</p>}
                            {transaction.customerAddress && <p style={{ margin: 0 }}>🏠 {transaction.customerAddress}</p>}
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Purchased Items</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {transaction.items.map((item, idx) => (
                                <div key={idx} style={{ fontSize: '0.85rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
                                        <span>{item.itemName}</span>
                                        <span>₹{item.totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '2px' }}>
                                        {item.weight}g {item.type} {item.carat ? `(${item.carat}K)` : ''} @ ₹{item.ratePerGram}/g
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ opacity: 0.6 }}>Subtotal</span>
                            <span>₹{transaction.totalAmount.toLocaleString()}</span>
                        </div>
                        {transaction.discount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#4ade80' }}>
                                <span>Discount Redeemed</span>
                                <span>-₹{transaction.discount.toLocaleString()}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            <span>Amount Paid</span>
                            <span className="blue-gradient-text">₹{transaction.finalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '0.75rem', opacity: 0.5 }}>
                        <p style={{ marginBottom: '4px' }}>Transaction settled via {transaction.paymentMethod}</p>
                        <p>Authenticity guaranteed by DRIP Collective.</p>
                    </div>
                </div>

                {/* Modal Actions - Hidden during print */}
                <div id="modal-actions" className="no-print" style={{ display: 'flex', gap: '12px', padding: '24px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '0 0 16px 16px' }}>
                    <button onClick={handlePrint} className="btn-primary" style={{ flex: 1 }}>🖨️ Print Receipt</button>
                    <button onClick={onClose} className="btn-glass" style={{ flex: 1 }}>Close Window</button>
                </div>
            </div>

            <style jsx>{`
                /* Some local overrides if needed, but print handled globally */
                .modal-overlay {
                    transition: opacity 0.3s ease;
                }
            `}</style>
        </div>
    );
}
