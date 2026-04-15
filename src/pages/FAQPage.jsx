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

export default FAQPage;
