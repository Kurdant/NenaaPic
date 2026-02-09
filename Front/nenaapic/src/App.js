import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminUpload from './pages/AdminUpload';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header global sur toutes les pages */}
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminUpload />} />
        </Routes>
        {/* Footer global sur toutes les pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
