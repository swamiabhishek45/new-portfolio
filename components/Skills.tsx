
import React, { useEffect, useState } from 'react';
import { mockApiService } from '../services/mockApiService';
import { Skill } from '../types/types';
import { motion, AnimatePresence } from 'framer-motion';

const SkillCard = ({ skill }: { skill: Skill }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl transition-all duration-300 group cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute -top-10 z-20 pointer-events-none"
                    >
                        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                            {skill.name}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={{
                    scale: isHovered ? 1.15 : 1,
                    filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                    opacity: isHovered ? 1 : 0.6
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-12 h-12 flex items-center justify-center"
            >
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                />
            </motion.div>
        </div>
    );
};

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        mockApiService.getSkills().then((data) => {
            setSkills(data);
            setLoading(false);
        });
    }, []);

    const categories: Skill['category'][] = ['Frontend', 'Backend', 'Tools'];

    return (
        <section id="skills" className="py-16 sm:py-24 px-6 bg-white dark:bg-slate-900 transition-colors">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <h2 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-blue-600">Technical_Stack</h2>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Compact <span className="text-slate-400">Toolkit.</span>
                        </h3>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 max-w-60 leading-relaxed">
                        A minimalist selection of technologies I leverage to build production-grade applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 sm:gap-16">
                    {categories.map((cat) => (
                        <div key={cat} className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <span className="text-[10px] font-mono font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">{cat}</span>
                                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-4">
                                {skills
                                    .filter((s) => s.category === cat)
                                    .map((skill) => (
                                        <SkillCard key={skill.name} skill={skill} />
                                    ))}
                                {loading && (
                                    <div className="col-span-full h-12 flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
