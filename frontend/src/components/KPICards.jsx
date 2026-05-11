import React from 'react';

const KPICard = ({ label, value, delta, color = 'var(--primary)' }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <span className="label-micro">{label}</span>
    <span style={{ fontSize: '24px', color: 'var(--ink)' }} className="serif">{value}</span>
    <div style={{ height: '2px', width: '100%', background: 'var(--rule)', borderRadius: '1px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: '70%', background: color }}></div>
    </div>
    <span className="label-micro" style={{ textTransform: 'none' }}>{delta}</span>
  </div>
);

const KPICards = ({ data }) => {
  const kpis = [
    { label: 'Total Accidents', value: data?.total || '1,284', delta: '↑ 12% from last month' },
    { label: 'Fatalities', value: data?.fatalities || '142', delta: '↓ 4% from last month', color: 'var(--critical-text)' },
    { label: 'Peak District', value: data?.peakDistrict || 'Ahmedabad', delta: '32% of total cases' },
    { label: 'Peak Hour', value: data?.peakHour || '18:00 - 20:00', delta: 'Evening commute peak' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginBottom: '28px'
    }}>
      {kpis.map((kpi, i) => (
        <KPICard key={i} {...kpi} />
      ))}
    </div>
  );
};

export default KPICards;
