import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import ReachUs from './pages/ReachUs';
import GiveTestimonial from './pages/GiveTestimonial';
import Projects from './pages/Projects';
import BuyOnline from './pages/BuyOnline';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/abouts" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/reachus" element={<ReachUs />} />
            <Route path="/registers" element={<GiveTestimonial />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/buy-online" element={<BuyOnline />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
