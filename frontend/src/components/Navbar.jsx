import React from 'react';
import { Clock } from 'lucide-react';

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
        <h1 style={{ fontSize: '28px', color: 'var(--ink)' }}>Crash Analytics</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-3)', fontSize: '12px' }}>
          <Clock size={14} />
          <span style={{ fontFamily: 'monospace' }}>{time}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
