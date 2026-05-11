import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDistricts } from '../services/api';

const DistrictChart = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  const fetchDistricts = async (newLimit) => {
    setLoading(true);
    try {
      const res = await getDistricts(newLimit === 'all' ? 0 : newLimit);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching districts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistricts(limit);
  }, [limit]);

  return (
    <div className="card" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="label-micro">Top Districts</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>Show:</span>
          <select 
            value={limit} 
            onChange={(e) => setLimit(e.target.value)}
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid var(--rule)',
              fontSize: '11px',
              background: 'var(--paper)',
              color: 'var(--ink)',
              cursor: 'pointer'
            }}
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <div style={{ flex: 1, width: '100%', position: 'relative' }}>
        {loading && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(255,255,255,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 1,
            fontSize: '12px',
            color: 'var(--ink-2)'
          }}>
            Updating...
          </div>
        )}
        <ResponsiveContainer width="100%" height={limit === 'all' ? (data.length * 25 + 50) : 250}>
          <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--rule)" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="district" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--ink-2)', fontSize: 11 }} 
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'var(--primary-soft)' }}
              contentStyle={{ 
                background: 'var(--paper)', 
                border: '1px solid var(--rule)', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistrictChart;
