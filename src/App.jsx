import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Covenants from './pages/Covenants';
import Financials from './pages/Financials';
import Reports from './pages/Reports';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app/*" element={
          <Layout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="covenants" element={<Covenants />} />
              <Route path="financials" element={<Financials />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;





