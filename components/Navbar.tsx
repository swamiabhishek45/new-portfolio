
import React from 'react';

interface NavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-6 md:px-12 justify-between">
            <div className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AlexTech.
            </div>

            <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
                <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
                <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
                <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
                <a href="#resume-reviewer" className="hover:text-blue-500 transition-colors">AI Resume Review</a>
                <a href="#video" className="hover:text-blue-500 transition-colors">Video Pitch</a>
                <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
                {/* <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                    aria-label="Toggle Theme"
                >
                    {isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                    )}
                </button> */}
                <a
                    href="#contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
                >
                    Hire Me
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
