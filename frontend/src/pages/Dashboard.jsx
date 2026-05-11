import React from 'react';
import KPICards from '../components/KPICards';
import SeverityChart from '../components/SeverityChart';
import HourlyTrend from '../components/HourlyTrend';
import DistrictChart from '../components/DistrictChart';
import WeatherChart from '../components/WeatherChart';
import HeatmapMap from '../components/HeatmapMap';
import BlackspotTable from '../components/BlackspotTable';

const Dashboard = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      padding: '28px',
      marginLeft: '240px' // Offset for fixed sidebar
    }}>
      <header>
        <h2 style={{ fontSize: '24px', color: 'var(--ink)' }}>Executive Summary</h2>
        <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Overview of road safety and crash patterns across the region.</p>
      </header>

      <KPICards />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        <SeverityChart />
        <HourlyTrend />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        <DistrictChart />
        <WeatherChart />
      </div>

      <HeatmapMap />

      <BlackspotTable />
    </div>
  );
};

export default Dashboard;
