import React, { useState } from 'react';
import { MOCK_COVENANTS } from '../data/mockData';
import SplitView from '../components/SplitView';
import { CheckCircle, AlertTriangle, FileText, ChevronRight } from 'lucide-react';

const Covenants = () => {
    const [selectedCovenant, setSelectedCovenant] = useState(MOCK_COVENANTS[0]);

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex justify-between items-center">
                <h2 className="heading-2">Covenant Analysis</h2>
                <div className="flex gap-2">
                    <button className="btn-outline text-sm">Upload Compliance Cert</button>
                    <button className="btn-primary text-sm">Export Report</button>
                </div>
            </div>

            <div className="flex gap-6 h-full">
                {/* Sidebar List */}
                <div className="w-1/4 card p-0 flex flex-col gap-0 overflow-hidden h-[calc(100vh-140px)]">
                    <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-hover)]">
                        <h3 className="font-bold text-sm uppercase tracking-wide text-muted">Detected Clauses</h3>
                    </div>
                    <div className="overflow-y-auto">
                        {MOCK_COVENANTS.map(cov => (
                            <div
                                key={cov.id}
                                onClick={() => setSelectedCovenant(cov)}
                                className={`p-4 border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors ${selectedCovenant.id === cov.id ? 'bg-[var(--color-surface-hover)] border-l-4 border-l-[var(--color-accent)]' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-medium text-sm">{cov.name}</span>
                                    {cov.status === 'Compliant' ? <CheckCircle size={14} className="text-success" /> : <AlertTriangle size={14} className="text-warning" />}
                                </div>
                                <div className="text-xs text-muted flex justify-between">
                                    <span>{cov.type}</span>
                                    <span>{cov.actual}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Split View */}
                <div className="flex-1">
                    <SplitView
                        leftTitle="Legal Source Text"
                        rightTitle="Calculated Logic"
                        leftContent={
                            <div className="prose prose-sm max-w-none">
                                <div className="p-6 bg-white shadow-sm border border-[var(--color-border)] rounded mb-4">
                                    <h4 className="font-serif font-bold mb-4 text-lg border-b pb-2">Section 6.12 Financial Covenants</h4>
                                    <p className="font-serif text-lg leading-relaxed text-justify">
                                        {selectedCovenant.legalText}
                                    </p>
                                </div>
                                <div className="text-xs text-muted text-center italic">
                                    Extracted from "Credit Agreement - Amended & Restated.pdf" (Page 42)
                                </div>
                            </div>
                        }
                        rightContent={
                            <div className="flex flex-col gap-8">
                                {/* Top Summary */}
                                <div className="flex gap-4 p-4 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">
                                    <div className="flex-1">
                                        <div className="text-xs text-muted uppercase tracking-wider mb-1">Threshold</div>
                                        <div className="text-xl font-bold font-mono">{selectedCovenant.threshold}</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-muted uppercase tracking-wider mb-1">Actual</div>
                                        <div className="text-xl font-bold font-mono" style={{ color: selectedCovenant.status === 'Compliant' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                                            {selectedCovenant.actual}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-muted uppercase tracking-wider mb-1">Status</div>
                                        <div className="font-bold flex items-center gap-2">
                                            {selectedCovenant.status}
                                            {selectedCovenant.status === 'Compliant' ? <CheckCircle size={16} className="text-success" /> : <AlertTriangle size={16} className="text-warning" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Formula Breakdown */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b pb-2">Formula Breakdown</h4>
                                    <div className="p-4 rounded bg-[var(--color-primary)] text-white font-mono text-sm mb-6 shadow-lg">
                                        {selectedCovenant.formula}
                                    </div>

                                    {/* Variables */}
                                    <div className="flex flex-col gap-2">
                                        {Object.entries(selectedCovenant.variables).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center p-3 border border-[var(--color-border)] rounded hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-accent)] transition-all cursor-default group">
                                                <span className="font-medium text-sm flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-50 group-hover:opacity-100"></div>
                                                    {key}
                                                </span>
                                                <span className="font-mono text-sm">
                                                    {(value / 1000000).toFixed(1)}M
                                                </span>
                                            </div>
                                        ))}
                                        {Object.keys(selectedCovenant.variables).length === 0 && (
                                            <div className="text-sm text-muted italic">No numerical variables detected for this negative covenant.</div>
                                        )}
                                    </div>
                                </div>

                                {/* AI Context */}
                                <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">AI Reasoning</h4>
                                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                                        The system matched "Consolidated Total Debt" to line item <span className="underline decoration-dotted cursor-help">L.24 of Balance Sheet</span> and "Unrestricted Cash" was derived from <span className="underline decoration-dotted cursor-help">Note 4 (Cash Equivalents)</span>.
                                    </p>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Covenants;
