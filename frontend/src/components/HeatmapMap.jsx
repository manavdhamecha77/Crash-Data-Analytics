import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import 'leaflet/dist/leaflet.css';
import { getPoints } from '../services/api';

const MapCard = ({ title, description, children }) => (
  <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
    <div style={{ padding: '16px' }}>
      <h3 className="label-micro">{title}</h3>
      <p style={{ fontSize: '11px', color: 'var(--ink-2)' }}>{description}</p>
    </div>
    <div style={{ flex: 1, position: 'relative' }}>
      {children}
    </div>
  </div>
);

const HeatmapMap = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const position = [22.4, 71.2]; // Centered on Gujarat region

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPoints();
        setPoints(res.data);
      } catch (err) {
        console.error("Error fetching spatial data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', color: 'var(--ink-3)' }}>
        <p className="serif" style={{ fontSize: '24px' }}>Analyzing spatial datasets...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <h2 style={{ fontSize: '24px', color: 'var(--ink)' }}>Spatial Analysis Suite</h2>
        <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Comparative geospatial views: raw distribution and intensity mapping.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        <MapCard 
          title="Accident Point Distribution" 
          description="Raw spatial data showing every individual accident record."
        >
          <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((point, idx) => (
              <CircleMarker
                key={idx}
                center={[point.lat, point.lng]}
                radius={2}
                pathOptions={{ color: '#E54B4B', fillColor: '#E54B4B', fillOpacity: 0.6 }}
              >
                <Popup>
                  Accident Location <br /> Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </MapCard>

        <MapCard 
          title="Accident Density Heatmap" 
          description="KDE intensity mapping visualizing general crash hotspots."
        >
          <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatmapLayer
              points={points}
              longitudeExtractor={p => p.lng}
              latitudeExtractor={p => p.lat}
              intensityExtractor={p => p.weight || 1}
              radius={25}
              blur={20}
              max={1.0}
              gradient={{ 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' }}
            />
          </MapContainer>
        </MapCard>
      </div>
    </div>
  );
};

export default HeatmapMap;
