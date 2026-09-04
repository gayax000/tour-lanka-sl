import React, { useState, useEffect } from 'react';

export default function BookingModal({ isOpen, onClose, onSave, editingApp }) {
  const [formData, setFormData] = useState({
    touristName: '', touristEmail: '', touristPhone: '', guideOrService: '',
    district: 'Ella & Badulla', bookingDate: '', numberOfDays: 1, numberOfGuests: 2, totalAmount: 5000, status: 'Pending'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingApp) setFormData(editingApp);
    else setFormData({
      touristName: '', touristEmail: '', touristPhone: '', guideOrService: '',
      district: 'Ella & Badulla', bookingDate: '', numberOfDays: 1, numberOfGuests: 2, totalAmount: 5000, status: 'Pending'
    });
    setErrors({});
  }, [editingApp, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.touristName.trim()) errs.touristName = 'Tourist full name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.touristEmail.trim() || !emailRegex.test(formData.touristEmail.trim())) {
      errs.touristEmail = 'Valid email address is required';
    }
    if (!formData.touristPhone.trim()) errs.touristPhone = 'Phone / WhatsApp number is required';
    if (!formData.guideOrService.trim()) errs.guideOrService = 'Guide or tour service is required';
    if (!formData.bookingDate) errs.bookingDate = 'Booking date is required';
    if (formData.numberOfDays < 1) errs.numberOfDays = 'At least 1 day required';
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
        <h3>{editingApp ? '📑 Manage Booking Status' : '🗺️ Book Sri Lankan Tour Experience'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="form-group">
            <label>Tourist Full Name <span style={{ color: 'red' }}>*</span></label>
            <input 
              className="form-control" 
              required 
              placeholder="John Doe" 
              value={formData.touristName} 
              onChange={e => setFormData({...formData, touristName: e.target.value})} 
            />
            {errors.touristName && <div className="error-text">{errors.touristName}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Email Address <span style={{ color: 'red' }}>*</span></label>
              <input 
                type="email" 
                className="form-control" 
                required 
                placeholder="john@traveler.com" 
                value={formData.touristEmail} 
                onChange={e => setFormData({...formData, touristEmail: e.target.value})} 
              />
              {errors.touristEmail && <div className="error-text">{errors.touristEmail}</div>}
            </div>

            <div className="form-group">
              <label>Phone / WhatsApp <span style={{ color: 'red' }}>*</span></label>
              <input 
                type="tel" 
                className="form-control" 
                required 
                placeholder="0771234567" 
                value={formData.touristPhone} 
                onChange={e => setFormData({...formData, touristPhone: e.target.value})} 
              />
              {errors.touristPhone && <div className="error-text">{errors.touristPhone}</div>}
            </div>
          </div>

          <div className="form-group">
            <label>Guide / Experience Service <span style={{ color: 'red' }}>*</span></label>
            <input 
              className="form-control" 
              required 
              placeholder="Suneth Perera (Ella Hiking & Eco Tour)" 
              value={formData.guideOrService} 
              onChange={e => setFormData({...formData, guideOrService: e.target.value})} 
            />
            {errors.guideOrService && <div className="error-text">{errors.guideOrService}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Destination District</label>
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
              <label>Booking Start Date <span style={{ color: 'red' }}>*</span></label>
              <input 
                type="date" 
                className="form-control" 
                required 
                value={formData.bookingDate} 
                onChange={e => setFormData({...formData, bookingDate: e.target.value})} 
              />
              {errors.bookingDate && <div className="error-text">{errors.bookingDate}</div>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label>Days</label>
              <input 
                type="number" 
                min="1" 
                className="form-control" 
                value={formData.numberOfDays} 
                onChange={e => setFormData({...formData, numberOfDays: Number(e.target.value), totalAmount: Number(e.target.value) * 5000})} 
              />
            </div>

            <div className="form-group">
              <label>Guests</label>
              <input 
                type="number" 
                min="1" 
                className="form-control" 
                value={formData.numberOfGuests} 
                onChange={e => setFormData({...formData, numberOfGuests: Number(e.target.value)})} 
              />
            </div>

            <div className="form-group">
              <label>Est. Total (Rs.)</label>
              <input 
                type="number" 
                min="0" 
                className="form-control" 
                value={formData.totalAmount} 
                onChange={e => setFormData({...formData, totalAmount: Number(e.target.value)})} 
              />
            </div>
          </div>

          {editingApp && (
            <div className="form-group">
              <label>Booking Status (Admin Action)</label>
              <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Pending">🟡 Pending Confirmation</option>
                <option value="Confirmed">🟢 Confirmed</option>
                <option value="Completed">🔵 Tour Completed</option>
                <option value="Cancelled">🔴 Cancelled</option>
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingApp ? 'Update Status' : 'Confirm Booking'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}