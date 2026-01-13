import React, { useState, useEffect } from 'react';
import { FileText, Download, Shield, CheckCircle, Loader } from 'lucide-react';
import { fetchReports } from '../services/api';

const Reports = () => {
    const [generating, setGenerating] = useState(false);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await fetchReports();
        if (data.length > 0) {
            setReports(data);
        } else {
            // Fallback if DB is empty for demo purposes
            setReports([
                { id: 1, name: 'Q4 2024 Compliance Certificate', date: 'Jan 10, 2025', status: 'Approved', type: 'Regulation' },
                { id: 2, name: 'Covenant Exception Report - Nov', date: 'Nov 30, 2024', status: 'Review', type: 'Internal' },
            ]);
        }
    };

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setGenerating(false);
            const newReport = {
                id: reports.length + 1,
                name: `Compliance Report - ${new Date().toLocaleDateString()}`,
                date: 'Just now',
                status: 'Draft',
                type: 'On-Demand'
            };
            setReports([newReport, ...reports]);
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Compliance Reports</h2>
                    <p className="text-muted">Generate and view lender-ready compliance documentation.</p>
                </div>
                <button
                    disabled={generating}
                    onClick={handleGenerate}
                    className="flex items-center gap-2"
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        fontWeight: 500,
                        opacity: generating ? 0.7 : 1,
                        cursor: generating ? 'wait' : 'pointer'
                    }}
                >
                    {generating ? <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Shield size={18} />}
                    {generating ? 'Generating...' : 'Generate New Report'}
                </button>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#f8fafc' }}>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Report Name</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Date Generated</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Type</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                            <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem', display: 'flex', items: 'center', gap: '0.75rem' }}>
                                    <FileText size={20} className="text-muted" />
                                    <span className="font-medium">{report.name}</span>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{report.date}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem', borderRadius: '999px', backgroundColor: '#f1f5f9' }}>
                                        {report.type}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        fontSize: '0.875rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        color: report.status === 'Approved' ? 'var(--color-success)' : 'var(--color-warning)',
                                        fontWeight: 500
                                    }}>
                                        {report.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button style={{ color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Download size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default Reports;
