import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import FooterBar from './components/FooterBar';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminUpload from './pages/AdminUpload';
import LoginPage from './pages/LoginPage';
import Sport from './pages/Sport';
import RGPD from './pages/RGPD';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="App relative">
      <ScrollToTop />
      {!isLogin && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/sport" element={<Sport />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rgpd" element={<RGPD />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminUpload />
          </ProtectedRoute>
        } />
      </Routes>
      {!isLogin && <FooterBar />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
