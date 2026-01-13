import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import { createLoan } from '../services/api';

const CreateLoanModal = ({ isOpen, onClose, onLoanCreated }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        borrower: '',
        amount: '',
        currency: 'USD'
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createLoan({
                ...formData,
                amount: parseFloat(formData.amount)
            });
            onLoanCreated();
            onClose();
            setFormData({ name: '', borrower: '', amount: '', currency: 'USD' });
        } catch (error) {
            console.error(error);
            alert('Failed to create loan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{ width: '400px', padding: '2rem', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold" style={{ marginBottom: '1.5rem' }}>Add New Loan</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Loan Name</label>
                        <input
                            required
                            type="text"
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Acme Corp Term Loan A"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Borrower</label>
                        <input
                            required
                            type="text"
                            className="input"
                            value={formData.borrower}
                            onChange={(e) => setFormData({ ...formData, borrower: e.target.value })}
                            placeholder="e.g. Acme Corp"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                            <label className="text-sm font-medium">Amount</label>
                            <input
                                required
                                type="number"
                                className="input"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="1000000"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                            />
                        </div>
                        <div className="flex flex-col gap-1" style={{ width: '100px' }}>
                            <label className="text-sm font-medium">Currency</label>
                            <select
                                className="input"
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            cursor: loading ? 'wait' : 'pointer',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {loading ? <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> : 'Create Loan'}
                    </button>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </form>
            </div>
        </div>
    );
};

export default CreateLoanModal;
