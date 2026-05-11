import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPoints } from '../services/api';

const HeatmapMap = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const position = [22.4, 71.2]; // Centered on Gujarat region

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await getPoints();
        setPoints(res.data);
      } catch (err) {
        console.error("Error fetching map points:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  return (
    <div className="card" style={{ height: '550px', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="label-micro">Accident Spatial Distribution</h3>
        {loading && <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Loading points...</span>}
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
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
      </div>
    </div>
  );
};

export default HeatmapMap;
