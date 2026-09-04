import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';

export default function Home() {
  const [stats, setStats] = useState({ guides: 0, bookings: 0, transports: 0, reviews: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [g, b, t, r] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/guides`),
          axios.get(`${API_BASE_URL}/api/bookings`),
          axios.get(`${API_BASE_URL}/api/transports`),
          axios.get(`${API_BASE_URL}/api/reviews`)
        ]);
        setStats({
          guides: g.data.length,
          bookings: b.data.length,
          transports: t.data.length,
          reviews: r.data.length
        });
      } catch (err) { console.error(err); }
    };
    fetchStats();
  }, []);

  return (
    <div>
      {/* Hero Banner Section */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
            🇱🇰 Empowering Authentic Sri Lankan Eco-Tourism
          </span>
          <h1 style={{ fontSize: '40px', marginTop: '16px', color: '#ffffff', lineHeight: 1.2 }}>
            Experience Genuine Sri Lanka With Verified Local Guides & Tuk-Tuk Drivers
          </h1>
          <p style={{ fontSize: '16px', color: '#a7f3d0', marginTop: '12px', lineHeight: 1.6 }}>
            Direct booking with zero middleman commissions. Supporting village homestays, local tuk-tuk drivers, and eco-tour guides across Sri Lanka.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
            <Link to="/guides" className="btn btn-primary" style={{ background: '#ffffff', color: '#047857', fontSize: '15px', padding: '12px 24px' }}>
              🌿 Explore Eco Guides
            </Link>
            <Link to="/transport" className="btn btn-secondary" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.4)', fontSize: '15px', padding: '12px 24px' }}>
              🛺 Rent Local Tuk-Tuk
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* PDF Requirement #2: Sri Lankan Problem & Solution Statement Box */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #a7f3d0',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.08)'
        }}>
          <h3 style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📌 The Sri Lankan Tourism Challenge & Our Solution
          </h3>
          <p style={{ color: '#334155', fontSize: '14px', marginTop: '8px', lineHeight: 1.6 }}>
            <strong>The Problem:</strong> Local Sri Lankan guides, village homestay hosts, and tuk-tuk operators struggle to reach foreign and local tourists due to hefty 15-25% commission fees charged by foreign booking aggregators.
          </p>
          <p style={{ color: '#334155', fontSize: '14px', marginTop: '6px', lineHeight: 1.6 }}>
            <strong>Our Solution (TourLanka SL):</strong> A commission-free direct experience platform connecting tourists with verified local guides and transport operators. Filter by region (Ella, Sigiriya, Mirissa, Kandy) and authentic experience tags (Eco Tourism, Village Food, Wildlife).
          </p>
        </div>

        {/* Live Metrics Grid */}
        <h3 style={{ marginBottom: '16px' }}>📊 Live Platform Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #059669' }}>
            <h1 style={{ fontSize: '36px', color: '#059669' }}>{stats.guides}</h1>
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>🌿 Verified Local Guides</p>
          </div>
          <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #0284c7' }}>
            <h1 style={{ fontSize: '36px', color: '#0284c7' }}>{stats.transports}</h1>
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>🛺 Tuk-Tuk & Rentals</p>
          </div>
          <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #d97706' }}>
            <h1 style={{ fontSize: '36px', color: '#d97706' }}>{stats.bookings}</h1>
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>📋 Tour Bookings Made</p>
          </div>
          <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #7c3aed' }}>
            <h1 style={{ fontSize: '36px', color: '#7c3aed' }}>{stats.reviews}</h1>
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>⭐ Tourist Reviews</p>
          </div>
        </div>

        {/* Eco Experience Highlights */}
        <div style={{ marginTop: '48px' }}>
          <h3>🌿 Explore Authentic Sri Lankan Eco Experiences</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
            <div className="card">
              <span className="badge badge-eco" style={{ width: 'fit-content' }}>🏞️ Nature & Hiking</span>
              <h4 style={{ marginTop: '10px' }}>Ella Rock & Nine Arch Trek</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Guided sunrise hikes through tea plantations with local tea tasting.</p>
            </div>
            <div className="card">
              <span className="badge badge-culture" style={{ width: 'fit-content' }}>🍛 Village Culinary</span>
              <h4 style={{ marginTop: '10px' }}>Authentic Clay-Pot Cooking</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Learn traditional Sri Lankan rice & curry cooking in Sigiriya village.</p>
            </div>
            <div className="card">
              <span className="badge badge-adventure" style={{ width: 'fit-content' }}>🛺 Tuk-Tuk Coastal Tour</span>
              <h4 style={{ marginTop: '10px' }}>Mirissa Coast & Surfing Safari</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Drive along secret beaches with experienced local tuk-tuk drivers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}