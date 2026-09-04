import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import BookingModal from './BookingModal';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const user = JSON.parse(localStorage.getItem('tourLankaUser') || 'null');
  const isAdmin = user && user.role === 'admin';

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/bookings?status=${statusFilter}`);
      setBookings(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchBookings(); }, [statusFilter]);

  const handleSave = async (formData) => {
    try {
      if (editingApp) {
        await axios.put(`${API_BASE_URL}/api/bookings/${editingApp._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/bookings`, formData);
      }
      setIsModalOpen(false);
      setEditingApp(null);
      fetchBookings();
    } catch (err) { alert(err.response?.data?.error || 'Error saving booking'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel and remove this booking?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/bookings/${id}`);
        fetchBookings();
      } catch (err) { console.error(err); }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Pending': { bg: '#fef3c7', text: '#92400e', label: '🟡 Pending' },
      'Confirmed': { bg: '#dcfce7', text: '#15803d', label: '🟢 Confirmed' },
      'Completed': { bg: '#e0f2fe', text: '#0369a1', label: '🔵 Completed' },
      'Cancelled': { bg: '#fee2e2', text: '#991b1b', label: '🔴 Cancelled' }
    };
    const b = badges[status] || { bg: '#f1f5f9', text: '#475569', label: status };
    return <span style={{ background: b.bg, color: b.text, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>{b.label}</span>;
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2>📋 Tourist Bookings & Reservation Manager ({bookings.length})</h2>
          <p style={{ color: '#64748b' }}>{isAdmin ? 'Manage incoming tourist reservations & update status' : 'Track your tour booking status'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingApp(null); setIsModalOpen(true); }}>
          + New Tour Booking
        </button>
      </div>

      <div style={{ margin: '20px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(st => (
          <button key={st} onClick={() => setStatusFilter(st)} className="btn" style={{
            fontSize: '13px', padding: '6px 14px',
            background: statusFilter === st ? '#059669' : '#ffffff',
            color: statusFilter === st ? 'white' : '#334155',
            border: '1px solid #cbd5e1'
          }}>
            {st}
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
              <th style={{ padding: '12px' }}>Tourist Name</th>
              <th style={{ padding: '12px' }}>Contact</th>
              <th style={{ padding: '12px' }}>Guide / Service</th>
              <th style={{ padding: '12px' }}>Date & Duration</th>
              <th style={{ padding: '12px' }}>Total Amount</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(book => (
              <tr key={book._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontWeight: 700 }}>{book.touristName}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>
                  <div>✉️ {book.touristEmail}</div>
                  <div style={{ color: '#64748b' }}>📞 {book.touristPhone}</div>
                </td>
                <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{book.guideOrService} ({book.district})</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>📅 {book.bookingDate} ({book.numberOfDays} days)</td>
                <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>Rs. {book.totalAmount}</td>
                <td style={{ padding: '12px' }}>{getStatusBadge(book.status)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    {isAdmin && (
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { setEditingApp(book); setIsModalOpen(true); }}>Manage</button>
                    )}
                    <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleDelete(book._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingApp={editingApp} />
    </div>
  );
}