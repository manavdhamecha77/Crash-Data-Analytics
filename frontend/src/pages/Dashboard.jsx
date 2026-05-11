import React, { useEffect, useState } from 'react';
import KPICards from '../components/KPICards';
import SeverityChart from '../components/SeverityChart';
import HourlyTrend from '../components/HourlyTrend';
import DistrictChart from '../components/DistrictChart';
import HeatmapMap from '../components/HeatmapMap';
import { getSummary, getSeverity, getHourlyTrend, getDistricts } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState({
    summary: null,
    severity: [],
    hourly: [],
    districts: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, severityRes, hourlyRes, districtsRes] = await Promise.all([
          getSummary(),
          getSeverity(),
          getHourlyTrend(),
          getDistricts()
        ]);

        setData({
          summary: summaryRes.data,
          severity: severityRes.data,
          hourly: hourlyRes.data,
          districts: districtsRes.data,
          loading: false,
          error: null
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setData(prev => ({ ...prev, loading: false, error: "Failed to load data" }));
      }
    };

    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div style={{ marginLeft: '240px', padding: '40px', color: 'var(--ink-3)' }}>
        <p className="serif" style={{ fontSize: '24px' }}>Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      padding: '28px',
      marginLeft: '240px'
    }}>
      <header>
        <h2 style={{ fontSize: '24px', color: 'var(--ink)' }}>Executive Summary</h2>
        <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Overview of road safety and crash patterns across the region.</p>
      </header>

      <KPICards data={data.summary} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        <SeverityChart data={data.severity} />
        <HourlyTrend data={data.hourly} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px'
      }}>
        <DistrictChart data={data.districts} />
      </div>

      <HeatmapMap />
    </div>
  );
};

export default Dashboard;
