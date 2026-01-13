const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export const fetchLoans = async () => {
    try {
        const response = await fetch(`${API_URL}/loans`);
        if (!response.ok) throw new Error('Failed to fetch loans');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createLoan = async (data) => {
    try {
        const response = await fetch(`${API_URL}/loans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create loan');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchCovenants = async () => {
    try {
        const response = await fetch(`${API_URL}/covenants`);
        if (!response.ok) throw new Error('Failed to fetch covenants');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createCovenant = async (data) => {
    try {
        const response = await fetch(`${API_URL}/covenants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create covenant');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchFinancials = async () => {
    try {
        const response = await fetch(`${API_URL}/financials`);
        if (!response.ok) throw new Error('Failed to fetch financials');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createFinancials = async (data) => {
    try {
        const response = await fetch(`${API_URL}/financials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add financials');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchReports = async () => {
    try {
        const response = await fetch(`${API_URL}/reports`);
        if (!response.ok) throw new Error('Failed to fetch reports');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
