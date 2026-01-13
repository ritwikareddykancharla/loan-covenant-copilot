import React, { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { createCovenant, fetchLoans } from '../services/api';

const CreateCovenantModal = ({ isOpen, onClose, onCovenantCreated }) => {
    const [loading, setLoading] = useState(false);
    const [loans, setLoans] = useState([]);
    const [formData, setFormData] = useState({
        loan_id: '',
        description: '',
        type: 'Financial',
        threshold: '',
        status: 'Compliant'
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
            await createCovenant({
                ...formData,
                loan_id: parseInt(formData.loan_id)
            });
            onCovenantCreated();
            onClose();
            setFormData({
                loan_id: '',
                description: '',
                type: 'Financial',
                threshold: '',
                status: 'Compliant'
            });
        } catch (error) {
            console.error(error);
            alert('Failed to create covenant');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{ width: '500px', padding: '2rem', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={20} /></button>
                <h2 className="text-xl font-bold" style={{ marginBottom: '1.5rem' }}>Add Covenant</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Loan</label>
                        <select
                            required className="input" value={formData.loan_id} onChange={(e) => setFormData({ ...formData, loan_id: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        >
                            <option value="">Select Loan...</option>
                            {loans.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Description</label>
                        <input required type="text" className="input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="e.g. Max Net Leverage"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                            <label className="text-sm font-medium">Type</label>
                            <select className="input" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                                <option value="Financial">Financial</option>
                                <option value="Negative">Negative</option>
                                <option value="Information">Information</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                            <label className="text-sm font-medium">Threshold</label>
                            <input required type="text" className="input" value={formData.threshold} onChange={(e) => setFormData({ ...formData, threshold: e.target.value })} placeholder="e.g. <= 4.00x" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: loading ? 'wait' : 'pointer', display: 'flex', justifyContent: 'center' }}>
                        {loading ? <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> : 'Add Covenant'}
                    </button>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </form>
            </div>
        </div>
    );
};

export default CreateCovenantModal;
