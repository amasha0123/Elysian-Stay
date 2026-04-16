import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Sparkles, Calendar, MapPin, Coffee, Utensils, Moon, Check } from 'lucide-react';

const PlanPage = () => {
  const [mood, setMood] = useState('Relax');
  const [days, setDays] = useState(3);
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState(null);

  const generatePlan = async () => {
    setGenerating(true);
    
    // Simulate AI Generation logic
    setTimeout(async () => {
      const mockPlan = {
        title: `${mood} Escape at Elysian`,
        duration: `${days} Days`,
        itinerary: [
          {
            day: 1,
            activities: [
              { time: '09:00 AM', event: 'Sunrise Yoga on the Terrace', icon: <Sparkles size={16}/> },
              { time: '01:00 PM', event: 'Artisan Lunch by the Infinity Pool', icon: <Utensils size={16}/> },
              { time: '04:00 PM', event: 'Guided Nature Walk & Bird Watching', icon: <MapPin size={16}/> }
            ]
          },
          {
            day: 2,
            activities: [
              { time: '10:00 AM', event: 'Private Spa & Aromatherapy Session', icon: <Coffee size={16}/> },
              { time: '02:00 PM', event: 'Local Cultural Heritage Tour', icon: <MapPin size={16}/> },
              { time: '07:00 PM', event: 'Candlelit Vineyard Dinner', icon: <Utensils size={16}/> }
            ]
          },
          {
            day: 3,
            activities: [
              { time: '08:30 AM', event: 'Gourmet Breakfast in Bed', icon: <Coffee size={16}/> },
              { time: '12:00 PM', event: 'Check-out & Farewell High Tea', icon: <Moon size={16}/> }
            ]
          }
        ]
      };

      try {
        // Save plan to Firestore
        await addDoc(collection(db, "itineraries"), {
          ...mockPlan,
          mood: mood,
          createdAt: serverTimestamp()
        });
        setPlan(mockPlan);
      } catch (e) {
        console.error("Error saving itinerary:", e);
      } finally {
        setGenerating(false);
      }
    }, 2000);
  };

  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="section-header" style={{ textAlign: 'center' }}>
        <span>AI Innovation</span>
        <h2 className="serif">Itinerary Planner</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Our AI concierge crafts the perfect schedule based on your travel vibe.</p>
      </div>

      {!plan ? (
        <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '30px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h3 className="serif" style={{ marginBottom: '2rem' }}>What is your travel mood?</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {['Relax', 'Adventurous', 'Romantic', 'Cultural'].map(m => (
              <button 
                key={m} 
                onClick={() => setMood(m)}
                className={`mood-chip ${mood === m ? 'active' : ''}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1rem', fontWeight: '600' }}>Stay Duration: {days} Days</p>
            <input 
              type="range" min="1" max="7" value={days} onChange={(e) => setDays(e.target.value)} 
              style={{ width: '100%', maxWidth: '400px', accentColor: 'var(--accent)' }}
            />
          </div>

          <button 
                className="btn-primary" 
                style={{ fontSize: '1.1rem', padding: '1rem 4rem' }}
                onClick={generatePlan}
                disabled={generating}
          >
            {generating ? 'AI is crafting your escape...' : 'Generate My Plan'}
          </button>
        </div>
      ) : (
        <div className="animate-fade-in-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h3 className="serif" style={{ fontSize: '2.5rem' }}>{plan.title}</h3>
              <p style={{ color: 'var(--accent)', fontWeight: '600' }}><Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }}/>{plan.duration} Custom Experience</p>
            </div>
            <button className="btn-outline" onClick={() => setPlan(null)}>Plan New Trip</button>
          </div>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {plan.itinerary.map((dayData) => (
              <div key={dayData.day} style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <h4 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Day 0{dayData.day}</h4>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                   {dayData.activities.map((act, idx) => (
                     <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap', width: '80px' }}>{act.time}</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {act.icon}
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{act.event}</span>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', background: 'var(--accent)', color: 'white', borderRadius: '20px' }}>
             <h4 className="serif" style={{ fontSize: '1.5rem', color: 'inherit' }}><Check size={24} style={{ marginRight: '10px' }}/> Saved to your profile!</h4>
             <p style={{ opacity: 0.9 }}>Your personalized schedule is now available in your reservations dashboard.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPage;
