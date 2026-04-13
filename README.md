# Elysian Stay 🌿 – Where Every Moment Feels Like Heaven

Elysian Stay is a fully functional, modern, and responsive guest house booking website built with React.js and Vite. The platform delivers a premium, relaxing experience allowing guests to browse luxury rooms, book their stays using a simulated secure payment gateway, and interact.

## 🎯 Core Features
- **Smart Booking System**: Real-time mock room selection with automated tax/fee calculation.
- **Payment Gateway UI**: Simulated robust checkout and payment flow (ready for Stripe integration).
- **AI Concierge Chatbot**: Built-in widget for 24/7 guest support and automatic itineraries.
- **Interactive Feedback System**: Users can rate their stay (1-5 stars) and write comments directly to the database.
- **Premium UI & Theming**: Employs glassmorphism, soft calm touches, smooth CSS animations, and a rich dynamic dark mode.
- **Mobile First**: Fully responsive on any device.
- **Interactive Maps & Socials**: Embedded Google Maps locations and interconnected social media routing.

---

## 📂 Folder Structure

```text
Elysian Stay/
│
├── public/                 # Static assets
├── src/
│   ├── index.css           # Global CSS (Theme variables, Glassmorphism, Animations)
│   ├── main.jsx            # Application Entry Point
│   └── App.jsx             # React Application Layout & Routed Page Components
│       ├── HomePage        # Hero, Rooms Feed, Interactive Map
│       ├── BookingPage     # Checkout system & Guest Detail Forms
│       ├── FeedbackPage    # Star rating & Review System
│       └── SignInPage      # Simulated authentication portal
│
├── index.html              # HTML Document setup with Google Fonts
├── package.json            # Dependencies & Scripts
├── vite.config.js          # Vite Build configuration
└── README.md               # Setup & Deployment Instructions
```

---

## 🚀 Setup Instructions (Local)

1. **Install Dependencies**
   Open the terminal in the project directory and run:
   ```bash
   npm install
   ```
   *(This installs necessary libraries including React Router DOM and Lucide React Icons).*

2. **Start Development Server**
   Run the following to start local hosting:
   ```bash
   npm run dev
   ```

3. **View the Application**
   Open your browser and navigate to `http://localhost:5173`. 

---

## 🌐 Deployment Instructions

The application is structured to strictly utilize frontend routes (SPA). It is production-ready for instantaneous deployment.

### Option A: Deploying on Netlify (Recommended)
1. **Build the Application**
   Run `npm run build` in your terminal. This creates a `dist` folder.
2. **Deploy**
   - Log into [Netlify Dashboard](https://app.netlify.com/).
   - Click **"Add new site"** -> **"Deploy manually"**.
   - Simply Drag and Drop the newly generated `dist` folder into the Netlify box.
   - For continuous deployment, link your GitHub repository directly to Netlify and it will auto-deploy on every push!

### Option B: Deploying on Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your terminal inside the project directory.
3. Follow the CLI prompts to deploy directly. Wait 60 seconds and your custom URL will be provided!

---

## 🛠 Next Steps for Backend Integration (Node.js/Firebase)
This UI seamlessly anticipates a backend connection.
- **Database**: Add `firebase` to `package.json` to pipe the existing `FeedbackPage` form data or Booking form states into Firestore.
- **Payment**: Drop in standard `@stripe/stripe-js` elements overriding the mock "Confirm & Pay" button logic inside `BookingPage`.

*Enjoy your digital escape!*
