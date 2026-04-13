import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Moon, Sun, MessageCircle, X, Navigation, 
  MapPin, Star, Heart, Calendar, Wind, Camera, Check, Send
} from 'lucide-react';
import './index.css';

// MOCK DATA: Rooms with Mood tags
const ROOMS_DATA = [
  {
    id: 1,
    name: "Oceanfront Honeymoon Suite",
    mood: "Romantic",
    price: 35000,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Balcony", "Jacuzzi", "Champagne"]
  },
  {
    id: 2,
    name: "Serenity Forest Cabin",
    mood: "Relax",
    price: 21000,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Nature View", "Spa Access", "Yoga Mat"]
  },
  {
    id: 3,
    name: "Grand Horizon Villa",
    mood: "Family",
    price: 55000,
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["3 Bedrooms", "Private Pool", "BBQ Area"]
  },
  {
    id: 4,
    name: "Adventure Basecamp",
    mood: "Adventure",
    price: 18000,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Trail Access", "Equipment Rental", "Guided Tours"]
  }
];

const ElysianLogo = ({ style }) => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', ...style }}>
    <path d="M50 5 C 80 5, 95 20, 95 50 C 95 80, 80 95, 50 95 C 20 95, 5 80, 5 50 C 5 20, 20 5, 50 5 Z" stroke="var(--accent)" strokeWidth="3" />
    <path d="M35 35 L65 35 M35 50 L55 50 M35 65 L65 65 M35 35 L35 65" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M80 50 C 80 30, 60 20, 50 15 C 40 20, 20 30, 20 50" stroke="var(--accent)" strokeWidth="2" opacity="0.4"/>
  </svg>
);

// --- PAGES ---

const GenericPage = ({ title, subtitle }) => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', textAlign: 'center' }}>
    <div className="section-header">
      <span>{subtitle || 'Discover More'}</span>
      <h2 className="serif" style={{marginBottom: '1.5rem'}}>{title}</h2>
    </div>
    <p style={{maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)'}}>
      Content for <strong style={{color: 'var(--text-main)'}}>{title}</strong> is currently being curated for your ultimate luxury experience. Check back soon.
    </p>
    <Link to="/" className="btn-primary" style={{marginTop: '2.5rem', display: 'inline-block'}}>Return to Sanctuary</Link>
  </div>
);

const SignInPage = () => {
  const navigate = useNavigate();
  return (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '10rem', display: 'flex', justifyContent: 'center' }}>
    <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '450px', border: '1px solid var(--border-color)' }}>
      <h2 className="serif" style={{marginBottom: '0.5rem', textAlign: 'center'}}>Welcome Back</h2>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem'}}>Sign in to view your itinerary & reservations.</p>
      
      <input type="email" placeholder="Email Address" style={{width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit'}} />
      <input type="password" placeholder="Password" style={{width: '100%', padding: '1rem', marginBottom: '2.5rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit'}} />
      
      <button className="btn-primary" style={{width: '100%'}} onClick={() => { alert('Sign In Successful!'); navigate('/'); }}>Sign In</button>
      
      <div style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
        Don't have an account? <span style={{color: 'var(--accent)', fontWeight: '600', cursor: 'pointer'}} onClick={() => { alert('Redirecting to Registration...'); navigate('/'); }}>Create one</span>
      </div>
    </div>
  </div>
)};

const BookingPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem' }}>
    <div className="section-header">
      <span>Secure Checkout</span>
      <h2 className="serif">Complete Your Reservation</h2>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
      {/* Form */}
      <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
        <h3 className="serif" style={{marginBottom: '1.5rem', fontSize: '1.5rem'}}>Guest Details</h3>
        <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
          <input type="text" placeholder="First Name" style={{flex: 1, minWidth: '140px', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none'}} />
          <input type="text" placeholder="Last Name" style={{flex: 1, minWidth: '140px', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none'}} />
        </div>
        <input type="email" placeholder="Email Address" style={{width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none'}} />
        
        <h3 className="serif" style={{marginBottom: '1.5rem', marginTop: '2.5rem', fontSize: '1.5rem'}}>Secure Payment</h3>
        <input type="text" placeholder="Card Number" style={{width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none'}} />
        <div style={{display: 'flex', gap: '1rem', marginBottom: '2.5rem'}}>
          <input type="text" placeholder="MM/YY" style={{flex: 1, padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none'}} />
          <input type="text" placeholder="CVC" style={{flex: 1, padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none'}} />
        </div>
        
        <button className="btn-primary" style={{width: '100%', padding: '1.2rem'}} onClick={() => alert("Reservation Confirmed! Welcome to Elysian Stay.")}>Confirm & Pay</button>
      </div>

      {/* Summary */}
      <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--accent)', height: 'fit-content' }}>
        <h3 className="serif" style={{marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--accent)'}}>Your Stay</h3>
        <img src={ROOMS_DATA[0].img} alt="" style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1.5rem'}} />
        <h4 className="serif" style={{fontSize: '1.3rem', marginBottom: '0.5rem'}}>{ROOMS_DATA[0].name}</h4>
        <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem'}}>1 Room • 2 Guests</p>
        
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem'}}>
          <span>Dates</span>
          <span style={{fontWeight: '500'}}>Oct 12 - Oct 16</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem'}}>
          <span>Rate (4 Nights)</span>
          <span style={{fontWeight: '500'}}>Rs. {(ROOMS_DATA[0].price * 4).toLocaleString()}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)'}}>
          <span>Taxes & Fees</span>
          <span style={{fontWeight: '500'}}>Rs. 14,000</span>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '1.3rem', fontWeight: '600'}}>
          <span>Total</span>
          <span style={{color: 'var(--accent)'}}>Rs. {((ROOMS_DATA[0].price * 4) + 14000).toLocaleString()}</span>
        </div>
      </div>
    </div>
  </div>
);

// --- WIDGETS ---

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ sender: 'ai', text: 'Welcome to Elysian Stay. I am your personal digital concierge. How can I perfect your escape today?' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if(!input.trim()) return;
    setMsgs([...msgs, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMsgs(prev => [...prev, { sender: 'ai', text: 'I can certainly help with that. Would you like me to tailor our "Plan My Stay" itinerary to your preferences?' }]);
    }, 1000);
  };

  return (
    <>
      <div className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </div>

      <div className="chat-window" style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'scale(1)' : 'scale(0.9)', pointerEvents: isOpen ? 'auto' : 'none' }}>
        <div className="chat-header">
          <h4>Elysian Concierge&trade;</h4>
          <X size={20} style={{cursor:'pointer'}} onClick={() => setIsOpen(false)} />
        </div>
        <div className="chat-body">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="Type your request..." 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}><Send size={16} style={{marginLeft: '-2px'}} /></button>
        </div>
      </div>
    </>
  );
};


const VirtualTourOverlay = ({ isOpen, setOpen }) => {
  if(!isOpen) return null;
  return (
    <div className="tour-overlay animate-fade-in-up">
      <button className="tour-close" onClick={() => setOpen(false)}><X size={24} /></button>
      <h2 className="serif" style={{marginBottom: '1rem', fontSize: '2.5rem'}}>360° Virtual Tour</h2>
      <p style={{marginBottom: '2rem', color: '#ccc'}}>Interactive panorama loaded...</p>
      {/* Mock panorama area */}
      <div style={{width: '80%', height: '60%', background: 'url(https://images.unsplash.com/photo-1542314831-c6a4d14d8c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80) center/cover', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.2)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{background: 'rgba(0,0,0,0.5)', padding: '1rem 2rem', borderRadius: '30px', backdropFilter: 'blur(5px)'}}>
           Drag to look around <Navigation size={18} style={{verticalAlign:'middle', marginLeft:'10px'}}/>
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {
  const [activeMood, setActiveMood] = useState('All');
  const [tourOpen, setTourOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  
  const toggleFav = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const filteredRooms = activeMood === 'All' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter(r => r.mood === activeMood);

  return (
    <main>
      <VirtualTourOverlay isOpen={tourOpen} setOpen={setTourOpen} />
      
      {/* Premium Hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade-in-up">
          <span className="hero-subtitle">Welcome to your escape</span>
          <h1 className="serif">Where Luxury Meets Serenity</h1>
          <p>Immerse yourself in a sanctuary designed for unforgettable memories, relaxation, and bespoke experiences.</p>
          
          <div className="booking-bar">
            <div className="booking-input">
              <label>Location</label>
              <select><option>Elysian Stay, Homagama, Colombo</option></select>
            </div>
            <div className="booking-input">
              <label>Check-in — Check-out</label>
              <input type="text" placeholder="Select Dates" style={{width: '180px'}} readOnly value="Oct 12 — Oct 16"/>
            </div>
            <div className="booking-input">
              <label>Guests</label>
              <select><option>2 Adults, 0 Children</option></select>
            </div>
            <button className="btn-primary" onClick={() => navigate('/booking')}>Check Availability</button>
          </div>
        </div>
      </section>

      {/* Mood-Based Booking */}
      <section className="section-padding">
        <div className="section-header animate-fade-in-up">
          <span>Curated For You</span>
          <h2 className="serif">Find Your Perfect Vibe</h2>
        </div>
        
        <div className="mood-selector animate-fade-in-up delay-1">
          {['All', 'Relax', 'Romantic', 'Adventure', 'Family'].map(mood => (
            <button 
              key={mood}
              className={`mood-chip ${activeMood === mood ? 'active' : ''}`}
              onClick={() => setActiveMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <div className="rooms-grid animate-fade-in-up delay-2">
          {filteredRooms.map(room => (
            <div key={room.id} className="room-card">
              <div className="room-img-container">
                <span className="room-tag"><Star size={12} color="#D4AF37" style={{verticalAlign:'middle', marginRight:'4px'}}/>{room.rating}</span>
                <img src={room.img} alt={room.name} />
              </div>
              <div className="room-details">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <h3 className="serif">{room.name}</h3>
                  <Heart 
                    size={22} 
                    color={favorites.includes(room.id) ? "#ff4757" : "#ccc"} 
                    fill={favorites.includes(room.id) ? "#ff4757" : "transparent"} 
                    style={{cursor:'pointer', transition: 'all 0.3s ease'}} 
                    onClick={() => toggleFav(room.id)}
                  />
                </div>
                <p className="room-price">Rs. {room.price.toLocaleString()} <span style={{fontSize:'0.9rem', color:'var(--text-muted)', fontWeight:'400'}}>/ night</span></p>
                <div className="room-amenities">
                  {room.amenities.map(a => <div key={a}><Check size={14} className="text-accent"/> {a}</div>)}
                </div>
                <div className="room-actions">
                  <button className="btn-outline" onClick={() => setTourOpen(true)}>
                    <Camera size={16} /> 360° Tour
                  </button>
                  <button className="btn-primary" onClick={() => navigate('/booking')}>Reserve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Map */}
      <section className="section-padding" style={{background: 'var(--glass-bg)'}}>
        <div className="section-header animate-fade-in-up">
          <span>Find Us</span>
          <h2 className="serif">Location & Map</h2>
        </div>
        <div className="animate-fade-in-up delay-1" style={{ width: '100%', height: '400px', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)'}}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63385.517316712!2d79.98818815!3d6.819777599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae251786ba11e3b%3A0xe5a3c26dc8d28dbb!2sHomagama!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
            width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Elysian Map">
          </iframe>
        </div>
      </section>

      {/* "Plan My Stay" Smart Banner */}
      <section className="experiences-banner">
        <div className="animate-fade-in-up">
          <span style={{textTransform:'uppercase', letterSpacing:'3px', marginBottom:'1rem', display:'block'}}>Exclusive Packages</span>
          <h2 className="serif">Elevate Your Experience</h2>
          <p>Let our AI-driven "Plan My Stay" feature automatically generate a personalized itinerary of activities, dining, and spa treatments tailored perfectly to you.</p>
          <button className="btn-primary" style={{fontSize:'1rem', padding:'1rem 3rem'}} onClick={() => navigate('/plan')}>Plan My Itinerary</button>
        </div>
      </section>
    </main>
  );
};


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Scroll to top on route change fix
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
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
            <Link to="/offers">Offers</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/signin" className="btn-primary" style={{marginLeft: '1rem'}}>Sign In</Link>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* New Routes dynamically wired to the buttons */}
            <Route path="/destinations" element={<GenericPage title="Global Destinations" subtitle="Our Locations" />} />
            <Route path="/experiences" element={<GenericPage title="Exclusive Experiences" subtitle="Luxury Activities" />} />
            <Route path="/offers" element={<GenericPage title="Members Offers" subtitle="Premium Packages" />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/plan" element={<GenericPage title="AI Itinerary Planner" subtitle="Plan My Stay" />} />
            
            {/* Footer routes */}
            <Route path="/about" element={<GenericPage title="About Elysian Stay" subtitle="The Company" />} />
            <Route path="/careers" element={<GenericPage title="Careers" subtitle="Join Us" />} />
            <Route path="/press" element={<GenericPage title="Press & Media" subtitle="News" />} />
            <Route path="/contact" element={<GenericPage title="Get In Touch" subtitle="24/7 Support" />} />
            <Route path="/faq" element={<GenericPage title="Frequently Asked Questions" subtitle="Support center" />} />
            <Route path="/privacy" element={<GenericPage title="Privacy Policy" subtitle="Your Data Security" />} />
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
