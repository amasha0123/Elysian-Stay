import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ROOMS_DATA from '../data/roomsData';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const BookingPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const preSelected = location.state || {};

  const [processing, setProcessing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const totalAmount = (ROOMS_DATA[0].price * 4) + 14000;

  const MOCK_PAYMENT = true; // Set to false when you have valid Stripe keys

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (processing) return;

    if (!firstName || !lastName || !email) {
      return alert("Please fill guest details first!");
    }

    // Only require Stripe if not in Mock Mode
    if (!MOCK_PAYMENT && (!stripe || !elements)) {
      return alert("Stripe not loaded yet!");
    }

    setProcessing(true);

    try {
      if (MOCK_PAYMENT) {
        // --- MOCK FLOW (Bypasses Stripe) ---
        console.log("🎟️ Mock Payment Active: Bypassing Stripe API...");
        
        // Simulating a short delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save mock booking to Firestore
        await addDoc(collection(db, "bookings"), {
          firstName,
          lastName,
          email,
          room: ROOMS_DATA[0].name,
          total: totalAmount,
          paymentId: "MOCK_PAYMENT_" + Math.random().toString(36).substr(2, 9),
          createdAt: serverTimestamp(),
          isMock: true
        });

        alert("Mock Booking Successful! 🎉 (Saved to Firebase)");
        setProcessing(false);
        navigate('/');
        return;
      }

      // --- REAL STRIPE FLOW ---
      // 1. Create Payment Intent (amount in cents)
      const res = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100 }), // FIXED
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // 2. Get card element
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // 3. Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${firstName} ${lastName}`,
            email: email,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent.status === "succeeded") {

        // 4. Save booking to Firestore
        await addDoc(collection(db, "bookings"), {
          firstName,
          lastName,
          email,
          room: ROOMS_DATA[0].name,
          total: totalAmount,
          paymentId: result.paymentIntent.id,
          createdAt: serverTimestamp(), // FIXED
        });

        alert("Payment Successful 🎉 Reservation Confirmed!");
        setProcessing(false);
        navigate('/');
      }

    } catch (error) {
      console.error(error);
      alert("Payment failed: " + error.message);
      setProcessing(false);
    }
  };

  return (
    <div className="section-padding animate-fade-in-up" style={{ minHeight: '80vh', paddingTop: '12rem' }}>
      <div className="section-header">
        <span>Secure Checkout</span>
        <h2 className="serif">Complete Your Reservation</h2>
      </div>

      <form onSubmit={handleCheckout}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>

          {/* LEFT SIDE */}
          <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <h3 className="serif" style={{ marginBottom: '1.5rem' }}>Guest Details</h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{ flex: 1, padding: '1rem', borderRadius: '10px' }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={{ flex: 1, padding: '1rem', borderRadius: '10px' }}
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '1rem', marginBottom: '2rem', borderRadius: '10px' }}
            />

            <h3 className="serif" style={{ marginBottom: '1.5rem' }}>Secure Payment</h3>

            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '10px', marginBottom: '2rem' }}>
              <CardElement />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '1.2rem', opacity: (processing || !stripe) ? 0.7 : 1 }}
              disabled={processing || !stripe}
            >
              {processing ? 'Processing Securely...' : `Pay & Confirm Reservation`}
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--accent)' }}>
            <h3 className="serif" style={{ marginBottom: '1.5rem' }}>Your Stay</h3>

            <img
              src={ROOMS_DATA[0].img}
              alt=""
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1.5rem' }}
            />

            <h4>{ROOMS_DATA[0].name}</h4>
            <p>{preSelected.guests || '1 Room • 2 Guests'}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Stay Dates</span>
              <span>{preSelected.dates || 'Oct 12 - Oct 16'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total</span>
              <span>Rs. {totalAmount.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default BookingPage;