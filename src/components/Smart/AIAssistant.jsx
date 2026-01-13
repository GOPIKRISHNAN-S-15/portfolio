import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, Code2, Globe } from 'lucide-react';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am GS-AI. How can I help you explore Gopi\'s portfolio today?' }
    ]);

    const suggestions = [
        { label: 'Show Projects', icon: <Globe size={14} />, query: 'Tell me about the major projects.' },
        { label: 'Technical Skills', icon: <Code2 size={14} />, query: 'What are the core technical skills?' },
        { label: 'Resume Help', icon: <User size={14} />, query: 'How can I download the resume?' }
    ];

    const handleQuery = (query) => {
        setMessages(prev => [...prev, { role: 'user', content: query }]);

        // Simulated AI Response
        setTimeout(() => {
            let response = "I'm processing that... ";
            if (query.includes('Projects')) response = "Gopi has worked on several high-impact projects like 'Wealth Navigator' and a 'Web Crawler' in C++. You can find them in the Portfolio section below!";
            if (query.includes('Skills')) response = "Core expertise includes Python, Data Science, AI/ML, and Web Development with React and Tailwind.";
            if (query.includes('resume')) response = "You can download the resume by clicking the 'Resume' button in the navigation bar at the top right!";

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 sm:w-96 glass-morphism rounded-3xl overflow-hidden shadow-2xl border border-primary-500/30"
                    >
                        <div className="p-4 bg-primary-500/10 border-b border-primary-500/20 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary-500 rounded-lg text-white">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">GS-AI Assistant</h4>
                                    <span className="text-[10px] text-primary-500 font-bold uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="h-96 overflow-y-auto p-4 space-y-4 text-sm">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-primary-500 text-white rounded-tr-none'
                                            : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuery(s.query)}
                                        className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-primary-500/30 hover:bg-primary-500 hover:text-white transition-all flex items-center gap-1.5"
                                    >
                                        {s.icon}
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-primary-500 text-white rounded-full shadow-lg shadow-primary-500/40 interactive relative group"
            >
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
            </motion.button>
        </div>
    );
};

export default AIAssistant;
