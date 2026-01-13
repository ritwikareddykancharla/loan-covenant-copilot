import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlite = sqlite3.verbose();

const dbPath = path.resolve(__dirname, 'covenantiq.db');
const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Loans Table
        db.run(`CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      borrower TEXT,
      amount REAL,
      currency TEXT
    )`);

        // Covenants Table
        db.run(`CREATE TABLE IF NOT EXISTS covenants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_id INTEGER,
      description TEXT,
      type TEXT, 
      threshold TEXT,
      status TEXT, 
      FOREIGN KEY(loan_id) REFERENCES loans(id)
    )`);

        // Financials Table (New)
        db.run(`CREATE TABLE IF NOT EXISTS financials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_id INTEGER,
      period TEXT,
      revenue REAL,
      ebitda REAL,
      net_debt REAL,
      FOREIGN KEY(loan_id) REFERENCES loans(id)
    )`);

        // Reports Table (New)
        db.run(`CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      period TEXT,
      status TEXT,
      date TEXT
    )`);

        // Seed Data if empty
        db.get("SELECT count(*) as count FROM loans", (err, row) => {
            if (row && row.count === 0) {
                console.log("Seeding database...");
                const stmt = db.prepare("INSERT INTO loans (name, borrower, amount, currency) VALUES (?, ?, ?, ?)");
                stmt.run("TechCorp Term Loan B", "TechCorp Inc.", 500000000, "USD");
                stmt.run("Apex Holdings RCF", "Apex Holdings", 150000000, "EUR");
                stmt.finalize();

                const covStmt = db.prepare("INSERT INTO covenants (loan_id, description, type, threshold, status) VALUES (?, ?, ?, ?, ?)");
                covStmt.run(1, "Max Net Leverage", "Financial", "<= 4.00x", "At Risk");
                covStmt.run(1, "Min Interest Coverage", "Financial", ">= 3.00x", "Compliant");
                covStmt.run(2, "Clean Down Period", "Negative", "5 Days", "Compliant");
                covStmt.finalize();

                const finStmt = db.prepare("INSERT INTO financials (loan_id, period, revenue, ebitda, net_debt) VALUES (?, ?, ?, ?, ?)");
                finStmt.run(1, "Q4 2024", 125000000, 45200000, 176800000); // Leverage ~3.91x
                finStmt.run(1, "Q3 2024", 120000000, 42000000, 180000000); // Leverage ~4.28x
                finStmt.run(1, "Q2 2024", 115000000, 39000000, 185000000);
                finStmt.finalize();

                const repStmt = db.prepare("INSERT INTO reports (name, period, status, date) VALUES (?, ?, ?, ?)");
                repStmt.run("Portfolio Compliance Summary", "Q4 2024", "Ready", "Jan 15, 2025");
                repStmt.run("TechCorp Covenant Detail", "FY 2024", "Draft", "Jan 14, 2025");
                repStmt.finalize();
            }
        });
    });
}

export default db;
