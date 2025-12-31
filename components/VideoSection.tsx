
import React from 'react';

const VideoSection: React.FC = () => {
    return (
        <section id="video" className="py-24 px-6 bg-slate-900 text-white text-center">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Why Should You Hire Me?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Communication is key. Here's a 90-second glimpse into my personality, drive, and vision for the future of tech.
                    </p>
                </div>

                <div className="relative group max-w-2xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
                    {/* Placeholder for real video */}
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4.5 3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .757.429l8.715-6.5a.5.5 0 0 0 0-.858l-8.715-6.5A.5.5 0 0 0 4.5 3z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium">Click to Play Introduction</p>
                        </div>
                    </div>
                    <video
                        className="absolute inset-0 w-full h-full "
                        src="/me.mp4"
                        controls
                        autoPlay
                        muted
                        loop
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
