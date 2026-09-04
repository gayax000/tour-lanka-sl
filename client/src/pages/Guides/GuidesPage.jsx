import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import GuideModal from './GuideModal';
import TouristBookingModal from './TouristBookingModal';

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Tourist booking state
  const [bookingProvider, setBookingProvider] = useState(null);
  const [isTouristModalOpen, setIsTouristModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('tourLankaUser') || 'null');
  const isAdmin = user && user.role === 'admin';

  const fetchGuides = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/guides?district=${districtFilter}&providerType=${typeFilter}&search=${searchTerm}`);
      setGuides(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchGuides(); }, [districtFilter, typeFilter, searchTerm]);

  const handleSave = async (formData) => {
    try {
      if (editingDoc) {
        await axios.put(`${API_BASE_URL}/api/guides/${editingDoc._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/guides`, formData);
      }
      setIsModalOpen(false);
      setEditingDoc(null);
      fetchGuides();
    } catch (err) { alert(err.response?.data?.error || 'Error saving guide profile'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this provider profile?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/guides/${id}`);
        fetchGuides();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2>🌿 Local Guides & Authentic Eco-Experiences ({guides.length})</h2>
          <p style={{ color: '#64748b' }}>Connect directly with verified Sri Lankan local guides & village experience hosts</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { 
            if (!user) {
              alert('Please login or register to publish your guide listing.');
              return;
            }
            setEditingDoc(null); 
            setIsModalOpen(true); 
          }}
        >
          + Register Guide Listing
        </button>
      </div>

      {/* Advanced Filters & Quick Location Pills */}
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '20px 0' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <input 
            type="text" 
            className="form-control" 
            style={{ flex: '1 1 240px' }}
            placeholder="🔍 Search guide by name, location (Ella, Sigiriya), language or bio..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />

          <select className="form-control" style={{ width: '200px' }} value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
            <option value="All">📍 All Districts</option>
            <option>Ella & Badulla</option>
            <option>Sigiriya & Dambulla</option>
            <option>Mirissa & Galle</option>
            <option>Kandy & Nuwara Eliya</option>
            <option>Yala & Tissamaharama</option>
            <option>Colombo & Negombo</option>
          </select>

          <select className="form-control" style={{ width: '180px' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="All">👤 All Provider Types</option>
            <option>Local Guide</option>
            <option>Tuk-Tuk Driver</option>
            <option>Village Homestay</option>
          </select>
        </div>

        {/* Quick Location Pills */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', fontSize: '13px' }}>
          <span style={{ fontWeight: 700, color: '#64748b' }}>📍 Popular Places:</span>
          {['Ella', 'Sigiriya', 'Mirissa', 'Kandy', 'Yala'].map(place => (
            <button
              key={place}
              type="button"
              onClick={() => setSearchTerm(place === searchTerm ? '' : place)}
              className="btn"
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                background: searchTerm.toLowerCase() === place.toLowerCase() ? '#059669' : '#f1f5f9',
                color: searchTerm.toLowerCase() === place.toLowerCase() ? 'white' : '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '16px'
              }}
            >
              {place}
            </button>
          ))}
          {searchTerm && (
            <button 
              type="button" 
              onClick={() => setSearchTerm('')} 
              style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
            >
              ✖ Clear Search
            </button>
          )}
        </div>
      </div>

      <div className="card-grid">
        {guides.map(guide => {
          // Ownership Check: User can ONLY Edit/Delete their OWN listing!
          const isOwner = user && user.email && guide.contactEmail && (
            user.email.trim().toLowerCase() === guide.contactEmail.trim().toLowerCase() || 
            user.email.trim().toLowerCase() === 'admin@tourlanka.lk'
          );

          return (
            <div key={guide._id} className="card" style={{ borderTop: '4px solid #059669' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                  <span className="badge badge-eco">📍 {guide.district}</span>
                  <span style={{ color: '#059669', fontWeight: 800, fontSize: '15px' }}>Rs. {guide.pricePerDay} / day</span>
                </div>

                <h3 style={{ marginTop: '10px', color: '#0f172a' }}>{guide.name}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0', fontWeight: 600 }}>🏷️ {guide.category} ({guide.providerType})</p>
                
                {/* Experience Badges */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '8px 0' }}>
                  {(guide.experienceTags || ['🌿 Eco Tourism', '🍛 Local Culture']).map((tag, idx) => (
                    <span key={idx} style={{ background: '#f1f5f9', color: '#334155', fontSize: '11px', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p style={{ color: '#334155', fontSize: '13px', marginTop: '8px', lineHeight: 1.4 }}>{guide.bio}</p>
                
                <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', marginTop: '12px', fontSize: '12px' }}>
                  <p>🗣️ <strong>Languages:</strong> {guide.languages}</p>
                  <p>✉️ <strong>Contact:</strong> {guide.contactEmail}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '16px' }}>
                <button 
                  type="button"
                  className="btn btn-primary" 
                  style={{ padding: '8px 14px', fontSize: '13px', flex: 1 }}
                  onClick={() => {
                    setBookingProvider(guide);
                    setIsTouristModalOpen(true);
                  }}
                >
                  📅 Book Now
                </button>

                {/* Only render Edit & Delete if user is the OWNER of this listing! */}
                {isOwner && (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => { setEditingDoc(guide); setIsModalOpen(true); }}>Edit</button>
                    <button className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => handleDelete(guide._id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <GuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingDoc={editingDoc} />

      {/* Tourist Provider Booking Modal */}
      <TouristBookingModal 
        isOpen={isTouristModalOpen} 
        onClose={() => {
          setIsTouristModalOpen(false);
          setBookingProvider(null);
        }} 
        provider={bookingProvider} 
      />
    </div>
  );
}