import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import AddProject from './pages/AddProject.jsx';
import ScanResult from './ScanForm.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AboutUs from './components/About.jsx';
import ContactUs from './components/Contact.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/result/:projectId" element={<ScanResult />} />
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
