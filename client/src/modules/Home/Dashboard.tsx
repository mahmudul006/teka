import { useState, useEffect } from 'react';

interface User {
  username: string;
  lastLogin?: string;
}

interface DashboardProps {
  onLogout: () => void;
  user?: User;
}

const Dashboard = ({ onLogout, user }: DashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  };

  const welcomeCardStyle = {
    ...cardStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1rem 0',
          }}
        >
          <h1 style={{ margin: 0, color: '#333' }}>Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#666', fontSize: '0.875rem' }}>
              {currentTime.toLocaleString()}
            </span>
            <button
              onClick={handleLogout}
              style={buttonStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#c82333';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#dc3545';
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Welcome Card */}
        <div style={welcomeCardStyle}>
          <h2 style={{ margin: '0 0 1rem 0' }}>
            Welcome back, {user?.username || 'User'}! 👋
          </h2>
          <p style={{ margin: 0, opacity: 0.9 }}>
            You have successfully logged into your dashboard. Here's what you
            can do:
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Profile</h3>
            <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
              View and edit your profile information
            </p>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#007bff',
                fontSize: '0.75rem',
              }}
            >
              Manage Profile
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Settings</h3>
            <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
              Configure your application preferences
            </p>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#28a745',
                fontSize: '0.75rem',
              }}
            >
              Open Settings
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Analytics</h3>
            <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
              View your usage statistics and reports
            </p>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#ffc107',
                color: '#212529',
                fontSize: '0.75rem',
              }}
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>
            Recent Activity
          </h3>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              ✅ Successfully logged in at {new Date().toLocaleString()}
            </div>
            {user?.lastLogin && (
              <div style={{ color: '#666', fontSize: '0.875rem' }}>
                Previous login: {user.lastLogin}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Quick Actions</h3>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'New Project', color: '#007bff' },
              { label: 'View Reports', color: '#28a745' },
              { label: 'Help Center', color: '#17a2b8' },
              { label: 'Contact Support', color: '#6f42c1' },
            ].map((action, index) => (
              <button
                key={index}
                style={{
                  ...buttonStyle,
                  backgroundColor: action.color,
                  minWidth: '120px',
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
