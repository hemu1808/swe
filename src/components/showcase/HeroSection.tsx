import React from "react";

export function HeroSection() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center px-4 relative">
            <div className="text-center z-10 fade-in cursor-default">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-none drop-shadow-2xl">
                    A Journey Through <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Code & Systems</span>
                </h1>
                <p className="text-lg md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto">
                    Scroll down to dive into the architecture.
                </p>
            </div>
        </div>
    );
}
