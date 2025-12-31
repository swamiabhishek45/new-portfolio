
import React from 'react';

const BackgroundEffects: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Dynamic Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-indigo-400/10 dark:bg-indigo-600/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-400/5 dark:bg-purple-600/5 blur-[100px] rounded-full animate-pulse [animation-delay:4s]"></div>

            {/* Floating Geometric Shapes */}
            <svg className="absolute w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>

            <div className="absolute inset-0">
                {/* Animated Squares */}
                <div className="absolute top-[15%] left-[10%] w-12 h-12 border border-blue-500/20 rounded-lg animate-[float_8s_ease-in-out_infinite] rotate-12"></div>
                <div className="absolute top-[60%] left-[5%] w-8 h-8 border border-indigo-500/20 rounded-full animate-[float_12s_ease-in-out_infinite] [animation-delay:1s]"></div>
                <div className="absolute top-[40%] right-[10%] w-16 h-16 border border-purple-500/20 rounded-xl animate-[float_10s_ease-in-out_infinite] [animation-delay:2s] -rotate-12"></div>
                <div className="absolute bottom-[15%] left-[20%] w-10 h-10 border border-blue-500/20 rounded-md animate-[float_9s_ease-in-out_infinite] [animation-delay:3s] rotate-45"></div>
                <div className="absolute top-[80%] right-[25%] w-6 h-6 border border-slate-500/20 rounded-full animate-[float_15s_ease-in-out_infinite] [animation-delay:4s]"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-20px) rotate(calc(var(--tw-rotate, 0deg) + 10deg)); }
        }
      `}} />
        </div>
    );
};

export default BackgroundEffects;
