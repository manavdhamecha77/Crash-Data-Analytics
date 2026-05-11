import { useEffect, useState } from 'react';
import { getBlackspots } from '../services/api';

const BlackspotTable = () => {
  const [blackspots, setBlackspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlackspots = async () => {
      try {
        const res = await getBlackspots();
        setBlackspots(res.data);
      } catch (err) {
        console.error("Error fetching blackspots:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlackspots();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', color: 'var(--ink-3)' }}>Analyzing blackspots...</div>;
  }

  if (blackspots.length === 0) {
    return (
      <div className="card">
        <h3 className="label-micro" style={{ marginBottom: '16px' }}>Identified Blackspots</h3>
        <p style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-3)' }}>No significant blackspot clusters identified with current parameters.</p>
      </div>
    );
  }

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
                  background: spot.score > 3 ? 'var(--critical-bg)' : 'var(--primary-soft)',
                  color: spot.score > 3 ? 'var(--critical-text)' : 'var(--primary)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: `1px solid ${spot.score > 3 ? 'var(--critical-border)' : 'var(--primary-mid)'}`
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
