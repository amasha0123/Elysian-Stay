const CareersPage = () => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '800px', margin: '0 auto' }}>
    <div className="section-header" style={{textAlign: 'center'}}>
      <span>Join Us</span>
      <h2 className="serif">Careers</h2>
    </div>
    <div style={{ lineHeight: '1.8', color: 'var(--text-main)', textAlign: 'center' }}>
      <p style={{marginBottom: '2rem'}}>Join Elysian Stay and be part of a team that is transforming the travel experience. We are always looking for passionate individuals in technology, customer service, marketing, and hospitality partnerships.</p>
      <p style={{marginBottom: '2.5rem', color: 'var(--text-muted)'}}>At Elysian Stay, you'll work in a dynamic environment where innovation and creativity are valued. Grow your career with us and help shape the future of travel.</p>
      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '1rem', textAlign: 'left' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem'}}>Technology</h4>
        <p style={{color: 'var(--accent)', fontWeight: '500'}}>Full-stack Engineers, UI/UX Designers, QA</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '1rem', textAlign: 'left' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem'}}>Customer Service</h4>
        <p style={{color: 'var(--accent)', fontWeight: '500'}}>Support Agents, Concierge Managers</p>
      </div>
      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '1rem', textAlign: 'left' }}>
        <h4 className="serif" style={{marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem'}}>Marketing & Partnerships</h4>
        <p style={{color: 'var(--accent)', fontWeight: '500'}}>Content Strategists, Brand Managers, Hospitality Partners</p>
      </div>
      <p style={{marginTop: '2rem', color: 'var(--text-muted)'}}>Send your resume to <strong style={{color: 'var(--text-main)'}}>careers@elysianstay.com</strong></p>
    </div>
  </div>
);

export default CareersPage;
