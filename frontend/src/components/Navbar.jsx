import React from 'react';
import { Activity, Clock } from 'lucide-react';

const Navbar = () => {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--ink)' }}>A2 Crash Analytics</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: 'var(--ink-2)',
          background: 'white',
          border: '1px solid var(--rule)',
          borderRadius: '20px',
          padding: '5px 11px'
        }}>
          <div className="pulse-dot" style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--primary)',
            borderRadius: '50%'
          }}></div>
          <span>LIVE</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-3)', fontSize: '12px' }}>
          <Clock size={14} />
          <span style={{ fontFamily: 'monospace' }}>{time}</span>
        </div>
        <button className="btn-primary">Export Report</button>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .pulse-dot {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
