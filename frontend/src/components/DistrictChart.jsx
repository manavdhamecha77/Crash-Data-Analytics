import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { district: 'Ahmedabad', count: 420 },
  { district: 'Surat', count: 350 },
  { district: 'Vadodara', count: 280 },
  { district: 'Rajkot', count: 210 },
  { district: 'Bhavnagar', count: 150 },
];

const DistrictChart = () => {
  return (
    <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
      <h3 className="label-micro" style={{ marginBottom: '16px' }}>Top Districts</h3>
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dummyData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--rule)" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="district" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--ink-2)', fontSize: 11 }} 
              width={80}
            />
            <Tooltip 
              cursor={{ fill: 'var(--cream)' }}
              contentStyle={{ 
                background: 'var(--paper)', 
                border: '1px solid var(--rule)', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="count" fill="var(--primary-mid)" radius={[0, 4, 4, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistrictChart;
