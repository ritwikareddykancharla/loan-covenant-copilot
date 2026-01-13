import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Plus, X, ChevronRight, Activity, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_LOANS, MOCK_ACTIVITY, MOCK_FINANCIAL_HISTORY } from '../data/mockData';

const Dashboard = () => {
    const navigate = useNavigate();

    // -- Interactive State --
    const [loans, setLoans] = useState(MOCK_LOANS);
    const [activities, setActivities] = useState(MOCK_ACTIVITY);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeRange, setTimeRange] = useState('Last 12 Months');

    // Chart Data state (simulating filter effect)
    const [chartData, setChartData] = useState(MOCK_FINANCIAL_HISTORY);

    // Derived Stats
    const activeLoansCount = loans.filter(l => l.status === 'Active').length;
    const reviewCount = loans.filter(l => l.status === 'Warning' || l.status === 'Critical').length;
    const complianceRate = Math.round((activeLoansCount / loans.length) * 100) || 0;

    // -- Handlers --

    // 1. Filter Handler
    const handleTimeRangeChange = (e) => {
        const range = e.target.value;
        setTimeRange(range);
        // Simulate data change
        if (range === 'YTD') {
            setChartData(MOCK_FINANCIAL_HISTORY.slice(2)); // Just show last 2 quarters
        } else {
            setChartData(MOCK_FINANCIAL_HISTORY); // Show all
        }
    };

    // 2. Add Loan Handler
    const handleAddLoan = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const amount = formData.get('amount');

        const newLoan = {
            id: `L00${loans.length + 1}`,
            name: name || 'New Credit Facility',
            borrower: formData.get('borrower') || 'Unknown Borrower',
            amount: parseInt(amount) || 10000000,
            currency: 'USD',
            status: 'Active',
            originationDate: new Date().toISOString().split('T')[0],
            nextReview: '2025-06-30'
        };

        const newActivity = {
            id: Date.now(),
            user: 'You',
            role: 'Admin',
            action: 'created new facility',
            target: newLoan.name,
            time: 'Just now',
            avatar: 'ME'
        };

        setLoans([newLoan, ...loans]);
        setActivities([newActivity, ...activities]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-8 relative">
            <div className="flex justify-between items-center">
                <h2 className="heading-2">Executive Overview</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} /> New Credit Facility
                </button>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
                <StatsCard
                    title="Active Credit Facilities"
                    value={activeLoansCount}
                    icon={<CheckCircle className="text-success" />}
                    trend="+1 this week"
                />
                <StatsCard
                    title="Covenants Under Review"
                    value={reviewCount}
                    icon={<AlertTriangle className="text-warning" />}
                    trend={reviewCount > 0 ? "Requires attention" : "All clear"}
                />
                <StatsCard
                    title="Portfolio Compliance"
                    value={`${complianceRate}%`}
                    icon={<TrendingUp className="text-accent" />}
                    trend="Stable"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-3 gap-8" style={{ gridTemplateColumns: '2fr 1fr' }}>

                {/* Left Column: Charts & Analysis */}
                <div className="flex flex-col gap-8">
                    {/* Interactive Chart Section */}
                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="heading-3">Leverage Trends (Portfolio Weighted)</h3>
                            <select
                                className="input"
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                                value={timeRange}
                                onChange={handleTimeRangeChange}
                            >
                                <option>Last 12 Months</option>
                                <option>YTD</option>
                            </select>
                        </div>

                        {/* Recharts Area Chart */}
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <AreaChart
                                    data={chartData}
                                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorLev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                    <XAxis
                                        dataKey="quarter"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        domain={[0, 6]}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '4px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="leverage"
                                        stroke="var(--color-accent)"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorLev)"
                                        isAnimationActive={true}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey={() => 4.5}
                                        stroke="#EF4444"
                                        strokeDasharray="5 5"
                                        strokeWidth={1}
                                        fill="none"
                                        tooltipType="none"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex justify-between mt-4 text-sm text-muted">
                            <span>Target: &lt; 4.50x</span>
                            <span>Current Avg: 4.21x (Safe)</span>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="heading-3">Portfolio Heatmap</h3>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                                <input placeholder="Filter loans..." className="pl-9 pr-4 py-2 border rounded text-sm" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {loans.map(loan => (
                                <div
                                    key={loan.id}
                                    onClick={() => navigate('/app/covenants')}
                                    className="flex justify-between items-center p-4 border rounded hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer group"
                                    style={{ borderColor: 'var(--color-border)' }}
                                >
                                    <div>
                                        <div className="font-bold flex items-center gap-2">
                                            {loan.name}
                                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted" />
                                        </div>
                                        <div className="text-sm text-muted">{loan.borrower}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-mono">{loan.currency} {(loan.amount / 1000000).toFixed(0)}M</span>
                                        <StatusBadge status={loan.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity Feed */}
                <div className="card h-fit sticky top-6">
                    <h3 className="heading-3 mb-6">Activity Feed</h3>
                    <div className="flex flex-col gap-6">
                        {activities.map(item => (
                            <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'var(--color-surface-hover)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', color: 'var(--color-primary)', flexShrink: 0
                                }}>
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="text-sm">
                                        <span className="font-bold">{item.user}</span>
                                        <span className="text-muted"> {item.action} </span>
                                        <span className="font-medium text-accent">{item.target}</span>
                                    </div>
                                    <div className="text-xs text-muted mt-1 flex items-center gap-1">
                                        <Clock size={12} /> {item.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-outline w-full mt-6 text-sm">View All Activity</button>
                </div>

            </div>

            {/* Add Loan Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-lg w-[500px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="heading-3">New Credit Facility</h3>
                            <button onClick={() => setIsModalOpen(false)} className="hover:bg-gray-100 p-2 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAddLoan} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">Deal Name</label>
                                <input name="name" className="w-full p-3 border rounded focus:ring-2 focus:ring-black outline-none" placeholder="e.g. Project Omega Term Loan" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Borrower</label>
                                <input name="borrower" className="w-full p-3 border rounded focus:ring-2 focus:ring-black outline-none" placeholder="e.g. Acme Corp" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Amount (USD)</label>
                                <input name="amount" type="number" className="w-full p-3 border rounded focus:ring-2 focus:ring-black outline-none" placeholder="e.g. 50000000" />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-outline">Cancel</button>
                                <button type="submit" className="flex-1 btn-primary">Create Facility</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatsCard = ({ title, value, icon, trend }) => (
    <div className="card">
        <div className="flex justify-between items-start mb-4">
            <span className="text-muted font-medium">{title}</span>
            {icon}
        </div>
        <div className="text-4xl font-light mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{value}</div>
        <div className="text-sm text-muted">{trend}</div>
    </div>
);

const StatusBadge = ({ status }) => {
    // Manual styles matching text inputs
    let style = { padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 };

    // Status Logic
    if (status === 'Active') style = { ...style, backgroundColor: '#DCFCE7', color: '#166534' };
    else if (status === 'Warning') style = { ...style, backgroundColor: '#FEF3C7', color: '#92400E' };
    else if (status === 'Critical') style = { ...style, backgroundColor: '#FEE2E2', color: '#991B1B' };
    else style = { ...style, backgroundColor: '#F3F4F6', color: '#1F2937' }; // Default/Pending

    return <span style={style}>{status}</span>;
};

export default Dashboard;
