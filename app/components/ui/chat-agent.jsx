"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles } from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'know', 'good at'],
    reply: "Atharva works across Python, C++, JavaScript, React.js, Flask, and MySQL. In ML & Data Science, he specializes in Scikit-learn, Pandas, NumPy, NLP, feature engineering, and AutoML (TPOT), alongside AWS Cloud and Linux. Check the Skills section for the full breakdown.",
  },
  {
    keywords: ['experience', 'education', 'college', 'work', 'job', 'career', 'background'],
    reply: "Atharva is pursuing his B.Tech in Artificial Intelligence and Data Science at K. K. Wagh Institute of Engineering Education and Research (CGPA: 8.23). He has built production-grade ML workflows and web applications, and reached the final screening round in Smart India Hackathon (SIH) 2025.",
  },
  {
    keywords: ['project', 'built', 'portfolio', 'work you'],
    reply: "Key projects include the AI-Powered Text-to-AutoML Platform (converting NLP queries into trained ML models via TPOT), the AI-Based Football Match Analysis System, and a full-stack Online Ticket Booking Website with Flask & MySQL. Check the Projects section for details!",
  },
  {
    keywords: ['certificate', 'certification', 'credential', 'course'],
    reply: "Atharva holds prestigious certifications including Oracle Cloud Infrastructure Generative AI (2025), AWS Certified Cloud Practitioner, Google Computer Networking, and Google System Administration. You can view them in the Certificates section.",
  },
  {
    keywords: ['location', 'where', 'based', 'live', 'country', 'city'],
    reply: "He is based in Nashik, Maharashtra, India.",
  },
  {
    keywords: ['contact', 'email', 'reach', 'phone'],
    reply: `You can reach him directly at atharvapetkar234@gmail.com or call +91 7066731313, or use the Contact section below.`,
  },
  {
    keywords: ['resume', 'cv'],
    reply: "You can view or download his resume right from the Contact section — there are buttons for both review and direct download.",
  },
  {
    keywords: ['service', 'offer', 'provide', 'hire you for', 'what can you do'],
    reply: "Atharva offers Machine Learning & Predictive Modeling, AI-Powered Web Applications, Data Analytics & Preprocessing, and Backend REST API Development. Take a look at the Services section to send a quick request.",
    action: 'services',
  },
  {
    keywords: ['book', 'meeting', 'schedule', 'call', 'available', 'availability', 'talk', 'chat with him'],
    reply: "Happy to help you set that up. Scroll down to the Availability calendar — select any preferred date and it will open a meeting request form.",
    action: 'availability',
  },
  {
    keywords: ['hire', 'work with', 'collaborate'],
    reply: "Great to hear! You can book a meeting via the Availability calendar, send a message through the Services section, or email him directly at atharvapetkar234@gmail.com.",
    action: 'availability',
  },
];

const FALLBACK_REPLY = "I'm a simple FAQ assistant for Atharva — try asking about his skills, projects, certifications, education, services, or booking a meeting. You can also email him directly at atharvapetkar234@gmail.com.";

const QUICK_REPLIES = ['What are your skills?', 'What services do you offer?', 'Tell me about your projects', 'How can I contact you?'];

function matchReply(text) {
  const lower = text.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry;
    }
  }
  return { reply: FALLBACK_REPLY };
}

export default function ChatAgent({ isDarkMode, themeClasses, onNavigate, accentColor = '#10b981' }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi, I'm Atharva's assistant. Ask me about his AI/ML skills, projects, certifications, or services — or say you'd like to book a meeting." },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const respond = (text) => {
    const match = matchReply(text);
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'bot', text: match.reply }]);
    if (match.action) {
      setTimeout(() => onNavigate(match.action), 400);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    respond(trimmed);
    setInput('');
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 ${open ? '' : 'animate-gentle-float'}`}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
          style={{ '--orb-color': accentColor }}
          className="ai-orb relative inline-flex items-center justify-center w-16 h-16 rounded-full text-white transition-transform hover:scale-105"
        >
          <span className="ai-orb-shine" aria-hidden="true" />
          {open ? <X size={22} className="relative z-10" /> : <Sparkles size={22} className="relative z-10" />}
        </button>
      </div>

      {open && (
        <div className={`fixed bottom-24 right-6 z-[60] w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] rounded-[1.75rem] shadow-2xl flex flex-col overflow-hidden ${themeClasses.card}`}>
          <div className={`px-5 py-4 flex items-center gap-3 border-b ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Sparkles size={18} />
            </div>
            <div>
              <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Ask about Atharva</p>
              <p className="text-[11px] text-emerald-400 uppercase tracking-widest font-bold">FAQ assistant</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-emerald-500 text-white'
                      : `${themeClasses.subCard} ${isDarkMode ? 'text-gray-200' : 'text-neutral-700'}`
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => respond(q)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-colors ${
                  isDarkMode ? 'border-white/10 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-300' : 'border-neutral-200 text-neutral-600 hover:border-emerald-500/50 hover:text-emerald-600'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className={`px-4 py-3 flex items-center gap-2 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className={`flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 ${themeClasses.subCard} ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-neutral-900 placeholder:text-neutral-400'}`}
            />
            <button
              type="submit"
              aria-label="Send"
              className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
