import express from 'express';
import cors from 'cors';
import db from './db.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Status
app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', message: 'CovenantIQ Backend Online' });
});

// Loans
app.get('/api/loans', (req, res) => {
    db.all("SELECT * FROM loans", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/loans', (req, res) => {
    const { name, borrower, amount, currency } = req.body;
    db.run(`INSERT INTO loans (name, borrower, amount, currency) VALUES (?, ?, ?, ?)`,
        [name, borrower, amount, currency],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Covenants
app.get('/api/covenants', (req, res) => {
    const sql = `SELECT covenants.*, loans.name as loan_name 
               FROM covenants 
               JOIN loans ON covenants.loan_id = loans.id`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/covenants', (req, res) => {
    const { loan_id, description, type, threshold, status } = req.body;
    db.run(`INSERT INTO covenants (loan_id, description, type, threshold, status) VALUES (?, ?, ?, ?, ?)`,
        [loan_id, description, type, threshold, status],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Financials
app.get('/api/financials', (req, res) => {
    db.all("SELECT * FROM financials ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/financials', (req, res) => {
    const { loan_id, period, revenue, ebitda, net_debt } = req.body;
    db.run(`INSERT INTO financials (loan_id, period, revenue, ebitda, net_debt) VALUES (?, ?, ?, ?, ?)`,
        [loan_id, period, revenue, ebitda, net_debt],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Reports
app.get('/api/reports', (req, res) => {
    db.all("SELECT * FROM reports ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
