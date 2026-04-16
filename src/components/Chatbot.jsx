import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ sender: 'ai', text: 'Welcome to Elysian Stay. I am your personal digital concierge. How can I perfect your escape today?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, isTyping]);

  const getAIResponse = (term) => {
    const low = term.toLowerCase();
    if (low.includes('price') || low.includes('cost') || low.includes('rate')) 
      return "Our luxury escapes start at Rs. 45,000 per night. Each suite includes a private butler and panoramic views.";
    if (low.includes('book') || low.includes('reservation')) 
      return "You can book directly on our site! Head over to the 'Destinations' page to select your dream suite.";
    if (low.includes('wifi') || low.includes('internet')) 
      return "Complementary high-speed fiber optic Wi-Fi is available throughout the estate.";
    if (low.includes('food') || low.includes('breakfast') || low.includes('eat')) 
      return "The Elysian experience includes 24/7 gourmet dining. Our Michelin-starred chefs are ready to serve you.";
    if (low.includes('hello') || low.includes('hi')) 
      return "Hello! How can I assist you with your luxury stay today?";
    
    return "I would be delighted to help with that. Would you like me to connect you with our premium concierge team directly?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = { sender: 'user', text: input };
    setMsgs(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    // Start typing effect
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = { sender: 'ai', text: getAIResponse(currentInput) };
      setMsgs(prev => [...prev, aiResponse]);
    }, 1500); // 1.5s delay for realism
  };

  return (
    <>
      <div className="chat-fab" onClick={() => setIsOpen(!isOpen)} style={{ zIndex: 2001 }}>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </div>

      <div className="chat-window" style={{ 
        opacity: isOpen ? 1 : 0, 
        transform: isOpen ? 'translateY(0)' : 'translateY(20px)', 
        pointerEvents: isOpen ? 'auto' : 'none',
        zIndex: 2000 
      }}>
        <div className="chat-header">
          <div>
            <h4 style={{ margin: 0 }}>Elysian Concierge&trade;</h4>
            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Online & Ready</span>
          </div>
          <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
        </div>

        <div className="chat-body" ref={scrollRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
          {isTyping && (
            <div className="msg ai" style={{ fontStyle: 'italic', opacity: 0.7 }}>
              Concierge is typing...
            </div>
          )}
        </div>

        <div className="chat-input">
          <input 
            type="text" 
            placeholder="Type your request..." 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={isTyping}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
