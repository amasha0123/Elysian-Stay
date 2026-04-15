import { X, Navigation } from 'lucide-react';

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

export default VirtualTourOverlay;
