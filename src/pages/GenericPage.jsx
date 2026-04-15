import { Link } from 'react-router-dom';

const GenericPage = ({ title, subtitle }) => (
  <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', textAlign: 'center' }}>
    <div className="section-header">
      <span>{subtitle || 'Discover More'}</span>
      <h2 className="serif" style={{marginBottom: '1.5rem'}}>{title}</h2>
    </div>
    <p style={{maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)'}}>
      Content for <strong style={{color: 'var(--text-main)'}}>{title}</strong> is currently being curated for your ultimate luxury experience. Check back soon.
    </p>
    <Link to="/" className="btn-primary" style={{marginTop: '2.5rem', display: 'inline-block'}}>Return to Sanctuary</Link>
  </div>
);

export default GenericPage;
