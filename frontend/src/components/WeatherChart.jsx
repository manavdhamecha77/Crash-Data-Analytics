import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const dummyData = [
  { name: 'Clear', value: 750 },
  { name: 'Rainy', value: 240 },
  { name: 'Foggy', value: 180 },
  { name: 'Cloudy', value: 114 },
];

const COLORS = ['var(--primary)', 'var(--primary-mid)', 'var(--ink-3)', 'var(--rule)'];

const WeatherChart = () => {
  return (
    <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
      <h3 className="label-micro" style={{ marginBottom: '16px' }}>Weather Analysis</h3>
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dummyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {dummyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                background: 'var(--paper)', 
                border: '1px solid var(--rule)', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', color: 'var(--ink-2)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;
