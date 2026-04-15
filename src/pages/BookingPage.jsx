import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROOMS_DATA from '../data/roomsData';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Replace with your actual Publishable Key
const stripePromise = loadStripe("pk_test_51P...YOUR_PUBLISHABLE_KEY");

const CheckoutForm = ({ firstName, lastName, email, processing, setProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      return alert("Please fill guest details first!");
    }

    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const amount = (ROOMS_DATA[0].price * 4) + 14000;

      // 1. Create Payment Intent on backend
      const res = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(amount / 300) }), // Example: converts to roughly USD
      });

      const data = await res.json();
      
      if (data.error) throw new Error(data.error);

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${firstName} ${lastName}`,
            email: email,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // 3. Save to Firebase on success
          await addDoc(collection(db, "bookings"), {
            firstName,
            lastName,
            email,
            room: ROOMS_DATA[0].name,
            total: amount,
            paymentId: result.paymentIntent.id,
            createdAt: new Date(),
          });

          alert("Payment Successful ✓ Reservation Confirmed!");
          navigate('/');
        }
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed: " + error.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <h3 className="serif" style={{ marginBottom: '1.5rem' }}>Secure Payment</h3>
      <div style={{
        padding: '1rem',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        background: 'var(--bg-color)',
        marginBottom: '2rem'
      }}>
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: 'var(--text-main)',
              '::placeholder': { color: 'var(--text-muted)' },
            },
          },
        }} />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ width: '100%', padding: '1.2rem', opacity: (processing || !stripe) ? 0.7 : 1 }}
        disabled={processing || !stripe}
      >
        {processing ? 'Processing Securely...' : `Pay & Confirm Reservation`}
      </button>
    </form>
  );
};

const BookingPage = () => {
  const [processing, setProcessing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const totalAmount = (ROOMS_DATA[0].price * 4) + 14000;

  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem' }}>
      <div className="section-header">
        <span>Secure Checkout</span>
        <h2 className="serif">Complete Your Reservation</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        
        <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <h3 className="serif" style={{ marginBottom: '1.5rem' }}>Guest Details</h3>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ flex: 1, padding: '1rem', borderRadius: '10px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ flex: 1, padding: '1rem', borderRadius: '10px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '1rem', marginBottom: '2.5rem', borderRadius: '10px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
          />

          <Elements stripe={stripePromise}>
            <CheckoutForm 
              firstName={firstName} 
              lastName={lastName} 
              email={email} 
              processing={processing} 
              setProcessing={setProcessing} 
            />
          </Elements>
        </div>

        <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--accent)', height: 'fit-content' }}>
          <h3 className="serif" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Your Stay</h3>
          <img src={ROOMS_DATA[0].img} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1.5rem' }} />
          <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{ROOMS_DATA[0].name}</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>1 Room • 2 Guests</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span>Dates</span>
            <span style={{ fontWeight: '500' }}>Oct 12 - Oct 16</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <span>Nights</span>
            <span style={{ fontWeight: '500' }}>4</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '1.3rem', fontWeight: '600' }}>
            <span>Total</span>
            <span style={{ color: 'var(--accent)' }}>Rs. {totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;