
import React, { useEffect, useState } from 'react';
import { mockApiService } from '../services/mockApiService';
import { Certification } from '../types/types';

const Certifications: React.FC = () => {
    const [certs, setCerts] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        mockApiService.getCertifications()
            .then(data => {
                setCerts(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="certifications" className="py-24 px-6 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold">Certifications</h2>
                        <p className="text-slate-500 dark:text-slate-400">Validated expertise from industry leaders.</p>
                    </div>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 hidden md:block mx-8 mb-4"></div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certs.map(cert => (
                            <a
                                key={cert.id}
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center space-x-4 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
                            >
                                <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2 group-hover:scale-110 transition-transform">
                                    <img src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm leading-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors truncate">
                                        {cert.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cert.issuer}</p>
                                    <div className="flex items-center mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {cert.issueDate}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certifications;
