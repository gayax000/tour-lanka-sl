import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import GuidesPage from './pages/Guides/GuidesPage';
import BookingsPage from './pages/Bookings/BookingsPage';
import TransportPage from './pages/Transport/TransportPage';
import ReviewsPage from './pages/Reviews/ReviewsPage';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}