
import React, { useEffect, useState } from 'react';
import { mockApiService } from '../services/mockApiService';
import { Project } from '../types/types';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filters = ['All', 'Web', 'AI', 'Cloud', 'Security'];

    useEffect(() => {
        mockApiService.getProjects().then(data => {
            setProjects(data);
            setFilteredProjects(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.tags.includes(activeFilter)));
        }
    }, [activeFilter, projects]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

    return (
        <section id="projects" className="py-24 px-6 bg-slate-100 dark:bg-slate-800/50 relative">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black">Selected Works</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                            A showcase of digital products I've crafted, focusing on utility, design, and performance. Click any project to dive deeper.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === f
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-blue-600 border border-slate-200 dark:border-slate-800'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800 h-112.5"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all animate-in fade-in zoom-in-95 duration-500 cursor-pointer"
                            >
                                <div className="relative overflow-hidden aspect-4/3">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 text-white font-black translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            View Details
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredProjects.length === 0 && !loading && (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">No projects found in this category yet.</p>
                    </div>
                )}
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    ></div>

                    <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
                        {/* Close Button Mobile */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 z-20 md:hidden w-10 h-10 bg-slate-900/50 backdrop-blur text-white rounded-full flex items-center justify-center"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* Left: Project Image */}
                        <div className="md:w-1/2 h-64 md:h-auto relative">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 md:hidden"></div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto space-y-8 flex flex-col">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase font-black tracking-widest text-blue-600 dark:text-blue-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black">{selectedProject.title}</h3>
                                </div>
                                {/* Close Button Desktop */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="hidden md:flex w-12 h-12 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full items-center justify-center transition-all"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        {selectedProject.description}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        This project was built with a focus on high-performance metrics and user-centric design. It integrates several advanced features including real-time state management, custom-designed UI components, and {selectedProject.tags.includes('AI') ? 'sophisticated artificial intelligence models for data processing' : 'a scalable cloud infrastructure for worldwide availability'}.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
                                        <p className="font-bold text-green-500 flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                            Production Ready
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Architecture</p>
                                        <p className="font-bold">Serverless / Microservices</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-4 bg-blue-600 text-white text-center font-black rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center group"
                                >
                                    <span>Live Project</span>
                                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-center font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center group"
                                >
                                    <svg className="mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
