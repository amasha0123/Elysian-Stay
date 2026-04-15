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

export default PrivacyPage;
