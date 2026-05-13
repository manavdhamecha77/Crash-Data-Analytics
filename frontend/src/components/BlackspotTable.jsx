import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Circle, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPoints } from '../services/api';
import { runDBSCAN } from '../services/clustering';
import { Play, Map as MapIcon, Table as TableIcon, Settings } from 'lucide-react';

const BlackspotTable = () => {
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  
  // DBSCAN Parameters
  const [eps, setEps] = useState(5000); // 5000 meters
  const [minSamples, setMinSamples] = useState(3);

  const center = [22.4, 71.2]; // Region center

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await getPoints();
        setPoints(res.data);
        
        // Initial run
        const result = runDBSCAN(res.data, eps, minSamples);
        setClusters(result.clusters);
      } catch (err) {
        console.error("Error fetching points:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    // Use setTimeout to allow UI to show "Analyzing" if it was slow, 
    // though DBSCAN on ~1500 points is fast.
    setTimeout(() => {
      const result = runDBSCAN(points, eps, minSamples);
      setClusters(result.clusters);
      setAnalyzing(false);
    }, 100);
  };

  if (loading) {
    return <div style={{ padding: '20px', color: 'var(--ink-3)' }}>Loading spatial data...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: 'var(--ink)' }}>Blackspot Identification</h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Algorithmic detection of high-risk accident clusters using DBSCAN.</p>
        </div>
        
        <div className="card" style={{ padding: '12px 20px', display: 'flex', gap: '20px', alignItems: 'center', marginBottom: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="label-micro" style={{ fontSize: '10px' }}>Epsilon (Meters)</label>
            <input 
              type="number" 
              value={eps} 
              onChange={(e) => setEps(Number(e.target.value))}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--rule)', width: '80px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="label-micro" style={{ fontSize: '10px' }}>Min Neighbours</label>
            <input 
              type="number" 
              value={minSamples} 
              onChange={(e) => setMinSamples(Number(e.target.value))}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--rule)', width: '80px' }}
            />
          </div>
          <button 
            className="btn-primary" 
            onClick={handleRunAnalysis}
            disabled={analyzing}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
          >
            <Play size={16} />
            {analyzing ? 'Analyzing...' : 'Run DBSCAN'}
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ height: '500px', padding: 0, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, background: 'rgba(255,255,255,0.9)', padding: '8px', borderRadius: '4px', border: '1px solid var(--rule)', fontSize: '12px' }}>
            <strong>Raw Accidents</strong>
          </div>
          <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((point, idx) => (
              <CircleMarker
                key={`raw-${idx}`}
                center={[point.lat, point.lng]}
                radius={2}
                pathOptions={{ color: 'var(--ink)', fillColor: 'var(--ink)', fillOpacity: 0.8, weight: 0 }}
              />
            ))}
          </MapContainer>
        </div>

        <div className="card" style={{ height: '500px', padding: 0, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, background: 'rgba(255,255,255,0.9)', padding: '8px', borderRadius: '4px', border: '1px solid var(--rule)', fontSize: '12px' }}>
            <strong>DBSCAN Clusters</strong>
          </div>
          <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {clusters.map((spot) => (
              <LayerGroup key={`cluster-group-${spot.id}`}>
                {/* The "Blob": Union of Epsilon-radius circles around every point */}
                {spot.points.map((p, pIdx) => (
                  <Circle 
                    key={`p-${spot.id}-${pIdx}`}
                    center={[p.lat, p.lng]}
                    radius={eps}
                    pathOptions={{ 
                      color: spot.score > 3 ? 'var(--critical-text)' : 'var(--primary)',
                      fillColor: spot.score > 3 ? 'var(--critical-bg)' : 'var(--primary-soft)',
                      fillOpacity: 0.05, // Very low opacity to show density through overlap
                      stroke: false
                    }}
                  />
                ))}

                {/* Single marker for cluster identification and Popup */}
                <CircleMarker
                  center={[spot.lat, spot.lng]}
                  radius={6}
                  pathOptions={{ 
                    color: '#FFF', 
                    fillColor: spot.score > 3 ? 'var(--critical-text)' : 'var(--primary)',
                    fillOpacity: 1,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div style={{ padding: '4px' }}>
                      <p style={{ fontWeight: 600, marginBottom: '4px' }}>Blackspot Cluster {spot.id}</p>
                      <p style={{ fontSize: '12px' }}>Points in Cluster: {spot.accidents}</p>
                      <p style={{ fontSize: '12px' }}>Location: {spot.location}</p>
                      <p style={{ fontSize: '12px' }}>Avg Severity: {spot.score}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              </LayerGroup>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="label-micro" style={{ marginBottom: '16px' }}>Identified Blackspots Table</h3>
        {clusters.length === 0 ? (
           <p style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-3)' }}>No significant blackspot clusters identified with current parameters.</p>
        ) : (
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
              {clusters.map((spot) => (
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
        )}
      </div>
    </div>
  );
};

export default BlackspotTable;
