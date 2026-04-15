const ElysianLogo = ({ style }) => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', ...style }}>
    <path d="M50 5 C 80 5, 95 20, 95 50 C 95 80, 80 95, 50 95 C 20 95, 5 80, 5 50 C 5 20, 20 5, 50 5 Z" stroke="var(--accent)" strokeWidth="3" />
    <path d="M35 35 L65 35 M35 50 L55 50 M35 65 L65 65 M35 35 L35 65" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M80 50 C 80 30, 60 20, 50 15 C 40 20, 20 30, 20 50" stroke="var(--accent)" strokeWidth="2" opacity="0.4"/>
  </svg>
);

export default ElysianLogo;
