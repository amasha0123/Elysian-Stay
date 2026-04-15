import { useNavigate } from 'react-router-dom';

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

export default ProfilePage;
