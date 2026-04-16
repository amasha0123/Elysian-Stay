import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Moon, Sun, Check } from 'lucide-react';

// Components
import ElysianLogo from './components/ElysianLogo';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';

// Pages
// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import HomePage from './pages/HomePage';
import GenericPage from './pages/GenericPage';
import FeedbackPage from './pages/FeedbackPage';
import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import PrivacyPage from './pages/PrivacyPage';

import './index.css';

const stripePromise = loadStripe("pk_test_51TMLINEhgtPmFQQyrOy4t4TzKasinwek2mYR2wKzZ3m7Jltn4UxJPjchoYqPMJnnOPeZQWmN5658PI1naKo87Ql000K8bt3HCP");

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/" className="logo text-accent serif">
            <ElysianLogo />
            <span style={{color: 'var(--text-main)'}}>Elysian</span>
          </Link>
          <div className="nav-links">
            <Link to="/destinations">Destinations</Link>
            <Link to="/experiences">Experiences</Link>
            <Link to="/feedback">Reviews</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <Link to="/profile" className="btn-outline" style={{marginLeft: '1rem', padding:'0.5rem 1rem'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <div style={{width:'24px', height:'24px', borderRadius:'50%', background:'var(--accent)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:'bold', border:'none'}}>{user[0].toUpperCase()}</div>
                  {user}
                </div>
              </Link>
            ) : (
              <Link to="/signin" className="btn-primary" style={{marginLeft: '1rem'}}>Sign In</Link>
            )}
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* New Routes dynamically wired to the buttons */}
            <Route path="/destinations" element={<GenericPage title="Global Destinations" subtitle="Our Locations" />} />
            <Route path="/experiences" element={<GenericPage title="Exclusive Experiences" subtitle="Luxury Activities" />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/signin" element={<SignInPage setUser={setUser} />} />
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
            <Route path="/booking" element={<Elements stripe={stripePromise}><BookingPage /></Elements>} />
            <Route path="/plan" element={<GenericPage title="AI Itinerary Planner" subtitle="Plan My Stay" />} />
            
            {/* Footer routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </div>

        <Chatbot />

        {/* Footer */}
        <footer>
            <div className="footer-grid">
              <div className="footer-col" style={{gridColumn: 'span 2'}}>
                <div className="logo text-accent serif" style={{marginBottom: '1rem', color: '#fff'}}>
                  <ElysianLogo style={{ filter: 'brightness(10)' }} /> Elysian Stay
                </div>
                <p style={{opacity: 0.8, maxWidth: '300px', lineHeight: '1.8'}}>Redefining the digital escape experience. Connect emotionally, travel luxuriously.</p>
                <div style={{marginTop: '1.5rem'}}>
                  <p style={{fontWeight:'600'}}>Direct Contact: <a href="tel:0783186375" style={{color:'var(--accent)', textDecoration:'underline'}}>0783186375</a></p>
                </div>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/press">Press</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Support</h4>
                <ul>
                  <li><Link to="/contact">Contact 24/7</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
                  <li><a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a></li>
                  <li><a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              &copy; 2026 Elysian Stay Global. All rights reserved. Secure Gateway Active <Check size={12}/>
            </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
