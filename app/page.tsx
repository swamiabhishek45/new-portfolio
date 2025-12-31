'use client';

import React, { useEffect, useState, useCallback } from 'react';

import About from '@/components/About';
import BackgroundEffects from '@/components/BackgroundEffect';
import Certifications from '@/components/Certification';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import ResumeReviewer from '@/components/ResumeReviewer';
import Skills from '@/components/Skills';
import VideoSection from '@/components/VideoSection';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme (client-side only)
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      setIsDark(true);
    } else if (storedTheme === 'light') {
      setIsDark(false);
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply theme to <html> and persist
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-900">
      <BackgroundEffects />

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <ResumeReviewer />
        <VideoSection />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
