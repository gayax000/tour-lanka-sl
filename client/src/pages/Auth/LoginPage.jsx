import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../api';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      localStorage.setItem('tourLankaUser', JSON.stringify(res.data.user));
      alert(`Welcome back, ${res.data.user.name}!`);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '480px', marginTop: '40px' }}>
      <div className="card" style={{ padding: '32px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>🔑 Login to TourLanka SL</h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
          Access your provider dashboard or manage bookings
        </p>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address <span style={{ color: 'red' }}>*</span></label>
            <input 
              type="email" 
              className="form-control" 
              required 
              placeholder="guide@tourlanka.lk" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Password <span style={{ color: 'red' }}>*</span></label>
            <input 
              type="password" 
              className="form-control" 
              required 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login Now
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
          New Local Guide or Tuk-Tuk Driver? <Link to="/register" style={{ color: '#059669', fontWeight: 600 }}>Register Here</Link>
        </p>
      </div>
    </div>
  );
}