
import React from 'react';
import Me from '@/public/me.png'
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <Image
                        src={Me}
                        alt="Alex Tech"
                        className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">The Journey of a Code Explorer</h2>
                    <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                        <p>
                            I started my journey tinkering with HTML/CSS at age 12, fascinated by how simple text could become a window to another world. Over a decade later, that curiosity has evolved into a passion for full-stack engineering and cutting-edge AI.
                        </p>
                        <p>
                            I specialize in React and Node.js, with a deep focus on integrating Large Language Models like Gemini into production environments to create experiences that feel "magical" yet practical.
                        </p>
                        <p>
                            When I'm not coding, you'll find me exploring the latest UI design trends or contributing to open-source tools that empower developers to build faster.
                        </p>
                    </div>
                    <div className="flex space-x-4 pt-4">
                        <div className="text-center p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex-1">
                            <div className="text-2xl font-bold text-blue-600">100+</div>
                            <div className="text-xs uppercase tracking-wider font-semibold">Days Coding Streak</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex-1">
                            <div className="text-2xl font-bold text-blue-600">10+</div>
                            <div className="text-xs uppercase tracking-wider font-semibold">Projects</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex-1">
                            <div className="text-2xl font-bold text-blue-600">700+</div>
                            <div className="text-xs uppercase tracking-wider font-semibold">Commits</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
