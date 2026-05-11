import React from 'react';

const BlackspotTable = () => {
  const blackspots = [
    { id: 1, location: 'SG Highway, Ahmedabad', accidents: 45, fatalities: 12, score: 8.5 },
    { id: 2, location: 'Ring Road, Surat', accidents: 38, fatalities: 8, score: 7.2 },
    { id: 3, location: 'Kalupur Circle, Ahmedabad', accidents: 32, fatalities: 5, score: 6.8 },
    { id: 4, location: 'Sayajigunj, Vadodara', accidents: 28, fatalities: 4, score: 6.2 },
    { id: 5, location: 'Rajkot Bypass', accidents: 25, fatalities: 6, score: 5.9 },
  ];

  return (
    <div className="card">
      <h3 className="label-micro" style={{ marginBottom: '16px' }}>Identified Blackspots</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--rule)' }}>
            <th style={{ padding: '12px 8px', color: 'var(--ink-3)', fontWeight: 500 }} className="label-micro">Location</th>
            <th style={{ padding: '12px 8px', color: 'var(--ink-3)', fontWeight: 500 }} className="label-micro">Accidents</th>
            <th style={{ padding: '12px 8px', color: 'var(--ink-3)', fontWeight: 500 }} className="label-micro">Fatalities</th>
            <th style={{ padding: '12px 8px', color: 'var(--ink-3)', fontWeight: 500 }} className="label-micro">Severity Score</th>
          </tr>
        </thead>
        <tbody>
          {blackspots.map((spot) => (
            <tr key={spot.id} style={{ borderBottom: '1px solid var(--rule)' }}>
              <td style={{ padding: '12px 8px', color: 'var(--ink)' }}>{spot.location}</td>
              <td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>{spot.accidents}</td>
              <td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>{spot.fatalities}</td>
              <td style={{ padding: '12px 8px' }}>
                <span style={{
                  background: spot.score > 8 ? 'var(--critical-bg)' : 'var(--primary-soft)',
                  color: spot.score > 8 ? 'var(--critical-text)' : 'var(--primary)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: `1px solid ${spot.score > 8 ? 'var(--critical-border)' : 'var(--primary-mid)'}`
                }}>
                  {spot.score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlackspotTable;
