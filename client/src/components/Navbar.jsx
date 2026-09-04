import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('tourLankaUser') || 'null');

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('tourLankaUser');
    navigate('/login');
  };

  return (
    <header style={{
      background: '#0f172a',
      color: 'white',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '14px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🏝️</span>
          <div>
            <h1 style={{ fontSize: '20px', color: '#ffffff', margin: 0 }}>TourLanka <span style={{ color: '#10b981' }}>SL</span></h1>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Authentic Eco-Tourism & Local Experiences</span>
          </div>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-secondary mobile-menu-btn"
          style={{ display: 'none', padding: '6px 12px', fontSize: '16px' }}
        >
          {mobileMenuOpen ? '✖ Close' : '☰ Menu'}
        </button>

        {/* Navigation Links */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="btn" style={{ background: isActive('/') ? '#10b981' : 'transparent', color: 'white' }}>
            🏡 Explore
          </Link>
          <Link to="/guides" onClick={() => setMobileMenuOpen(false)} className="btn" style={{ background: isActive('/guides') ? '#10b981' : 'transparent', color: 'white' }}>
            👤 Guides & Homestays
          </Link>
          <Link to="/transport" onClick={() => setMobileMenuOpen(false)} className="btn" style={{ background: isActive('/transport') ? '#10b981' : 'transparent', color: 'white' }}>
            🛺 Tuk-Tuk & Rentals
          </Link>
          <Link to="/reviews" onClick={() => setMobileMenuOpen(false)} className="btn" style={{ background: isActive('/reviews') ? '#10b981' : 'transparent', color: 'white' }}>
            ⭐ Reviews
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Link to="/bookings" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary">
                📋 My Bookings ({user.role === 'admin' ? 'Provider' : 'Tourist'})
              </Link>
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 12px' }}>
                Logout ({user.name.split(' ')[0]})
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary">+ Join Provider</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}