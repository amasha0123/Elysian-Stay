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

export default PressPage;
