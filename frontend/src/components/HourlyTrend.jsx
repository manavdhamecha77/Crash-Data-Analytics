import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { hour: '00:00', count: 45 },
  { hour: '04:00', count: 32 },
  { hour: '08:00', count: 85 },
  { hour: '12:00', count: 120 },
  { hour: '16:00', count: 165 },
  { hour: '20:00', count: 210 },
  { hour: '23:59', count: 95 },
];

const HourlyTrend = () => {
  return (
    <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
      <h3 className="label-micro" style={{ marginBottom: '16px' }}>Hourly Trend</h3>
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--rule)" />
            <XAxis 
              dataKey="hour" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--ink-2)', fontSize: 10 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--ink-2)', fontSize: 10 }} 
            />
            <Tooltip 
              contentStyle={{ 
                background: 'var(--paper)', 
                border: '1px solid var(--rule)', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="var(--primary)" 
              strokeWidth={2} 
              dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyTrend;
