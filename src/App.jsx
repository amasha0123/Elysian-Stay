import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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

const AboutPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '800px', margin: '0 auto' }}>
    <div className="section-header" style={{textAlign: 'center'}}>
      <span>Who We Are</span>
      <h2 className="serif">About Us</h2>
    </div>
    <div style={{ lineHeight: '1.8', color: 'var(--text-main)' }}>
      <p style={{marginBottom: '1.5rem'}}>Elysian Stay is a modern hotel booking platform designed to make travel simple, fast, and reliable. We connect travelers with carefully selected stays, from luxury hotels to budget-friendly accommodations, all in one place.</p>
      <p style={{marginBottom: '1.5rem'}}>Our mission is to deliver comfort, convenience, and confidence with every booking. Whether you're traveling for business or leisure, we help you find the perfect stay effortlessly.</p>
      <h4 className="serif" style={{fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--accent)'}}>Our Mission</h4>
      <p>To redefine the way people discover and book accommodations — making every journey seamless, every stay memorable, and every guest valued.</p>
    </div>
  </div>
);

const CareersPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '800px', margin: '0 auto' }}>
    <div className="section-header" style={{textAlign: 'center'}}>
      <span>Join Us</span>
      <h2 className="serif">Careers</h2>
    </div>
    <div style={{ lineHeight: '1.8', color: 'var(--text-main)', textAlign: 'center' }}>
      <p style={{marginBottom: '2rem'}}>Join Elysian Stay and be part of a team that is transforming the travel experience. We are always looking for passionate individuals in technology, customer service, marketing, and hospitality partnerships.</p>
      <p style={{marginBottom: '2.5rem', color: 'var(--text-muted)'}}>At Elysian Stay, you'll work in a dynamic environment where innovation and creativity are valued. Grow your career with us and help shape the future of travel.</p>
      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '1rem', textAlign: 'left' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem'}}>Technology</h4>
        <p style={{color: 'var(--accent)', fontWeight: '500'}}>Full-stack Engineers, UI/UX Designers, QA</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '1rem', textAlign: 'left' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem'}}>Customer Service</h4>
        <p style={{color: 'var(--accent)', fontWeight: '500'}}>Support Agents, Concierge Managers</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '1rem', textAlign: 'left' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem'}}>Marketing & Partnerships</h4>
        <p style={{color: 'var(--accent)', fontWeight: '500'}}>Content Strategists, Brand Managers, Hospitality Partners</p>
      </div>
      <p style={{marginTop: '2rem', color: 'var(--text-muted)'}}>Send your resume to <strong style={{color: 'var(--text-main)'}}>careers@elysianstay.com</strong></p>
    </div>
  </div>
);

const PressPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '800px', margin: '0 auto' }}>
    <div className="section-header" style={{textAlign: 'center'}}>
      <span>News & Media</span>
      <h2 className="serif">Press</h2>
    </div>
    <div style={{ lineHeight: '1.8', color: 'var(--text-main)' }}>
      <p style={{marginBottom: '1.5rem'}}>Elysian Stay is redefining how people book accommodations worldwide. For media inquiries, partnerships, or press kits, our team is ready to assist journalists and media organizations.</p>
      <p style={{marginBottom: '2.5rem'}}>We welcome collaboration and are open to sharing our latest updates, achievements, and product innovations.</p>
      
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
        <span style={{color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold'}}>April 2026</span>
        <h4 className="serif" style={{fontSize: '1.3rem', margin: '0.5rem 0'}}>Elysian Stay Recognized as Top Booking Platform</h4>
        <p style={{color: 'var(--text-muted)'}}>Acknowledged for seamless user experience and reliable hospitality coverage across Sri Lanka.</p>
      </div>
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
        <span style={{color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold'}}>February 2026</span>
        <h4 className="serif" style={{fontSize: '1.3rem', margin: '0.5rem 0'}}>Launch of AI-Powered Itinerary Planner</h4>
        <p style={{color: 'var(--text-muted)'}}>Introducing smart travel planning that generates personalized stay itineraries for every kind of traveler.</p>
      </div>
      <p style={{textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)'}}>For press inquiries: <strong style={{color: 'var(--text-main)'}}>press@elysianstay.com</strong></p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '600px', margin: '0 auto' }}>
    <div className="section-header" style={{textAlign: 'center'}}>
      <span>Contact 24/7</span>
      <h2 className="serif">Get In Touch</h2>
    </div>
    <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8'}}>Need help? Our support team is available around the clock. We respond quickly to ensure your travel experience is smooth and stress-free.</p>
    <form style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
        <input type="text" placeholder="Name" style={{flex: 1, padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit'}} />
        <input type="email" placeholder="Email Address" style={{flex: 1, padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit'}} />
      </div>
      <input type="text" placeholder="Subject" style={{width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit'}} />
      <textarea placeholder="Your Message..." rows="6" style={{width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit', resize: 'vertical'}} />
      <button type="button" onClick={() => alert("Message sent successfully! Our concierge will contact you shortly.")} className="btn-primary" style={{marginTop: '0.5rem', width: '100%'}}>Send Message</button>
    </form>
    <div style={{marginTop: '3rem', textAlign: 'center'}}>
      <h4 className="serif" style={{marginBottom: '1rem', fontSize: '1.4rem'}}>Direct Lines</h4>
      <p style={{color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.1rem'}}>Email: <a href="mailto:support@elysianstay.com" style={{color: 'var(--accent)'}}>support@elysianstay.com</a></p>
      <p style={{color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.1rem'}}>Phone: <a href="tel:0783186375" style={{color: 'var(--accent)', textDecoration: 'underline'}}>0783186375</a></p>
      <p style={{color: 'var(--text-muted)', fontSize: '1.1rem'}}>Live Chat: <span style={{color: 'var(--accent)'}}>Available on our website anytime</span></p>
    </div>
  </div>
);

const FAQPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '800px', margin: '0 auto' }}>
    <div className="section-header" style={{textAlign: 'center'}}>
      <span>Answers</span>
      <h2 className="serif">Frequently Asked Questions</h2>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-main)'}}>How do I book a hotel?</h4>
        <p style={{color: 'var(--text-muted)'}}>Simply search your destination, choose a hotel, and confirm your booking in a few clicks.</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-main)'}}>Can I cancel my booking?</h4>
        <p style={{color: 'var(--text-muted)'}}>Yes, most bookings allow free cancellation depending on the hotel policy.</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-main)'}}>Do I need an account to book?</h4>
        <p style={{color: 'var(--text-muted)'}}>No, but creating an account helps you manage bookings easily.</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-main)'}}>Is payment secure?</h4>
        <p style={{color: 'var(--text-muted)'}}>Yes, all payments are encrypted and processed securely.</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-main)'}}>Can I modify my booking?</h4>
        <p style={{color: 'var(--text-muted)'}}>Yes, you can request changes depending on availability and hotel policy.</p>
      </div>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '800px', margin: '0 auto' }}>
    <div className="section-header" style={{textAlign: 'center'}}>
      <span>Your Data</span>
      <h2 className="serif">Privacy Policy</h2>
    </div>
    <div style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
      <p style={{marginBottom: '1.5rem'}}>Elysian Stay respects your privacy and is committed to protecting your personal data. We collect only the information needed to process bookings, improve services, and provide customer support.</p>
      <p style={{marginBottom: '1.5rem'}}>Your data is securely stored and never sold to third parties. We may use cookies to enhance your browsing experience.</p>
      <p style={{marginBottom: '1.5rem'}}>By using our platform, you agree to our data practices and terms of service. If you have any concerns, you can contact our support team anytime.</p>
      <h4 className="serif" style={{fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.5rem'}}>What We Collect</h4>
      <p style={{marginBottom: '1.5rem'}}>Name, email address, contact details, and encrypted payment information necessary to process your reservations.</p>
      <h4 className="serif" style={{fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.5rem'}}>How We Use It</h4>
      <p style={{marginBottom: '1.5rem'}}>To process bookings, improve our services, personalize your experience, and provide customer support.</p>
      <h4 className="serif" style={{fontSize: '1.3rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.5rem'}}>Your Rights</h4>
      <p>You may request access, correction, or deletion of your personal data at any time by contacting <a href="mailto:support@elysianstay.com" style={{color: 'var(--accent)'}}>support@elysianstay.com</a>.</p>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  if(!user) return <div className="section-padding animate-fade-in-up" style={{paddingTop:'12rem', textAlign:'center', minHeight:'80vh'}}><h2 className="serif">Please sign in first.</h2></div>;
  
  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '600px', border: '1px solid var(--border-color)' }}>
        <h2 className="serif" style={{marginBottom: '0.5rem', textAlign: 'center'}}>Guest Profile</h2>
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem'}}>Manage your upcoming stays and preferences.</p>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)'}}>
           <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', fontWeight: 'bold'}}>
             {user[0].toUpperCase()}
           </div>
           <div>
             <h3 className="serif">{user}</h3>
             <p style={{color: 'var(--text-muted)'}}>Premium Member</p>
           </div>
        </div>

        <h4 className="serif" style={{marginBottom:'1rem'}}>Upcoming Reservations</h4>
        <div style={{padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '10px', marginBottom: '2rem'}}>
           <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>No upcoming stays yet.</p>
        </div>

        <button className="btn-outline" style={{width: '100%'}} onClick={() => { setUser(null); navigate('/'); }}>Sign Out</button>
      </div>
    </div>
  );
};

const SignInPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  return (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '10rem', display: 'flex', justifyContent: 'center' }}>
    <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '450px', border: '1px solid var(--border-color)' }}>
      <h2 className="serif" style={{marginBottom: '0.5rem', textAlign: 'center'}}>Welcome Back</h2>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem'}}>Sign in to view your itinerary & reservations.</p>
      
      <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} style={{width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit'}} />
      <input type="password" placeholder="Password" style={{width: '100%', padding: '1rem', marginBottom: '2.5rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit'}} />
      
      <button className="btn-primary" style={{width: '100%'}} onClick={() => { if(!email) return alert('Enter email'); setUser(email.split('@')[0] || 'Guest'); alert('Sign In Successful!'); navigate('/'); }}>Sign In</button>
      
      <div style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
        Don't have an account? <span style={{color: 'var(--accent)', fontWeight: '600', cursor: 'pointer'}} onClick={() => { alert('Redirecting to Registration...'); navigate('/'); }}>Create one</span>
      </div>
    </div>
  </div>
)};

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(rating === 0) return alert('Please select a star rating!');
    setSubmitted(true);
  };

  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '600px', border: '1px solid var(--border-color)' }}>
        {submitted ? (
          <div style={{textAlign: 'center', padding: '2rem 0'}}>
             <Check size={48} color="var(--accent)" style={{margin: '0 auto 1rem'}} />
             <h3 className="serif">Thank you!</h3>
             <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Your feedback has been successfully submitted.</p>
             <button className="btn-primary" onClick={()=>setSubmitted(false)}>Submit Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2 className="serif" style={{marginBottom: '0.5rem', textAlign: 'center'}}>Guest Reviews</h2>
            <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem'}}>We value your experience at Elysian Stay. Please share your thoughts.</p>
            
            <div style={{display:'flex', gap:'0.5rem', marginBottom:'1.5rem'}}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={36}
                  style={{cursor:'pointer', transition: 'color 0.2s', color: star <= (hover || rating) ? 'var(--accent)' : 'var(--border-color)'}}
                  fill={star <= (hover || rating) ? 'var(--accent)' : 'transparent'}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
            <textarea 
              placeholder="Tell us about your relaxing stay..." 
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              rows="5"
              style={{width: '100%', padding: '1rem', marginBottom: '1.5rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit', resize:'vertical'}} 
            />
            <div style={{width:'100%', display:'flex', gap:'1rem', alignItems:'center', marginBottom:'2rem'}}>
               <input type="checkbox" id="recommend" /> <label htmlFor="recommend" style={{color:'var(--text-muted)'}}>I would recommend this guest house.</label>
            </div>
            <button type="submit" className="btn-primary" style={{width: '100%'}}>Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("Payment Successful ✓ Reservation Confirmed via Mock Secure Gateway.");
      navigate('/');
    }, 2000);
  };

  return (
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
        
        <button className="btn-primary" style={{width: '100%', padding: '1.2rem', opacity: processing ? 0.7 : 1}} onClick={handleCheckout} disabled={processing}>
           {processing ? 'Processing Secure Payment...' : 'Confirm & Pay'}
        </button>
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
};

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
            <Route path="/booking" element={<BookingPage />} />
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
