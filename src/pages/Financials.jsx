import React, { useState } from 'react';
import { TrendingUp, DollarSign, ArrowRight, Download, Sliders } from 'lucide-react';

const Financials = () => {
    const [viewMode, setViewMode] = useState('reported'); // 'reported' or 'projections'

    // Mock Data for Table
    const financialData = [
        { item: 'Revenue', q1: 125.4, q2: 132.1, q3: 128.5, q4: 145.2, proj: 152.0 },
        { item: 'COGS', q1: 85.2, q2: 89.5, q3: 86.1, q4: 98.4, proj: 102.5 },
        { item: 'Gross Profit', q1: 40.2, q2: 42.6, q3: 42.4, q4: 46.8, proj: 49.5 },
        { item: 'OpEx', q1: 28.1, q2: 29.5, q3: 30.2, q4: 31.5, proj: 33.0 },
        { item: 'EBITDA', q1: 12.1, q2: 13.1, q3: 12.2, q4: 15.3, proj: 16.5, isBold: true },
        { item: 'Net Debt', q1: 450, q2: 445, q3: 440, q4: 435, proj: 430, isBold: true },
    ];

    const leverage = (435 / 52.7).toFixed(2); // Mock Calc

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="heading-2">Financial Modeling</h2>
                    <p className="text-muted">Interactive model linked to covenant compliance.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full p-1 mr-4">
                        <button
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === 'reported' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-muted hover:text-main'}`}
                            onClick={() => setViewMode('reported')}
                        >
                            Reported
                        </button>
                        <button
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === 'projections' ? 'bg-[var(--color-accent)] text-white shadow-sm' : 'text-muted hover:text-main'}`}
                            onClick={() => setViewMode('projections')}
                        >
                            Projections (+1Y)
                        </button>
                    </div>
                    <button className="btn-outline text-sm"><Download size={16} className="mr-2" /> Export Excel</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <KPICard title="LTM EBITDA" value="$52.7M" change="+5.4%" trend="up" />
                <KPICard title="Net Debt" value="$435.0M" change="-1.2%" trend="down" isGood />
                <KPICard title="Net Leverage" value={`${leverage}x`} change="+0.1x" trend="up" isWarning />
                <KPICard title="Fixed Charge Cov." value="1.85x" change="-0.1x" trend="down" isWarning />
            </div>

            {/* Interactive Table */}
            <div className="card p-0 overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface-hover)]">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-muted">Consolidated Statement of Operations (USD Millions)</h3>
                    <button className="text-xs flex items-center gap-1 text-[var(--color-accent)] font-medium">
                        <Sliders size={14} /> Adjust Assumptions
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[var(--color-border)]">
                                <th className="text-left p-4 pl-6 text-muted font-medium w-1/3">Line Item</th>
                                <th className="text-right p-4 font-mono text-muted">Q1 24</th>
                                <th className="text-right p-4 font-mono text-muted">Q2 24</th>
                                <th className="text-right p-4 font-mono text-muted">Q3 24</th>
                                <th className="text-right p-4 font-mono font-bold text-primary bg-[var(--color-surface-hover)]">Q4 24</th>
                                {viewMode === 'projections' && (
                                    <th className="text-right p-4 font-mono font-bold text-[var(--color-accent)] bg-blue-50">Q1 25 (E)</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.map((row, i) => (
                                <tr key={i} className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors group">
                                    <td className={`p-4 pl-6 ${row.isBold ? 'font-bold text-primary text-base' : 'text-gray-700'}`}>
                                        {row.item}
                                    </td>
                                    <td className="text-right p-4 font-mono">{row.q1.toFixed(1)}</td>
                                    <td className="text-right p-4 font-mono">{row.q2.toFixed(1)}</td>
                                    <td className="text-right p-4 font-mono">{row.q3.toFixed(1)}</td>
                                    <td className="text-right p-4 font-mono font-bold bg-[var(--color-surface-hover)]">{row.q4.toFixed(1)}</td>
                                    {viewMode === 'projections' && (
                                        <td className="text-right p-4 font-mono font-bold text-[var(--color-accent)] bg-blue-50 cursor-text hover:bg-blue-100">
                                            {row.proj.toFixed(1)}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {viewMode === 'projections' && (
                    <div className="p-3 bg-blue-50 text-blue-800 text-xs text-center border-t border-blue-100">
                        Projections based on 5% growth assumption. Click cells to override.
                    </div>
                )}
            </div>
        </div>
    );
};

const KPICard = ({ title, value, change, trend, isGood, isWarning }) => {
    let changeColor = trend === 'up' ? 'var(--color-success)' : 'var(--color-danger)';
    if (isGood && trend === 'down') changeColor = 'var(--color-success)';
    if (isGood && trend === 'up') changeColor = 'var(--color-danger)';
    if (isWarning) changeColor = 'var(--color-warning)';

    return (
        <div className="card">
            <p className="text-sm text-muted font-medium uppercase tracking-wider">{title}</p>
            <div className="text-2xl font-bold font-serif" style={{ margin: '0.75rem 0', color: 'var(--color-primary)' }}>{value}</div>
            <div className="flex items-center gap-1 text-sm font-medium" style={{ color: changeColor }}>
                {trend === 'up' ? <TrendingUp size={16} /> : <TrendingUp size={16} style={{ transform: 'scaleY(-1)' }} />}
                <span>{change}</span>
            </div>
        </div>
    );
};

export default Financials;
