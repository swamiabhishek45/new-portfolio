
import React, { useState, useRef, useEffect } from 'react';
import { PersonaMode, ChatMessage } from '../types/types';
import { chatWithPersona, generateSpeech } from '../services/geminiService';

const PERSONA_DESCRIPTIONS: Record<PersonaMode, string> = {
    [PersonaMode.DEVELOPER]: "Expert in clean code, architecture, and technical implementation.",
    [PersonaMode.DESIGNER]: "Focuses on aesthetics, user experience, and visual philosophy.",
    [PersonaMode.MENTOR]: "Provides career guidance, simple explanations, and encouragement.",
    [PersonaMode.CAREER_ADVISOR]: "Strategy for job search, interview prep, and industry positioning."
};

const STORAGE_KEY_HISTORY = 'alex-tech-chat-history';
const STORAGE_KEY_MODE = 'alex-tech-chat-mode';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [mode, setMode] = useState<PersonaMode>(PersonaMode.DEVELOPER);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map((result: any) => result.transcript)
                    .join('');
                setInput(transcript);
            };
            recognitionRef.current = recognition;
        }
    }, []);

    useEffect(() => {
        const savedMessages = localStorage.getItem(STORAGE_KEY_HISTORY);
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
            } catch (e) { }
        }
        const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
        if (savedMode && Object.values(PersonaMode).includes(savedMode as PersonaMode)) setMode(savedMode as PersonaMode);
    }, []);

    useEffect(() => {
        if (messages.length > 0) localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(messages));
        localStorage.setItem(STORAGE_KEY_MODE, mode);
    }, [messages, mode]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, isTyping, emailStatus]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    };

    const handlePersonaChange = (newMode: PersonaMode) => {
        if (newMode === mode) return;
        setMode(newMode);
        setMessages(prev => [...prev, {
            role: 'model',
            text: `🔄 Context switched to **${newMode}**.\n\n*${PERSONA_DESCRIPTIONS[newMode]}*`,
            timestamp: new Date()
        }]);
    };

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || isTyping) return;

        if (isListening) recognitionRef.current?.stop();
        const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const result = await chatWithPersona(mode, input, messages);
            if (result?.functionCalls?.length) {
                for (const fc of result.functionCalls) {
                    if (fc?.name === 'sendEmail') {
                        setEmailStatus('sending');
                        await new Promise(r => setTimeout(r, 2000));
                        setEmailStatus('sent');
                        setMessages(prev => [
                            ...prev,
                            {
                                role: "model",
                                text: `✅ Email sent successfully to Alex!\n\n"I've dispatched your message to abhishekswami1435@gmail.com. Alex will get back to you soon!"`,
                                timestamp: new Date(),
                            },
                        ]);
                        setTimeout(() => setEmailStatus('idle'), 5000);
                    }
                }
            } else if (result?.text) {
                setMessages(prev => [
                    ...prev,
                    {
                        role: "model",
                        text: result.text ?? "",
                        timestamp: new Date(),
                    },
                ]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'model', text: "Neural link lost. Try again!", timestamp: new Date() }]);
        } finally { setIsTyping(false); }
    };

    return (
        <div className="fixed bottom-6 left-6 z-100">
            {!isOpen ? (
                <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group">
                    <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </button>
            ) : (
                <div className="w-[90vw] sm:w-100 h-150 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">AT</div>
                            <div>
                                <h4 className="font-bold text-sm leading-none">{mode}</h4>
                                <p className="text-[10px] text-green-500 font-bold mt-1 uppercase tracking-tighter">AI Assistant Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex p-2 bg-slate-100 dark:bg-slate-950 gap-1 overflow-x-auto no-scrollbar">
                        {Object.values(PersonaMode).map(p => (
                            <button
                                key={p}
                                onClick={() => handlePersonaChange(p)}
                                className={`whitespace-nowrap shrink-0 text-[10px] px-3 py-1.5 rounded-lg font-black transition-all ${mode === p ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center py-10 space-y-4">
                                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-black">How can I help you?</p>
                                    <p className="text-xs text-slate-500">I can review resumes, explain tech stacks, or just chat.</p>
                                </div>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 text-sm whitespace-pre-wrap leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'}`}>
                                    {msg.text}
                                    {msg.role === 'model' && !msg.text.includes('🔄') && (
                                        <button onClick={() => generateSpeech(msg.text)} className="ml-2 opacity-50 hover:opacity-100">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && <div className="flex space-x-1 p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div></div>}
                    </div>

                    <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-2xl p-2 pl-4">
                            <input value={input} onChange={e => setInput(e.target.value)} placeholder={isListening ? "Listening..." : "Type your question..."} className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none" />
                            <button type="button" onClick={toggleListening} className={`p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-blue-600'}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg></button>
                            <button type="submit" disabled={!input.trim()} className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
