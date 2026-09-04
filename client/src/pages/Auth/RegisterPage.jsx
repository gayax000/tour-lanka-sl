import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'admin', district: 'Ella & Badulla', contactPhone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      localStorage.setItem('tourLankaUser', JSON.stringify(res.data.user));
      alert(`Account created successfully! Welcome ${res.data.user.name}`);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '520px', marginTop: '30px' }}>
      <div className="card" style={{ padding: '32px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>📝 Join TourLanka SL Provider Network</h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
          Register as a Local Eco Guide or Transport Provider
        </p>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name / Business Name <span style={{ color: 'red' }}>*</span></label>
            <input 
              className="form-control" 
              required 
              placeholder="Suneth Perera (Ella Eco Guide)" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Email Address <span style={{ color: 'red' }}>*</span></label>
            <input 
              type="email" 
              className="form-control" 
              required 
              placeholder="suneth@tours.lk" 
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
              minLength={6} 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Account Role <span style={{ color: 'red' }}>*</span></label>
            <select className="form-control" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="admin">🛠️ Local Provider / Guide / Admin</option>
              <option value="tourist">👁️ Tourist (Traveler)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Primary Tourism District <span style={{ color: 'red' }}>*</span></label>
            <select className="form-control" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})}>
              <option>Ella & Badulla</option>
              <option>Sigiriya & Dambulla</option>
              <option>Mirissa & Galle</option>
              <option>Kandy & Nuwara Eliya</option>
              <option>Yala & Tissamaharama</option>
              <option>Colombo & Negombo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contact Phone (WhatsApp)</label>
            <input 
              type="tel" 
              className="form-control" 
              placeholder="0771234567" 
              value={formData.contactPhone} 
              onChange={e => setFormData({...formData, contactPhone: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Register Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
          Already registered? <Link to="/login" style={{ color: '#059669', fontWeight: 600 }}>Login Here</Link>
        </p>
      </div>
    </div>
  );
}