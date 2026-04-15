import { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      return alert('Please select a star rating!');
    }

    try {
      await addDoc(collection(db, "feedback"), {
        rating: rating,
        comment: comment,
        recommended: recommend,
        createdAt: new Date()
      });

      setSubmitted(true);
      setRating(0);
      setComment('');
      setRecommend(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--shadow)', width: '100%', maxWidth: '600px', border: '1px solid var(--border-color)' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Check size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 className="serif">Thank you!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Your feedback has been successfully submitted.
            </p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="serif" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
              Guest Reviews
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              We value your experience at Elysian Stay. Please share your thoughts.
            </p>

            {/* ⭐ Star Rating */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={36}
                  style={{
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    color: star <= (hover || rating) ? 'var(--accent)' : 'var(--border-color)'
                  }}
                  fill={star <= (hover || rating) ? 'var(--accent)' : 'transparent'}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>

            {/* 📝 Comment */}
            <textarea
              placeholder="Tell us about your relaxing stay..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1.5rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                background: 'var(--bg-color)',
                color: 'var(--text-main)',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />

            {/* ✅ Recommend Checkbox */}
            <div style={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              <input
                type="checkbox"
                id="recommend"
                checked={recommend}
                onChange={(e) => setRecommend(e.target.checked)}
              />
              <label htmlFor="recommend" style={{ color: 'var(--text-muted)' }}>
                I would recommend this guest house.
              </label>
            </div>

            {/* 🚀 Submit */}
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;