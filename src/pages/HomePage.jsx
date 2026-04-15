import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Camera, Check } from 'lucide-react';
import ROOMS_DATA from '../data/roomsData';
import VirtualTourOverlay from '../components/VirtualTourOverlay';

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

export default HomePage;
