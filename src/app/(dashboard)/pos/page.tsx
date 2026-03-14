/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchPrices } from "@/app/(dashboard)/actions/prices";
import { MetalPrices } from "@/services/metalPrices";
import { completeTransaction } from "@/app/(dashboard)/actions/transactions";
import ReceiptModal from "@/components/ReceiptModal";

export default function PointOfSale() {
    const [prices, setPrices] = useState<MetalPrices | null>(null);
    const [metalCategory, setMetalCategory] = useState<"gold" | "silver" | "platinum" | "palladium">("gold");
    const [purity, setPurity] = useState<number>(22);
    const [weight, setWeight] = useState<string>("");
    const [makingCharge, setMakingCharge] = useState<string>("0");
    const [discount, setDiscount] = useState<string>("0");
    const [itemName, setItemName] = useState<string>("");

    // Customer State
    const [customerName, setCustomerName] = useState<string>("");
    const [customerPhone, setCustomerPhone] = useState<string>("");
    const [customerEmail, setCustomerEmail] = useState<string>("");
    const [customerAddress, setCustomerAddress] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("CASH");

    const [subTotal, setSubTotal] = useState<number>(0);
    const [finalTotal, setFinalTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    // Receipt State
    const [showReceipt, setShowReceipt] = useState(false);
    const [lastTransaction, setLastTransaction] = useState<any>(null);

    useEffect(() => {
        const getPrices = async () => {
            const data = await fetchPrices();
            setPrices(data);
            setLoading(false);
        };
        getPrices();
    }, []);

    const getCurrentRate = useCallback(() => {
        if (!prices) return 0;
        if (metalCategory === "gold") {
            return prices.gold[purity as 24 | 22 | 18] || 0;
        } else if (metalCategory === "silver") {
            return prices.silver;
        } else if (metalCategory === "platinum") {
            return prices.platinum;
        } else if (metalCategory === "palladium") {
            return prices.palladium;
        }
        return 0;
    }, [prices, metalCategory, purity]);

    useEffect(() => {
        const w = parseFloat(weight) || 0;
        const rate = getCurrentRate();
        const mc = parseFloat(makingCharge) || 0;
        const disc = parseFloat(discount) || 0;

        const metalValue = w * rate;
        const totalMC = mc;
        const st = metalValue + totalMC;
        setSubTotal(st);
        setFinalTotal(st - disc);
    }, [weight, makingCharge, discount, getCurrentRate]);

    const handleCategorySelect = (cat: "gold" | "silver" | "platinum" | "palladium") => {
        setMetalCategory(cat);
        if (cat === "gold") setPurity(22);
        if (cat === "silver") setPurity(999);
        if (cat === "platinum") setPurity(950);
        if (cat === "palladium") setPurity(950);
    };

    const handleSubmit = async () => {
        if (!weight || !customerName) {
            alert("Please provide weight and customer name.");
            return;
        }

        setProcessing(true);
        const transactionData = {
            customerName,
            customerPhone,
            customerEmail,
            customerAddress,
            items: [{
                itemName: itemName || `${purity}K ${metalCategory} Ornament`,
                type: metalCategory.toUpperCase(),
                carat: metalCategory === 'gold' ? purity : undefined,
                weight: parseFloat(weight),
                ratePerGram: getCurrentRate(),
                makingCharge: parseFloat(makingCharge) || 0,
                totalPrice: subTotal
            }],
            totalAmount: subTotal,
            discount: parseFloat(discount) || 0,
            finalAmount: finalTotal,
            paymentMethod
        };

        const result = await completeTransaction(transactionData);

        if (result.success) {
            setLastTransaction({
                ...transactionData,
                id: result.transactionId,
                createdAt: new Date()
            });
            setShowReceipt(true);
            // Reset form
            setWeight("");
            setMakingCharge("0");
            setDiscount("0");
            setItemName("");
            setCustomerName("");
            setCustomerPhone("");
            setCustomerEmail("");
            setCustomerAddress("");
        } else {
            alert(result.error);
        }
        setProcessing(false);
    };

    if (loading) {
        return (
            <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', height: '50vh', alignItems: 'center' }}>
                <p className="gold-gradient-text" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Syncing Live Market Rates...</p>
            </div>
        );
    }

    const currentRate = getCurrentRate();

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="title-glow">Point of Sale</h1>
                    <p style={{ color: "var(--text-secondary)" }}>Live Market Calculator & Checkout <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>(Last updated: {prices?.lastUpdated ? new Date(prices.lastUpdated).toLocaleTimeString() : ''})</span></p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                {/* Left Panel: Customer & Item Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-panel">
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "16px", color: 'var(--accent-gold)' }}>Customer Profile</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input className="input-glass" placeholder="e.g. Rahul Sharma" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contact Number</label>
                                <input className="input-glass" placeholder="e.g. +91 9876543210" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input className="input-glass" placeholder="e.g. rahul@example.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Residential Address</label>
                                <input className="input-glass" placeholder="e.g. Bengaluru Hub" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <h2 style={{ fontSize: "1.2rem", color: 'var(--accent-gold)' }}>Item Details</h2>

                        <div className="metal-selector">
                            {['gold', 'silver', 'platinum', 'palladium'].map((cat) => (
                                <button
                                    key={cat}
                                    className={`metal-btn ${cat} ${metalCategory === cat ? 'active' : ''}`}
                                    onClick={() => handleCategorySelect(cat as any)}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Purity / Type</label>
                            <div style={{ display: "flex", gap: "12px" }}>
                                {metalCategory === "gold" && [24, 22, 18].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setPurity(c)}
                                        className={purity === c ? "btn-primary" : "btn-glass"}
                                        style={{ flex: 1 }}
                                    >
                                        {c}K
                                    </button>
                                ))}
                                {metalCategory !== "gold" && (
                                    <button className="btn-primary" style={{ flex: 1 }}>
                                        {metalCategory === 'silver' ? '999 Fine' : '950 Platinum'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Item Name (Optional)</label>
                            <input className="input-glass" placeholder="e.g. Traditional Necklace" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label">Weight (Grams)</label>
                                <input type="number" className="input-glass" placeholder="0.00" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Making Charge (₹)</label>
                                <input type="number" className="input-glass" value={makingCharge} onChange={(e) => setMakingCharge(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Summary & Payment */}
                <div className="glass-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "24px", textAlign: 'center' }}>Order Summary</h2>

                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ color: "var(--text-secondary)" }}>Live Market Rate</span>
                            <span style={{ color: 'var(--accent-gold)' }}>₹{currentRate.toLocaleString()} / g</span>
                        </div>

                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: "var(--text-secondary)" }}>Metal Value</span>
                            <span>₹{((parseFloat(weight) || 0) * currentRate).toLocaleString()}</span>
                        </div>

                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: "var(--text-secondary)" }}>Making Charges</span>
                            <span>+₹{parseFloat(makingCharge) || 0}</span>
                        </div>

                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#4ade80' }}>
                            <span>Discount</span>
                            <input
                                type="number"
                                className="input-glass"
                                style={{ width: '100px', height: '30px', textAlign: 'right', fontSize: '0.9rem' }}
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: '24px' }}>
                            <label className="form-label">Payment Method</label>
                            <select className="input-glass" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value="CASH">Cash</option>
                                <option value="UPI">UPI / QR</option>
                                <option value="CARD">Credit/Debit Card</option>
                            </select>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", alignItems: "center", padding: '20px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Total Amount</span>
                            <span className="gold-gradient-text" style={{ fontSize: "2.5rem", fontWeight: "700" }}>
                                ₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="btn-primary"
                        style={{ width: "100%", marginTop: "32px", fontSize: "1.2rem", padding: "20px", opacity: processing ? 0.7 : 1 }}
                    >
                        {processing ? "Processing Transaction..." : "Complete & Generate Receipt"}
                    </button>
                </div>
            </div>

            <ReceiptModal
                isOpen={showReceipt}
                onClose={() => setShowReceipt(false)}
                transaction={lastTransaction}
            />
        </div>
    );
}
