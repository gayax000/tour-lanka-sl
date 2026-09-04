import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ touristName: '', tourOrGuide: '', rating: 5, comment: '' });

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/reviews`);
      setReviews(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/reviews`, formData);
      alert('Review posted successfully!');
      setFormData({ touristName: '', tourOrGuide: '', rating: 5, comment: '' });
      fetchReviews();
    } catch (err) { alert(err.response?.data?.error || 'Failed to post review'); }
  };

  return (
    <div className="container">
      <h2>⭐ Tourist Reviews & Experience Feedback ({reviews.length})</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginTop: '20px' }}>
        <div className="card">
          <h3>✍️ Write a Review</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
            <div className="form-group">
              <label>Your Name</label>
              <input className="form-control" required value={formData.touristName} onChange={e => setFormData({...formData, touristName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Guide / Service Reviewed</label>
              <input className="form-control" required value={formData.tourOrGuide} onChange={e => setFormData({...formData, tourOrGuide: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <select className="form-control" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})}>
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                <option value="3">⭐⭐⭐ 3 Stars</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea className="form-control" rows="3" required value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Review</button>
          </form>
        </div>

        <div>
          <div className="card-grid" style={{ marginTop: 0 }}>
            {reviews.map(r => (
              <div key={r._id} className="card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{r.touristName}</strong>
                    <span style={{ color: '#f59e0b', fontWeight: 800 }}>{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p style={{ color: '#059669', fontSize: '12px', fontWeight: 600, margin: '4px 0' }}>Service: {r.tourOrGuide}</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>"{r.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}