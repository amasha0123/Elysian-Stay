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

export default AboutPage;
