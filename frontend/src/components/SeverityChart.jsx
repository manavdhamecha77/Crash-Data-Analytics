import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SeverityChart = ({ data = [] }) => {
  return (
    <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
      <h3 className="label-micro" style={{ marginBottom: '16px' }}>Accident Severity</h3>
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--rule)" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="severity" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--ink-2)', fontSize: 12 }} 
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
            <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SeverityChart;
