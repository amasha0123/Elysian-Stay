import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Calendar, MapPin, Star, Plane, ChevronRight } from 'lucide-react';

const ProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Itineraries
        const qPlan = query(collection(db, "itineraries"), orderBy("createdAt", "desc"));
        const snapshotPlan = await getDocs(qPlan);
        setItineraries(snapshotPlan.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch Bookings (Filtering by email if the user is an email)
        const qBook = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const snapshotBook = await getDocs(qBook);
        const allBooks = snapshotBook.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Simple client-side filter for demo/privacy
        setBookings(allBooks.filter(b => b.email.toLowerCase().includes(user.toLowerCase()) || user === 'Admin'));

      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return (
    <div className="section-padding animate-fade-in-up" style={{ paddingTop: '12rem', textAlign: 'center', minHeight: '80vh' }}>
      <h2 className="serif">Please sign in first.</h2>
      <button className="btn-primary" style={{marginTop:'1.5rem'}} onClick={() => navigate('/signin')}>Go to Sign In</button>
    </div>
  );

  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '100vh', paddingTop: '12rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Profile Header */}
        <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '25px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#fff', fontWeight: 'bold' }}>
            {user[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '0.3rem' }}>Welcome, {user}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Elysian Platinum Member • <span style={{ color: 'var(--accent)' }}>Active Status</span></p>
          </div>
          <button className="btn-outline" onClick={() => { setUser(null); navigate('/'); }}>Sign Out</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Section: Saved Itineraries */}
          <section>
            <h3 className="serif" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Plane size={24} color="var(--accent)"/> Your Life Plans
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {loading ? <p>Loading your escapes...</p> : 
               itineraries.length === 0 ? <p style={{color:'var(--text-muted)'}}>No itineraries planned yet. Explore our AI Planner!</p> :
               itineraries.map(plan => (
                <div key={plan.id} className="room-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/plan')}>
                  <div>
                    <h4 className="serif" style={{ margin: 0, fontSize: '1.2rem' }}>{plan.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{plan.duration} • Shared with Concierge</p>
                  </div>
                  <ChevronRight size={20} color="var(--accent)"/>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Stays */}
          <section>
            <h3 className="serif" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={24} color="var(--accent)"/> Reservations
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {loading ? <p>Gathering stays...</p> : 
               bookings.length === 0 ? <p style={{color:'var(--text-muted)'}}>No upcoming stays. Time for an escape?</p> :
               bookings.map(book => (
                <div key={book.id} style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border-color)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--accent)', fontWeight: 'bold' }}>Active</div>
                  <h4 className="serif" style={{ marginBottom: '0.3rem' }}>{book.room}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>ID: {book.paymentId.slice(-8).toUpperCase()}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: '600' }}>Rs. {book.total.toLocaleString()}</span>
                    <button className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Details</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
