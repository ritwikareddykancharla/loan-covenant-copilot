export const MOCK_LOANS = [
    {
        id: 'L001',
        name: 'Project Alpha Term Loan B',
        borrower: 'Acme Heavy Industries',
        amount: 450000000,
        currency: 'USD',
        status: 'Active',
        originationDate: '2023-11-15',
        nextReview: '2025-03-31'
    },
    {
        id: 'L002',
        name: 'Revolver - TechGrowth Fund',
        borrower: 'Nebula Systems Inc.',
        amount: 75000000,
        currency: 'USD',
        status: 'Warning',
        originationDate: '2024-01-10',
        nextReview: '2025-02-28'
    },
    {
        id: 'L003',
        name: 'Capex Facility 2024',
        borrower: 'GreenEnergy Corp',
        amount: 120000000,
        currency: 'EUR',
        status: 'Active',
        originationDate: '2024-06-01',
        nextReview: '2025-04-15'
    }
];

export const MOCK_COVENANTS = [
    {
        id: 'C001',
        loanId: 'L001',
        type: 'Financial',
        name: 'Net Leverage Ratio',
        threshold: '4.50x',
        actual: '4.21x',
        trend: 'down', // good
        status: 'Compliant',
        legalText: "The Borrower shall not permit the Net Leverage Ratio as of the last day of any Fiscal Quarter to exceed 4.50 to 1.00. 'Net Leverage Ratio' means, the ratio of (a) Consolidated Total Debt minus Unrestricted Cash to (b) Consolidated EBITDA.",
        formula: '(Total Debt - Cash) / EBITDA',
        variables: {
            'Total Debt': 189000000,
            'Cash': 24000000,
            'EBITDA': 39192000
        }
    },
    {
        id: 'C002',
        loanId: 'L001',
        type: 'Financial',
        name: 'Interest Coverage Ratio',
        threshold: '3.00x',
        actual: '3.85x',
        trend: 'up', // good
        status: 'Compliant',
        legalText: "The Borrower shall maintain an Interest Coverage Ratio of not less than 3.00:1.00 as of the end of each fiscal quarter. Interest Coverage means EBITDA divided by Consolidated Interest Expense.",
        formula: 'EBITDA / Interest Expense',
        variables: {
            'EBITDA': 39192000,
            'Interest Expense': 10180000
        }
    },
    {
        id: 'C003',
        loanId: 'L002',
        type: 'Negative',
        name: 'Limitation on Indebtedness',
        threshold: 'N/A',
        actual: 'Review Required',
        trend: 'flat',
        status: 'Review',
        legalText: "The Borrower shall not create, incur, assume or suffer to exist any Indebtedness, except: (a) Indebtedness under the Loan Documents; (b) Indebtedness existing on the Closing Date...",
        formula: 'Check Permitted Baskets',
        variables: {}
    }
];

export const MOCK_ACTIVITY = [
    { id: 1, user: 'Sarah Jenkins', role: 'Credit Analyst', action: 'uploaded compliance certificate', target: 'Q4 2024 Financials.pdf', time: '2 hours ago', avatar: 'SJ' },
    { id: 2, user: 'AI Copilot', role: 'System', action: 'flagged potential breach', target: 'Nebula Systems - Revolver', time: '4 hours ago', avatar: 'AI' },
    { id: 3, user: 'Michael Ross', role: 'Portfolio Manager', action: 'approved waiver request', target: 'GreenEnergy Corp', time: '1 day ago', avatar: 'MR' },
    { id: 4, user: 'System', role: 'Automated', action: 'generated quarterly report', target: 'Portfolio Summary Q3', time: '2 days ago', avatar: 'SYS' }
];

export const MOCK_FINANCIAL_HISTORY = [
    { quarter: 'Q1 2024', leverage: 4.8, coverage: 3.1, liquidity: 1.2 },
    { quarter: 'Q2 2024', leverage: 4.6, coverage: 3.3, liquidity: 1.4 },
    { quarter: 'Q3 2024', leverage: 4.4, coverage: 3.6, liquidity: 1.5 },
    { quarter: 'Q4 2024', leverage: 4.2, coverage: 3.8, liquidity: 1.8 }
];
