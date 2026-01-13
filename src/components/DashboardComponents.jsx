import React from 'react';
import { AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';

export const StatsCard = ({ title, value, change, icon, isWarning, isDanger }) => {
    let valueColor = 'var(--color-primary)';
    if (isWarning) valueColor = 'var(--color-warning)';
    if (isDanger) valueColor = 'var(--color-danger)';

    return (
        <div className="card flex flex-col justify-between" style={{ minHeight: '120px' }}>
            <div className="flex justify-between items-start">
                <span className="text-sm text-muted font-medium">{title}</span>
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold" style={{ color: valueColor, fontFamily: 'var(--font-heading)' }}>{value}</div>
                {change && <div className="text-sm text-muted" style={{ marginTop: '0.25rem' }}>{change}</div>}
            </div>
        </div>
    );
};

export const AlertItem = ({ loan, message, date, severity }) => {
    let borderColor = 'transparent';
    let icon = null;

    if (severity === 'warning') {
        borderColor = 'var(--color-warning)';
        icon = <AlertTriangle size={16} style={{ color: 'var(--color-warning)' }} />;
    } else if (severity === 'danger') {
        borderColor = 'var(--color-danger)';
        icon = <AlertOctagon size={16} style={{ color: 'var(--color-danger)' }} />;
    } else if (severity === 'success') {
        borderColor = 'var(--color-success)';
        icon = <CheckCircle size={16} style={{ color: 'var(--color-success)' }} />;
    }

    return (
        <div
            className="flex items-start gap-4"
            style={{
                padding: '1rem',
                borderLeft: `4px solid ${borderColor}`,
                backgroundColor: 'var(--color-background)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0'
            }}
        >
            <div style={{ marginTop: '2px' }}>{icon}</div>
            <div style={{ flex: 1 }}>
                <div className="flex justify-between">
                    <div className="font-medium text-sm text-primary">{loan}</div>
                    <div className="text-xs text-muted">{date}</div>
                </div>
                <div className="text-sm text-muted" style={{ marginTop: '0.25rem' }}>{message}</div>
            </div>
        </div>
    );
};

export const ActionButton = ({ label }) => (
    <button
        style={{
            padding: '0.75rem',
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'left',
            fontWeight: 500,
            transition: 'background-color 0.2s',
            color: 'var(--color-text-main)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-surface-hover)'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-background)'}
    >
        {label}
    </button>
);
