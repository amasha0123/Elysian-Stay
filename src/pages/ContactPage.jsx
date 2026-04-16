import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', maxWidth: '600px', margin: '0 auto' }}>
      <div className="section-header" style={{ textAlign: 'center' }}>
        <span>Contact 24/7</span>
        <h2 className="serif">Get In Touch</h2>
      </div>
      
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-color)', borderRadius: '20px', border: '1px solid var(--accent)' }}>
          <h3 className="serif" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Message Sent!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Our concierge team will review your request and get back to you shortly.</p>
          <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
        </div>
      ) : (
        <>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
            Need help? Our support team is available around the clock. We respond quickly to ensure your travel experience is smooth and stress-free.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ flex: 1, padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ flex: 1, padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit', resize: 'vertical' }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: '0.5rem', width: '100%', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </>
      )}

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h4 className="serif" style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>Direct Lines</h4>
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Email: <a href="mailto:support@elysianstay.com" style={{ color: 'var(--accent)' }}>support@elysianstay.com</a></p>
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Phone: <a href="tel:0783186375" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>0783186375</a></p>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Live Chat: <span style={{ color: 'var(--accent)' }}>Available on our website anytime</span></p>
      </div>
    </div>
  );
};

export default ContactPage;
