import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';

export default function TouristBookingModal({ isOpen, onClose, provider, onSuccess }) {
  const currentUser = JSON.parse(localStorage.getItem('tourLankaUser') || 'null');

  const [formData, setFormData] = useState({
    touristName: '',
    touristEmail: '',
    touristPhone: '',
    bookingDate: '',
    numberOfDays: 1,
    numberOfGuests: 2,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen && provider) {
      setFormData({
        touristName: currentUser?.name || '',
        touristEmail: currentUser?.email || '',
        touristPhone: '',
        bookingDate: '',
        numberOfDays: 1,
        numberOfGuests: 2,
        notes: ''
      });
      setErrors({});
      setSuccessMessage('');
    }
  }, [isOpen, provider]);

  if (!isOpen || !provider) return null;

  const pricePerDay = Number(provider.pricePerDay) || 0;
  const totalAmount = pricePerDay * (Number(formData.numberOfDays) || 1);

  const validate = () => {
    const errs = {};
    if (!formData.touristName.trim()) errs.touristName = 'Please enter your full name';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.touristEmail.trim() || !emailRegex.test(formData.touristEmail.trim())) {
      errs.touristEmail = 'Please enter a valid email address';
    }
    if (!formData.touristPhone.trim()) {
      errs.touristPhone = 'Phone or WhatsApp contact number is required';
    }
    if (!formData.bookingDate) {
      errs.bookingDate = 'Please select your travel date';
    }
    if (!formData.numberOfDays || formData.numberOfDays < 1) {
      errs.numberOfDays = 'At least 1 day is required';
    }
    if (!formData.numberOfGuests || formData.numberOfGuests < 1) {
      errs.numberOfGuests = 'At least 1 guest is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    try {
      const payload = {
        touristName: formData.touristName.trim(),
        touristEmail: formData.touristEmail.trim(),
        touristPhone: formData.touristPhone.trim(),
        guideOrService: provider.name,
        district: provider.district || 'Ella & Badulla',
        bookingDate: formData.bookingDate,
        numberOfDays: Number(formData.numberOfDays),
        numberOfGuests: Number(formData.numberOfGuests),
        totalAmount: totalAmount,
        status: 'Pending'
      };

      await axios.post(`${API_BASE_URL}/api/bookings`, payload);
      setSuccessMessage('🎉 Booking request submitted successfully! Status is Pending confirmation.');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1800);
    } catch (err) {
      setErrors({ form: err.response?.data?.error || 'Failed to submit booking inquiry. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, color: '#0f172a' }}>Book Your Experience</h3>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#64748b' }}
          >
            &times;
          </button>
        </div>

        {/* Selected Provider Details Card */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          borderRadius: '12px',
          padding: '14px 16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#065f46', fontSize: '17px' }}>
                🌿 {provider.name}
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                {provider.category} &bull; <strong>{provider.providerType}</strong>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-eco" style={{ fontSize: '12px' }}>
                📍 {provider.district}
              </span>
              <div style={{ marginTop: '4px', fontWeight: 800, color: '#059669', fontSize: '15px' }}>
                Rs. {provider.pricePerDay?.toLocaleString()} / day
              </div>
            </div>
          </div>
          {provider.languages && (
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '8px', borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
              🗣️ <strong>Languages:</strong> {provider.languages}
            </div>
          )}
        </div>

        {successMessage ? (
          <div style={{
            background: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            color: '#065f46',
            padding: '16px',
            borderRadius: '10px',
            textAlign: 'center',
            fontWeight: 600
          }}>
            {successMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errors.form && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '8px', marginBottom: '12px', fontSize: '13px' }}>
                {errors.form}
              </div>
            )}

            <div className="form-group">
              <label>Tourist Full Name <span style={{ color: '#dc2626' }}>*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Emily Watson"
                value={formData.touristName}
                onChange={e => setFormData({ ...formData, touristName: e.target.value })}
              />
              {errors.touristName && <div className="error-text">{errors.touristName}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Email Address <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="emily@travel.com"
                  value={formData.touristEmail}
                  onChange={e => setFormData({ ...formData, touristEmail: e.target.value })}
                />
                {errors.touristEmail && <div className="error-text">{errors.touristEmail}</div>}
              </div>

              <div className="form-group">
                <label>Phone / WhatsApp <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+94 77 123 4567"
                  value={formData.touristPhone}
                  onChange={e => setFormData({ ...formData, touristPhone: e.target.value })}
                />
                {errors.touristPhone && <div className="error-text">{errors.touristPhone}</div>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Travel Date <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="date"
                  className="form-control"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.bookingDate}
                  onChange={e => setFormData({ ...formData, bookingDate: e.target.value })}
                />
                {errors.bookingDate && <div className="error-text">{errors.bookingDate}</div>}
              </div>

              <div className="form-group">
                <label>Days</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={formData.numberOfDays}
                  onChange={e => setFormData({ ...formData, numberOfDays: Math.max(1, parseInt(e.target.value) || 1) })}
                />
                {errors.numberOfDays && <div className="error-text">{errors.numberOfDays}</div>}
              </div>

              <div className="form-group">
                <label>Guests</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={formData.numberOfGuests}
                  onChange={e => setFormData({ ...formData, numberOfGuests: Math.max(1, parseInt(e.target.value) || 1) })}
                />
                {errors.numberOfGuests && <div className="error-text">{errors.numberOfGuests}</div>}
              </div>
            </div>

            {/* Total Price preview */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              padding: '12px 14px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '4px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '13px', color: '#166534', fontWeight: 600 }}>
                Estimated Total ({formData.numberOfDays} {formData.numberOfDays === 1 ? 'day' : 'days'} &times; Rs. {pricePerDay.toLocaleString()}):
              </span>
              <span style={{ fontSize: '17px', color: '#15803d', fontWeight: 800 }}>
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Confirm & Book Now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
