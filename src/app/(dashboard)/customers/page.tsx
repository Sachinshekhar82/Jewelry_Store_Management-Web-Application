/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchCustomers } from "@/app/(dashboard)/actions/customers";
import AddCustomerBtn from "@/components/AddCustomerBtn";

export default async function CustomersPage() {
    const customers = await fetchCustomers();

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="title-glow">Customers</h1>
                    <p style={{ color: "var(--text-secondary)" }}>Manage your client base and view their history</p>
                </div>
                <AddCustomerBtn />
            </div>

            <div className="glass-panel">
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--glass-border)", color: "var(--text-secondary)" }}>
                            <th style={{ padding: "16px" }}>Name</th>
                            <th style={{ padding: "16px" }}>Phone</th>
                            <th style={{ padding: "16px" }}>Email</th>
                            <th style={{ padding: "16px" }}>Transactions</th>
                            <th style={{ padding: "16px" }}>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
                                    No customers added yet.
                                </td>
                            </tr>
                        ) : (
                            customers.map((c: any) => (
                                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <td style={{ padding: "16px" }}>{c.name}</td>
                                    <td style={{ padding: "16px", opacity: 0.8 }}>{c.phone || "---"}</td>
                                    <td style={{ padding: "16px", opacity: 0.8 }}>{c.email || "---"}</td>
                                    <td style={{ padding: "16px" }}>
                                        <span className="badge">{c._count?.transactions || 0} Orders</span>
                                    </td>
                                    <td style={{ padding: "16px", opacity: 0.6 }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
