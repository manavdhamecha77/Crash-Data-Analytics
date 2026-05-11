import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, minHeight: 'calc(100vh - 73px)', background: 'var(--cream)' }}>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
