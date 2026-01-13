import React from 'react';
import { LayoutDashboard, FileText, Activity, PieChart, ShieldAlert, Zap } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import CopilotWidget from './CopilotWidget';

const Layout = ({ children }) => {
    return (
        <div className="flex" style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: '260px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FBFBF9',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid #333'
                }}
            >
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ marginBottom: '3rem', textDecoration: 'none' }}>
                    <Zap className="text-secondary" size={24} style={{ color: 'var(--color-secondary)' }} />
                    <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>:CovenantIQ:</h1>
                </Link>

                <nav className="flex flex-col gap-2">
                    <NavItem to="/app" icon={<LayoutDashboard size={18} />} label="Dashboard" end />
                    <NavItem to="/app/covenants" icon={<FileText size={18} />} label="Covenants" />
                    <NavItem to="/app/financials" icon={<PieChart size={18} />} label="Financials" />
                    <NavItem to="/app/reports" icon={<ShieldAlert size={18} />} label="Compliance Reports" />
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div className="text-sm opacity-50 font-medium">
                        Professional Class AI<br />
                        v1.2.0
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-col" style={{ flex: 1, display: 'flex' }}>
                <header
                    className="flex justify-between items-center"
                    style={{
                        height: '72px',
                        padding: '0 2.5rem',
                        backgroundColor: 'var(--color-surface)',
                        borderBottom: '1px solid var(--color-border)'
                    }}
                >
                    <div className="text-sm font-medium opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>
                        Overview
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">Agent Smith</div>
                        <div
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '0.875rem'
                            }}
                        >
                            AS
                        </div>
                    </div>
                </header>

                <div style={{ padding: '2.5rem', flex: 1, overflowY: 'auto' }}>
                    {children}
                </div>
                <CopilotWidget />
            </main>
        </div>
    );
};

const NavItem = ({ to, icon, label, ...props }) => (
    <NavLink
        to={to}
        {...props}
        className={({ isActive }) =>
            `flex items-center gap-3 ${isActive ? 'active' : ''}`
        }
        style={({ isActive }) => ({
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            color: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
            backgroundColor: isActive ? 'var(--color-secondary)' : 'transparent',
            fontWeight: isActive ? 600 : 400,
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            fontFamily: 'var(--font-body)'
        })}
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

export default Layout;
