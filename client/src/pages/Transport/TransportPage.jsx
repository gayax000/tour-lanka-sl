import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';

export default function TransportPage() {
  const [vehicles, setVehicles] = useState([]);
  const [district, setDistrict] = useState('All');

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/transports?district=${district}`);
      setVehicles(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchVehicles(); }, [district]);

  return (
    <div className="container">
      <h2>🛺 Authentic Local Transport & Tuk-Tuk Rentals ({vehicles.length})</h2>
      <p style={{ color: '#64748b' }}>Rent traditional Sri Lankan Tuk-Tuks, Scooters, and Safari Jeeps directly from local drivers</p>

      <div style={{ margin: '20px 0' }}>
        <select className="form-control" style={{ width: '240px' }} value={district} onChange={e => setDistrict(e.target.value)}>
          <option value="All">📍 All Districts</option>
          <option>Ella & Badulla</option>
          <option>Sigiriya & Dambulla</option>
          <option>Mirissa & Galle</option>
          <option>Kandy & Nuwara Eliya</option>
          <option>Yala & Tissamaharama</option>
        </select>
      </div>

      <div className="card-grid">
        {vehicles.map(v => (
          <div key={v._id} className="card" style={{ borderTop: '4px solid #0284c7' }}>
            <div>
              <span className="badge badge-adventure">{v.vehicleType}</span>
              <h3 style={{ marginTop: '10px' }}>{v.driverName}</h3>
              <p style={{ color: '#0284c7', fontWeight: 700 }}>📍 {v.district}</p>
              <p style={{ fontSize: '18px', fontWeight: 800, color: '#059669', margin: '8px 0' }}>Rs. {v.pricePerDay} / day</p>
              <p style={{ fontSize: '13px', color: '#475569' }}>📞 WhatsApp: {v.contactPhone}</p>
            </div>
            <a href={`https://wa.me/${v.contactPhone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: '15px' }}>
              💬 Contact Driver
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}