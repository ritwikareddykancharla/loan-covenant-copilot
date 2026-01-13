import React from 'react';

const SplitView = ({ leftTitle, rightTitle, leftContent, rightContent }) => {
    return (
        <div className="flex h-[calc(100vh-140px)] border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-surface)]">
            {/* Left Pane (Document/Legal) */}
            <div className="w-1/2 flex flex-col border-r border-[var(--color-border)]">
                <div className="h-12 border-b border-[var(--color-border)] flex items-center px-4 bg-[var(--color-background)]">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{leftTitle}</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
                    {leftContent}
                </div>
            </div>

            {/* Right Pane (Analysis/Data) */}
            <div className="w-1/2 flex flex-col">
                <div className="h-12 border-b border-[var(--color-border)] flex items-center px-4 bg-[var(--color-background)]">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{rightTitle}</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {rightContent}
                </div>
            </div>
        </div>
    );
};

export default SplitView;
