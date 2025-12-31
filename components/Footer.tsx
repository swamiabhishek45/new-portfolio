
import React, { useState } from 'react';

const Footer: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <footer id="contact" className="py-24 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-20">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
                                Let's start a <span className="text-blue-600">conversation</span>.
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
                                I'm currently open to new opportunities and interesting projects. Reach out and I'll get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <a
                                href="mailto:abhishekswami1435@gmail.com"
                                className="group flex items-center space-x-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-100 dark:border-slate-800 transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-1">Send a direct email</h4>
                                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">abhishekswami1435@gmail.com</p>
                                </div>
                            </a>

                            <div className="flex items-center space-x-6 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-1">Location</h4>
                                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100">Latur, Maharashtra, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {isSuccess && (
                            <div className="absolute inset-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm flex items-center justify-center rounded-[2.5rem] animate-in fade-in duration-500 border border-green-200 dark:border-green-900/30 shadow-2xl">
                                <div className="text-center p-8 space-y-6">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black">Success!</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Your message is on its way to abhishekswami1435@gmail.com.</p>
                                    </div>
                                    <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Send Another</button>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800/40 p-10 rounded-[2.5rem] space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        placeholder="Enter name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Your Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        placeholder="name@email.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center space-x-3 group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
                    <div className="flex items-center space-x-2 font-bold mb-6 md:mb-0">
                        <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">AS</span>
                        <span className="text-slate-800 dark:text-slate-100">Abhishek Portfolio © 2025</span>
                    </div>
                    <div className="flex space-x-8 text-slate-500 font-medium">
                        <a href="https://github.com/swamiabhishek45" className="hover:text-blue-600 transition-colors">GitHub</a>
                        <a href="https://www.linkedin.com/in/swamiabhishek45/" className="hover:text-blue-600 transition-colors">LinkedIn</a>
                        <a href="https://x.com/swamiabhishek45" className="hover:text-blue-600 transition-colors">X / Twitter</a>
                    
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
