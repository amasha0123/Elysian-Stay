import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ sender: 'ai', text: 'Welcome to Elysian Stay. I am your personal digital concierge. How can I perfect your escape today?' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if(!input.trim()) return;
    setMsgs([...msgs, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMsgs(prev => [...prev, { sender: 'ai', text: 'I can certainly help with that. Would you like me to tailor our "Plan My Stay" itinerary to your preferences?' }]);
    }, 1000);
  };

  return (
    <>
      <div className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </div>

      <div className="chat-window" style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'scale(1)' : 'scale(0.9)', pointerEvents: isOpen ? 'auto' : 'none' }}>
        <div className="chat-header">
          <h4>Elysian Concierge&trade;</h4>
          <X size={20} style={{cursor:'pointer'}} onClick={() => setIsOpen(false)} />
        </div>
        <div className="chat-body">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="Type your request..." 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}><Send size={16} style={{marginLeft: '-2px'}} /></button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
