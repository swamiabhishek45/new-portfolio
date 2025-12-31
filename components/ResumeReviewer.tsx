
import React, { useState, useRef } from 'react';
import { analyzeResume } from '../services/geminiService';

interface AnalysisResult {
    score: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    actionableSteps: string[];
}

const ResumeReviewer: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (uploadedFile: File) => {
        if (uploadedFile.size > 5 * 1024 * 1024) {
            alert("File too large. Max 5MB.");
            return;
        }
        setFile(uploadedFile);
    };

    const onDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = reject;
        });

    const handleAnalyze = async () => {
        if (!file) return;
        setIsLoading(true);
        setResult(null);

        try {
            const base64 = await toBase64(file);
            const data = await analyzeResume(base64, file.type);
            setResult(data);
        } catch (err) {
            console.error(err);
            alert("Analysis failed. Please try a clearer PDF or image.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="resume-reviewer" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-5xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-200 dark:border-blue-800 mb-2">
                        AI Talent Suite
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                        Resume <span className="text-blue-600">Intelligence.</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Abhishek's proprietary AI engine mimics top Silicon Valley recruiters to give you an unfair advantage in the job market.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 p-8 md:p-16 transition-all">
                    {!result && !isLoading ? (
                        <div
                            onDragEnter={onDrag}
                            onDragOver={onDrag}
                            onDragLeave={onDrag}
                            onDrop={onDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-4 border-dashed rounded-4xl p-16 text-center transition-all cursor-pointer group ${dragActive ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                        >
                            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />

                            <div className="w-24 h-24 bg-blue-600 text-white rounded-4xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/30 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            </div>

                            <h3 className="text-2xl font-black mb-3">{file ? file.name : "Drop your resume here"}</h3>
                            <p className="text-slate-500 font-medium">Supporting PDF and all Image formats up to 5MB</p>

                            {file && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
                                    className="mt-10 px-12 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-600/40 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center mx-auto space-x-3"
                                >
                                    <span>Launch Analysis</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                                </button>
                            )}
                        </div>
                    ) : isLoading ? (
                        <div className="py-24 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                            <div className="relative w-32 h-32 mx-auto">
                                <div className="absolute inset-0 border-[6px] border-slate-100 dark:border-slate-700 rounded-full"></div>
                                <div className="absolute inset-0 border-[6px] border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-4 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-3xl font-black">Scanning Architecture...</h3>
                                <div className="flex justify-center space-x-1">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0s]"></span>
                                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Optimizing for ATS Patterns</p>
                            </div>
                        </div>
                    ) : result && (
                        <div className="space-y-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
                            <div className="flex flex-col lg:flex-row items-center gap-12 pb-12 border-b border-slate-100 dark:border-slate-700">
                                <div className="relative w-48 h-48 shrink-0">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-700" />
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * result.score) / 100} className="text-blue-600 transition-all duration-1000 ease-out" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-slate-900 dark:text-white">{result.score}</span>
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">ATS Score</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 text-center lg:text-left">
                                    <h3 className="text-3xl font-black">Executive Summary</h3>
                                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed italic">"{result.summary}"</p>
                                    <button onClick={() => { setResult(null); setFile(null); }} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center lg:justify-start">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                        Review Another Version
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-4xl bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h4 className="text-xl font-black text-green-900 dark:text-green-400">Core Strengths</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {result.strengths.map((s, i) => (
                                            <li key={i} className="flex items-start text-slate-700 dark:text-slate-300">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 shrink-0"></span>
                                                <span className="font-medium">{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-8 rounded-4xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <h4 className="text-xl font-black text-amber-900 dark:text-amber-400">Areas for Growth</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {result.weaknesses.map((w, i) => (
                                            <li key={i} className="flex items-start text-slate-700 dark:text-slate-300">
                                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-3 shrink-0"></span>
                                                <span className="font-medium">{w}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-8 md:p-12 rounded-[2.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/30 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-3xl font-black">Optimization Roadmap</h4>
                                    <div className="hidden sm:block px-4 py-1 border-2 border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        AI Roadmap v2.4
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    {result.actionableSteps.map((step, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                                            <span className="text-4xl font-black opacity-20 mb-4">{i + 1}</span>
                                            <p className="font-bold leading-snug">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ResumeReviewer;
