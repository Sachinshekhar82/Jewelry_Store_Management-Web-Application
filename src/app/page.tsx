import Link from "next/link";

export default function LanderPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'white', fontFamily: 'var(--font-body)' }}>
            {/* Header / Nav */}
            <nav style={{ padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-gold)" }}>
                        <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                    </svg>
                    <span className="gold-gradient-text" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '4px' }}>DRIP</span>
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <Link href="#about" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }}>About Us</Link>
                    <Link href="#contact" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }}>Contact</Link>
                    <Link href="/login" style={{ textDecoration: 'none', color: 'var(--accent-gold)', fontWeight: 600 }}>Login</Link>
                    <Link href="/dashboard" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                        Manage Shop →
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ padding: '120px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 className="gold-gradient-text" style={{ fontSize: '6rem', marginBottom: '20px', letterSpacing: '-2px' }}>The Gold Standard.</h1>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                        Premium jewelry management for the modern era. Experience real-time market tracking,
                        seamless point-of-sale, and elite analytics tailored for luxury.
                    </p>
                    <Link href="/dashboard" className="btn-primary" style={{ padding: '18px 18px', fontSize: '1.2rem', borderRadius: '99px' }}>
                        Enter The Hub
                    </Link>
                </div>
            </section>

            {/* About Us */}
            <section id="about" style={{ padding: '100px 60px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="glass-panel" style={{ height: '300px' }}>
                            <img
                                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop"
                                alt="Luxury Jewelry 1"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', opacity: 0.8 }}
                            />
                        </div>
                        <div className="glass-panel" style={{ height: '300px', marginTop: '30px' }}>
                            <img
                                src="https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Luxury Jewelry 2"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', opacity: 0.8 }}
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="gold-gradient-text" style={{ fontSize: '3rem', marginBottom: '24px' }}>Legacy Meets Innovation</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px' }}>
                            Welcome to **DRIP Jewelry**, where every piece tells a story of unmatched elegance and precision.
                            Nestled in the vibrant heart of Bengaluru, we specialize in curated Gold, Silver, and Platinum
                            collections that redefine modern luxury.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px' }}>
                            Our heritage is built on trust and the pursuit of perfection. Whether it's the 24K shine of our bullion
                            or the intricate detail of our handcrafted ornaments, we ensure that every customer walks away
                            with a piece of timeless value.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Managed by state-of-the-art technology, our shop offers real-time transparency into market rates,
                            ensuring you always get the true value of your investment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{ padding: '100px 60px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="blue-gradient-text" style={{ fontSize: '3rem', marginBottom: '40px' }}>Connect with DRIP</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
                        <div className="glass-panel">
                            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Location</h4>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.4 }}>
                                Urban Bengaluru,<br />
                                Karnataka, Near Cubbon Park
                            </p>
                        </div>
                        <div className="glass-panel">
                            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Phone</h4>
                            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>+91 8252605092</p>
                        </div>
                        <div className="glass-panel">
                            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Email</h4>
                            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>sachinshekhar7550@gmail.com</p>
                        </div>
                        <div className="glass-panel" style={{ cursor: 'pointer' }}>
                            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Instagram</h4>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E4405F' }}>
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>


                                <a href="https://www.instagram.com/_heyy.sachin/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', opacity: 0.8, color: 'inherit', textDecoration: 'none' }}>
                                    @_heyy.sachin
                                </a>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '60px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.5, letterSpacing: '2px' }}>© 2026 DRIP JEWELRY CO. ALL RIGHTS RESERVED.</p>
                <p style={{ fontSize: '0.7rem', opacity: 0.3, marginTop: '10px' }}>BENGALURU | LUXURY HUB</p>
            </footer>
        </div>
    );
}
