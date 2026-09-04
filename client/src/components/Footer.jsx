import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#0f172a',
      color: '#94a3b8',
      padding: '30px 20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
      fontSize: '13px'
    }}>
      <div className="container" style={{ padding: 0 }}>
        <p style={{ color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
          🏝️ TourLanka SL — Empowering Authentic Sri Lankan Eco-Tourism & Local Guides
        </p>
        <p>Built for Sri Lanka | SLIIT SE3090 Mini Hackathon 2026</p>
      </div>
    </footer>
  );
}