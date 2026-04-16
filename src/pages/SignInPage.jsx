import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';


const SignInPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '10rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '450px', border: '1px solid var(--border-color)' }}>
        <h2 className="serif" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Sign in to view your itinerary & reservations.</p>

        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }} />
        <input type="password" placeholder="Password" style={{ width: '100%', padding: '1rem', marginBottom: '2.5rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }} />

        <button 
          className="btn-primary" 
          style={{ width: '100%' }} 
          onClick={async () => { 
            if (!email) return alert('Enter email'); 
            
            try {
              // Save sign-in event to Firestore
              await addDoc(collection(db, "users_auth_logs"), {
                email: email,
                timestamp: new Date()
              });
              
              setUser(email.split('@')[0] || 'Guest'); 
              alert('Sign In Successful!'); 
              navigate('/'); 
            } catch (error) {
              console.error("Error logging sign-in:", error);
              // Still allow sign-in even if logging fails for now
              setUser(email.split('@')[0] || 'Guest'); 
              navigate('/'); 
            }
          }}
        >
          Sign In
        </button>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <span style={{ color: 'var(--accent)', fontWeight: '600', cursor: 'pointer' }} onClick={() => { alert('Redirecting to Registration...'); navigate('/'); }}>Create one</span>
        </div>
      </div>
    </div>
  )
};

export default SignInPage;
