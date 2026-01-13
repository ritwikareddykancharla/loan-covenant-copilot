import React, { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { createFinancials, fetchLoans } from '../services/api';

const AddFinancialsModal = ({ isOpen, onClose, onFinancialsAdded }) => {
    const [loading, setLoading] = useState(false);
    const [loans, setLoans] = useState([]);
    const [formData, setFormData] = useState({
        loan_id: '',
        period: '',
        revenue: '',
        ebitda: '',
        net_debt: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchLoans().then(setLoans);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createFinancials({
                ...formData,
                loan_id: parseInt(formData.loan_id),
                revenue: parseFloat(formData.revenue),
                ebitda: parseFloat(formData.ebitda),
                net_debt: parseFloat(formData.net_debt)
            });
            onFinancialsAdded();
            onClose();
            setFormData({ loan_id: '', period: '', revenue: '', ebitda: '', net_debt: '' });
        } catch (error) {
            console.error(error);
            alert('Failed to add financials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{ width: '400px', padding: '2rem', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={20} /></button>
                <h2 className="text-xl font-bold" style={{ marginBottom: '1.5rem' }}>Add Financials</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Loan</label>
                        <select required className="input" value={formData.loan_id} onChange={(e) => setFormData({ ...formData, loan_id: e.target.value })} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                            <option value="">Select Loan...</option>
                            {loans.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Period</label>
                        <input required type="text" className="input" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} placeholder="e.g. Q1 2025" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Revenue</label>
                        <input required type="number" className="input" value={formData.revenue} onChange={(e) => setFormData({ ...formData, revenue: e.target.value })} placeholder="Amount" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                            <label className="text-sm font-medium">EBITDA</label>
                            <input required type="number" className="input" value={formData.ebitda} onChange={(e) => setFormData({ ...formData, ebitda: e.target.value })} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                        </div>
                        <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                            <label className="text-sm font-medium">Net Debt</label>
                            <input required type="number" className="input" value={formData.net_debt} onChange={(e) => setFormData({ ...formData, net_debt: e.target.value })} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: loading ? 'wait' : 'pointer', display: 'flex', justifyContent: 'center' }}>
                        {loading ? <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> : 'Save Records'}
                    </button>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </form>
            </div>
        </div>
    );
};

export default AddFinancialsModal;
