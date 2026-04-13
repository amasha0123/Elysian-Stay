import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Compass, CalendarCheck, Image, Users, Mail } from 'lucide-react';
import './index.css';

// Simple placeholder components for pages
const HomePage = () => (
  <main>
    <section className="hero">
      <div className="hero-content">
        <h1>Create unforgettable memories<br/>with your loved ones</h1>
        <p>A relaxing, free, and joyful environment to escape from busy life.</p>
        <Link to="/rooms" className="btn-primary" style={{ textDecoration: 'none' }}>Plan Your Stay</Link>
      </div>
    </section>
    <section className="section-padding" style={{ background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Welcome to Elysian Stay</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-light)' }}>
          Experience a warm, peaceful, and enjoyable atmosphere. We provide a smooth booking experience, comfort, privacy, and fun activities designed to build emotional connection, happiness, and freedom.
        </p>
      </div>
    </section>
  </main>
);

const RoomsPage = () => (
    <div className="section-padding" style={{ minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Rooms & Pricing</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
                { name: 'Family Room', price: '$200/night', img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500' },
                { name: 'Couple Suite', price: '$150/night', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500' },
                { name: 'Luxury Villa', price: '$350/night', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=500' }
            ].map(room => (
                <div key={room.name} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <img src={room.img} alt={room.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{room.name}</h3>
                        <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{room.price}</p>
                        <Link to="/booking" className="btn-book" style={{ display: 'inline-block', textDecoration: 'none' }}>Book Now</Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const BookingPage = () => (
    <div className="section-padding" style={{ minHeight: '80vh', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Book Your Stay</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
             <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Check-in Date</label>
                <input type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
            <button type="button" onClick={() => alert('Booking Submitted Successfully!')} className="btn-primary" style={{ marginTop: '1rem' }}>Secure Payment & Book</button>
        </form>
    </div>
);

const PlaceholderPage = ({ title }) => (
    <div className="section-padding" style={{ minHeight: '80vh' }}>
        <h1 style={{ color: 'var(--primary)', textAlign: 'center' }}>{title}</h1>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-light)' }}>Coming soon...</p>
    </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/" className="logo">
            <Home size={28} />
            Elysian Stay
          </Link>
          <div className="nav-links">
            <Link to="/rooms"><Compass size={18} style={{verticalAlign: 'bottom', marginRight: '4px'}}/> Rooms & Pricing</Link>
            <Link to="/gallery"><Image size={18} style={{verticalAlign: 'bottom', marginRight: '4px'}}/> Gallery</Link>
            <Link to="/reviews"><Users size={18} style={{verticalAlign: 'bottom', marginRight: '4px'}}/> Reviews</Link>
            <Link to="/contact"><Mail size={18} style={{verticalAlign: 'bottom', marginRight: '4px'}}/> Contact</Link>
            <Link to="/booking" className="btn-book"><CalendarCheck size={18} style={{verticalAlign: 'bottom', marginRight: '4px'}}/> Book Now</Link>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/gallery" element={<PlaceholderPage title="Gallery View" />} />
            <Route path="/reviews" element={<PlaceholderPage title="Customer Reviews" />} />
            <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="footer">
            <p>&copy; 2026 Elysian Stay. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
