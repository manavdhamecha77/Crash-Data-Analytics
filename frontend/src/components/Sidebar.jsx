import React from 'react';
import { LayoutDashboard, Map, BarChart3, AlertTriangle, Settings, FileText } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: active ? 'var(--primary)' : 'var(--ink-2)',
    background: active ? 'var(--primary-soft)' : 'transparent',
    fontSize: '14px',
    fontWeight: active ? 500 : 400,
    transition: 'all 0.2s'
  }}>
    <Icon size={18} />
    <span>{label}</span>
  </div>
);

const Sidebar = () => {
  return (
    <aside style={{
      width: '240px',
      height: 'calc(100vh - 73px)',
      padding: '24px 16px',
      borderRight: '1px solid var(--rule)',
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'fixed',
      left: 0,
      top: '73px'
    }}>
      <div className="label-micro" style={{ padding: '0 16px 8px' }}>Main Menu</div>
      <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
      <SidebarItem icon={Map} label="Spatial Analysis" />
      <SidebarItem icon={BarChart3} label="Analytics" />
      <SidebarItem icon={AlertTriangle} label="Blackspots" />
      
      <div className="label-micro" style={{ padding: '24px 16px 8px' }}>Support</div>
      <SidebarItem icon={FileText} label="Documentation" />
      <SidebarItem icon={Settings} label="Settings" />

      <div style={{ marginTop: 'auto', padding: '16px' }}>
        <div className="card" style={{ background: 'var(--cream)', padding: '12px' }}>
          <p className="label-micro" style={{ marginBottom: '4px' }}>System Status</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--ink)' }}>Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
