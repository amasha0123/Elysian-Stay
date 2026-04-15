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

export default ContactPage;
