import React, { useState, useEffect } from 'react';

export default function GuideModal({ isOpen, onClose, onSave, editingDoc }) {
  const [formData, setFormData] = useState({
    name: '', providerType: 'Local Guide', district: 'Ella & Badulla', category: 'Hiking & Nature',
    languages: 'English, Sinhala', pricePerDay: '', contactEmail: '', bio: '', experienceTags: ['🌿 Eco Tourism', '🍛 Local Culture']
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('tourLankaUser') || 'null');
    if (editingDoc) {
      setFormData(editingDoc);
    } else {
      setFormData({
        name: user ? user.name : '',
        providerType: 'Local Guide',
        district: user && user.district ? user.district : 'Ella & Badulla',
        category: 'Hiking & Nature',
        languages: 'English, Sinhala',
        pricePerDay: '',
        contactEmail: user ? user.email : '',
        bio: '',
        experienceTags: ['🌿 Eco Tourism', '🍛 Local Culture']
      });
    }
    setErrors({});
  }, [editingDoc, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Guide / Provider name is required';
    if (!formData.languages.trim()) errs.languages = 'Languages are required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail.trim() || !emailRegex.test(formData.contactEmail.trim())) {
      errs.contactEmail = 'Valid contact email is required';
    }
    if (formData.pricePerDay === '' || Number(formData.pricePerDay) < 0) {
      errs.pricePerDay = 'Valid positive daily price is required';
    }
    if (!formData.bio.trim()) errs.bio = 'Description bio is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editingDoc ? '✏️ Edit Guide Listing' : '🌿 Register Local Guide / Experience Service'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="form-group">
            <label>Provider Name <span style={{ color: 'red' }}>*</span></label>
            <input 
              className="form-control" 
              required
              placeholder="Suneth Perera (Ella Nature Guide)" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Provider Type</label>
              <select className="form-control" value={formData.providerType} onChange={e => setFormData({...formData, providerType: e.target.value})}>
                <option>Local Guide</option>
                <option>Tuk-Tuk Driver</option>
                <option>Village Homestay</option>
              </select>
            </div>

            <div className="form-group">
              <label>District / Region <span style={{ color: 'red' }}>*</span></label>
              <select className="form-control" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})}>
                <option>Ella & Badulla</option>
                <option>Sigiriya & Dambulla</option>
                <option>Mirissa & Galle</option>
                <option>Kandy & Nuwara Eliya</option>
                <option>Yala & Tissamaharama</option>
                <option>Colombo & Negombo</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tour Category <span style={{ color: 'red' }}>*</span></label>
            <select className="form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option>Hiking & Nature</option>
              <option>Cultural & Heritage</option>
              <option>Wildlife Safari</option>
              <option>Surfing & Beach</option>
              <option>Culinary & Village Tour</option>
            </select>
          </div>

          <div className="form-group">
            <label>Languages Spoken <span style={{ color: 'red' }}>*</span></label>
            <input 
              className="form-control" 
              required
              placeholder="English, Sinhala, German" 
              value={formData.languages} 
              onChange={e => setFormData({...formData, languages: e.target.value})} 
            />
            {errors.languages && <div className="error-text">{errors.languages}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Daily Fee (Rs. / LKR) <span style={{ color: 'red' }}>*</span></label>
              <input 
                type="number" 
                min="0" 
                required
                className="form-control" 
                placeholder="5500" 
                value={formData.pricePerDay} 
                onChange={e => setFormData({...formData, pricePerDay: e.target.value === '' ? '' : Number(e.target.value)})} 
              />
              {errors.pricePerDay && <div className="error-text">{errors.pricePerDay}</div>}
            </div>

            <div className="form-group">
              <label>Contact Email <span style={{ color: 'red' }}>*</span></label>
              <input 
                type="email" 
                className="form-control" 
                required
                readOnly={!editingDoc}
                style={!editingDoc ? { background: '#f1f5f9', cursor: 'not-allowed', color: '#475569' } : {}}
                placeholder="guide@tourlanka.lk" 
                value={formData.contactEmail} 
                onChange={e => setFormData({...formData, contactEmail: e.target.value})} 
              />
              {!editingDoc && <small style={{ color: '#059669', fontSize: '11px', fontWeight: 600 }}>🔒 Bound to your logged-in account email ({formData.contactEmail || 'user'})</small>}
              {errors.contactEmail && <div className="error-text">{errors.contactEmail}</div>}
            </div>
          </div>

          <div className="form-group">
            <label>Description & Bio <span style={{ color: 'red' }}>*</span></label>
            <textarea 
              rows="3" 
              className="form-control" 
              required
              placeholder="Experienced local guide with 5+ years experience hiking Ella Rock and Nine Arch Bridge..." 
              value={formData.bio} 
              onChange={e => setFormData({...formData, bio: e.target.value})} 
            />
            {errors.bio && <div className="error-text">{errors.bio}</div>}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingDoc ? 'Update Listing' : 'Save Guide'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}