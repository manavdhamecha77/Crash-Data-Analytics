import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { getRoadClass, getCollisionTypes, getWeather, getTrafficViolations } from '../services/api';

const COLORS = ['#E54B4B', '#2D3047', '#419D78', '#FFB140', '#9381FF', '#5BC0EB', '#F26419', '#861657'];

const ChartCard = ({ title, children, height = '400px' }) => (
  <div className="card" style={{ padding: '24px', height: height, display: 'flex', flexDirection: 'column' }}>
    <h3 className="label-micro" style={{ marginBottom: '20px' }}>{title}</h3>
    <div style={{ flex: 1, width: '100%' }}>
      {children}
    </div>
  </div>
);

const Analytics = () => {
  const [data, setData] = useState({
    roadClass: [],
    collisionTypes: [],
    weather: [],
    trafficViolations: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roadRes, collisionRes, weatherRes, trafficRes] = await Promise.all([
          getRoadClass(),
          getCollisionTypes(),
          getWeather(),
          getTrafficViolations()
        ]);
        setData({
          roadClass: roadRes.data,
          collisionTypes: collisionRes.data,
          weather: weatherRes.data,
          trafficViolations: trafficRes.data,
          loading: false
        });
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div style={{ marginLeft: '240px', padding: '40px', color: 'var(--ink-3)' }}>
        <p className="serif" style={{ fontSize: '24px' }}>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: '240px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <h2 style={{ fontSize: '24px', color: 'var(--ink)' }}>Advanced Analytics</h2>
        <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Detailed breakdown of road infrastructure, environment, and behavioral factors.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <ChartCard title="Road Classification Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.roadClass} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--rule)" />
              <XAxis type="number" hide />
              <YAxis dataKey="type" type="category" width={120} tick={{ fontSize: 12, fill: 'var(--ink-2)' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'var(--primary-soft)' }} />
              <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Weather Condition Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.weather}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="condition"
              >
                {data.weather.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <ChartCard title="Collision Type Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.collisionTypes}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--rule)" />
              <XAxis dataKey="type" tick={{ fontSize: 10, fill: 'var(--ink-2)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--ink-2)' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--secondary)" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Traffic Violation Analysis">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.trafficViolations} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--rule)" />
              <XAxis type="number" hide />
              <YAxis dataKey="violation" type="category" width={140} tick={{ fontSize: 10, fill: 'var(--ink-2)' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'var(--primary-soft)' }} />
              <Bar dataKey="count" fill="var(--critical-text)" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analytics;
