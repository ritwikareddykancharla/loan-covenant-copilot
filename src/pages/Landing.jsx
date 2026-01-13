import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container" style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-primary)', overflowX: 'hidden' }}>

            {/* Navbar */}
            <nav className="flex justify-between items-center" style={{ padding: '1.5rem 3rem', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-background)', zIndex: 100 }}>
                {/* Enhanced Brand Section */}
                <div
                    className="flex items-center gap-4"
                    style={{ cursor: 'pointer', color: 'var(--color-primary)' }}
                    onClick={() => navigate('/')}
                >
                    <div style={{ backgroundColor: 'var(--color-secondary)', padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={28} fill="currentColor" color="black" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.03em' }}>
                        :CovenantIQ:
                    </span>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium">
                    <span className="cursor-pointer hover:opacity-70">Platform</span>
                    <span className="cursor-pointer hover:opacity-70">Solutions</span>
                    <span className="cursor-pointer hover:opacity-70">Customers</span>
                    <span className="cursor-pointer hover:opacity-70">Security</span>
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => navigate('/app')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem' }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/app')}
                        className="btn-primary"
                    >
                        Request a Demo
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container" style={{ padding: '8rem 1rem', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
                        Automated Credit Compliance
                    </p>
                    <h1 className="display-text" style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>
                        The Modern OS for <br /> Credit Agreements
                    </h1>
                    <p style={{ fontSize: '1.35rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 3rem', fontFamily: 'var(--font-heading)', lineHeight: 1.5 }}>
                        Parse loan documents instantaneously. Monitor financial covenants in real-time. Prevent technical defaults before they happen.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/app')}
                            className="btn-primary"
                            style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
                        >
                            Launch Platform
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Video Placeholder / Hero Image */}
            <div className="container" style={{ padding: '0 2rem 6rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        height: '600px',
                        background: '#1F1D1A', /* Ink background for contrast */
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>
                        <Zap size={64} style={{ opacity: 0.8, marginBottom: '1rem' }} />
                        <h3 className="heading-2" style={{ color: 'white' }}>CovenantIQ Platform</h3>
                        <p style={{ opacity: 0.7 }}>Secure Loan Monitoring Workflows</p>
                    </div>
                    {/* Abstract Grid Overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.03) 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }}></div>
                </motion.div>
            </div>

            {/* Financial Partners Ticker */}
            <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '2rem 0', overflow: 'hidden' }}>
                <div className="container flex justify-between items-center text-muted" style={{ opacity: 0.6, fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                    {['WELLS FARGO', 'BANK OF AMERICA', 'CITI', 'J.P. MORGAN', 'MORGAN STANLEY', 'GOLDMAN SACHS'].map(name => (
                        <span key={name}>{name}</span>
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <div id="features" className="container section-padding">
                <div className="flex flex-col items-center mb-12 text-center">
                    <h3 className="heading-2 mb-4"> Intelligent Covenant Monitoring</h3>
                    <p className="text-muted" style={{ maxWidth: '600px' }}>Secure, accurate, and automated tracking for complex credit agreements.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Smart Extraction"
                        description="Upload any PDF loan agreement. We identify every covenant and threshold instantly."
                    />
                    <FeatureCard
                        title="Financial Monitoring"
                        description="Connect financials to automatically calculate leverage, coverage, and liquidity ratios."
                    />
                    <FeatureCard
                        title="Bank-Grade Security"
                        description="SOC2 Type II compliant. Your data is encrypted at rest and in transit."
                    />
                </div>
            </div>

            {/* Footer */}
            <div style={{ background: 'var(--color-primary)', color: 'var(--color-text-light)', padding: '4rem 0' }}>
                <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="font-bold text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>:CovenantIQ:</div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Platform</h4>
                        <div className="flex flex-col gap-2 text-sm opacity-70">
                            <span>Extraction</span>
                            <span>Monitoring</span>
                            <span>Compliance</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Company</h4>
                        <div className="flex flex-col gap-2 text-sm opacity-70">
                            <span>About</span>
                            <span>Careers</span>
                            <span>Contact</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Legal</h4>
                        <div className="flex flex-col gap-2 text-sm opacity-70">
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>Security</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const FeatureCard = ({ title, description }) => (
    <div style={{
        padding: '2rem',
        borderLeft: '1px solid var(--color-border)', // Minimalist border left style
        transition: 'all 0.2s',
        cursor: 'default'
    }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{description}</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>
            Learn more <ArrowRight size={16} />
        </div>
    </div>
);

export default Landing;
