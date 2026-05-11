import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import HeatmapMap from './components/HeatmapMap';
import BlackspotTable from './components/BlackspotTable';
import Analytics from './pages/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Spatial Analysis':
        return <div style={{ marginLeft: '240px', padding: '28px' }}><HeatmapMap /></div>;
      case 'Analytics':
        return <Analytics />;
      case 'Blackspots':
        return <div style={{ marginLeft: '240px', padding: '28px' }}><BlackspotTable /></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
