import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const CopilotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hello! I am your CovenantIQ Copilot. Ask me anything about your loans or agreements.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let responseText = "I'm analyzing the latest compliance data...";
            const query = userMsg.text.toLowerCase();

            if (query.includes('compliant') || query.includes('status')) {
                responseText = "Based on the Q4 financials uploaded yesterday, the **TechCorp Term Loan B** is compliant correctly. However, the Leverage Ratio is currently **3.9x**, close to the **4.0x** threshold.";
            } else if (query.includes('risk') || query.includes('breach')) {
                responseText = "There is **1 active risk alert**. The Leverage Ratio for TechCorp is approaching the covenant limit. I recommend scheduling a call with the borrower.";
            } else if (query.includes('documents') || query.includes('upload')) {
                responseText = "You can upload new compliance certificates in the **Financials** tab. Would you like me to take you there?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}>
            {isOpen ? (
                <div
                    className="card"
                    style={{
                        width: '350px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 'var(--shadow-lg)',
                        padding: 0,
                        overflow: 'hidden',
                        border: '1px solid var(--color-accent)'
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '1rem', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-accent" />
                            <span className="font-bold">Covenant Copilot</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#f8fafc' }}>
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    backgroundColor: msg.sender === 'user' ? 'var(--color-accent)' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'var(--color-text-main)',
                                    padding: '0.75rem 1rem',
                                    borderRadius: msg.sender === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                                    maxWidth: '85%',
                                    boxShadow: msg.sender === 'ai' ? 'var(--shadow-sm)' : 'none',
                                    fontSize: '0.9rem',
                                    whiteSpace: 'pre-line'
                                }}
                            >
                                {msg.sender === 'ai' ? <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /> : msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                                <div className="flex gap-1">
                                    <span className="dot" style={{ animationDelay: '0s' }}></span>
                                    <span className="dot" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="dot" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about compliance..."
                            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}
                            autoFocus
                        />
                        <button
                            onClick={handleSend}
                            style={{ backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', padding: '0.5rem', cursor: 'pointer' }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-lg)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <Sparkles size={28} />
                </button>
            )}
            <style>{`
        .dot { width: 6px; height: 6px; background-color: #94a3b8; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
      `}</style>
        </div>
    );
};

export default CopilotWidget;
