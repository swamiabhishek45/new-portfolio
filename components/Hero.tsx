
import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [tickerIndex, setTickerIndex] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    const philosophies = [
        "NEURAL_INTERFACE_READY",
        "LATENCY_MINIMIZED",
        "ARCHITECTING_FUTURE_SYSTEMS",
        "UX_HEURISTICS_OPTIMIZED",
        "AI_CORE_ACTIVE"
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        const interval = setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % philosophies.length);
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-700"
        >
            {/* Interactive Aura Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.15), transparent 80%)`
                }}
            />

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute w-2 h-2 bg-blue-500 rounded-full blur-[1px] animate-pulse"
                    style={{
                        left: '20%', top: '30%',
                        transform: `translate(${(mousePos.x - 500) * 0.05}px, ${(mousePos.y - 500) * 0.05}px)`
                    }}
                />
                <div
                    className="absolute w-1 h-1 bg-indigo-500 rounded-full"
                    style={{
                        right: '25%', top: '40%',
                        transform: `translate(${(mousePos.x - 500) * -0.03}px, ${(mousePos.y - 500) * -0.03}px)`
                    }}
                />
                <div
                    className="absolute w-3 h-3 border border-blue-400/30 rounded-full"
                    style={{
                        left: '30%', bottom: '20%',
                        transform: `translate(${(mousePos.x - 500) * 0.02}px, ${(mousePos.y - 500) * 0.02}px)`
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                {/* Top Badge */}
                <div className="flex justify-center mb-12 mt-16">
                    <div className="group flex items-center space-x-3 px-6 py-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all cursor-default animate-in fade-in slide-in-from-top-10 duration-1000">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            System Status: <span className="text-blue-600 dark:text-blue-400">Innovation_Active</span>
                        </span>
                    </div>
                </div>

                {/* Headline with Parallax Effect */}
                <div className="relative text-center space-y-6">
                    <div className="relative inline-block">
                        {/* Outline Ghost Layer */}
                        <h1
                            className="absolute inset-0 text-7xl md:text-[10rem] font-black leading-[0.8] select-none pointer-events-none opacity-10 dark:opacity-5 text-transparent transition-transform duration-200 ease-out"
                            style={{
                                WebkitTextStroke: '2px currentColor',
                                transform: `translate(${(mousePos.x - 800) * 0.02}px, ${(mousePos.y - 400) * 0.02}px)`
                            }}
                        >
                            ENGINEERING<br />INTELLIGENCE
                        </h1>

                        <h1 className="relative text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-1000">
                            ENGINEERING<br />
                            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                INTELLIGENCE.
                            </span>
                        </h1>
                    </div>

                    <p className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed px-4 animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000">
                        I'm <span className="text-slate-900 dark:text-white font-black underline decoration-blue-500 decoration-4 underline-offset-4">Abhishek</span>,
                        bridging the gap between raw data and human experience through high-fidelity code and generative AI.
                    </p>
                </div>

                {/* CTA Section */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in zoom-in duration-1000 delay-500">
                    <a
                        href="#projects"
                        className="group relative px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/30 overflow-hidden transition-all hover:-translate-y-1 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 flex items-center">
                            Explore Projects
                            <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </a>

                    <a
                        href="#contact"
                        className="px-12 py-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black text-lg rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1"
                    >
                        Start Conversation
                    </a>
                </div>
            </div>

            {/* Philosophy Ticker - Bottom Left */}
            <div className="absolute bottom-10 left-10 hidden lg:flex items-center space-x-4 animate-in fade-in duration-1000 delay-700">
                <div className="w-10 h-px bg-slate-300 dark:bg-slate-700" />
                <div className="overflow-hidden h-4 flex items-center">
                    <p
                        key={tickerIndex}
                        className="text-[10px] font-black font-mono uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 animate-in slide-in-from-bottom-full fade-in duration-500"
                    >
                        {philosophies[tickerIndex]}
                    </p>
                </div>
            </div>

            {/* Side Social Strip */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-8 animate-in fade-in slide-in-from-right-10 duration-1000 delay-1000">
                {['GH', 'LI', 'TW', 'IG'].map((social) => (
                    <a
                        key={social}
                        href="#"
                        className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors vertical-text tracking-widest"
                    >
                        {social}
                    </a>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}} />
        </section>
    );
};

export default Hero;
