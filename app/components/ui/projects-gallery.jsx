"use client";
import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'automl',
    category: '01 — Machine Learning & NLP',
    title: 'AI-Powered Text-to-AutoML Platform',
    image: '/1.png',
    description: 'AutoML platform that converts natural language descriptions into end-to-end machine learning workflows using NLP and automated model optimization. Features TPOT integration, automated model selection, and Flask REST APIs.',
    tags: ['NLP', 'AutoML', 'TPOT', 'PYTHON', 'FLASK', 'REST API'],
  },
  {
    id: 'football',
    category: '02 — Sports AI & Analytics',
    title: 'AI Football Match Analysis System',
    image: '/MV.jpeg',
    description: 'Advanced sports match data analytics using AI/ML models to generate performance insights, feature extraction, and predictive match outcome analysis.',
    tags: ['Machine Learning', 'Data Preprocessing', 'PYTHON', 'Pandas', 'Scikit-Learn'],
  },
  {
    id: 'booking',
    category: '03 — Full Stack Web',
    title: 'Online Ticket Booking Platform',
    image: '/Huawie.jpg',
    description: 'Full stack Flask and MySQL web application with secure user authentication, interactive ticket reservation, payment integration, and end-to-end database workflows.',
    tags: ['FLASK', 'MYSQL', 'PYTHON', 'JavaScript', 'REST API'],
  },
];

export default function ProjectsGallery({ isDarkMode, themeClasses }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setActive(project)}
            className="group relative overflow-hidden rounded-2xl text-left bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 p-6 pr-14 flex flex-col justify-between gap-3"
          >
            {/* Subtle animated background glow */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 30% 70%, #10b98133 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #6366f133 0%, transparent 60%)' }}
            />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">{project.category}</p>
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{project.title}</h3>
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} />
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className={`relative z-10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl ${themeClasses.card}`}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <X size={18} />
            </button>
            <div className="aspect-[16/9] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center"
              style={{ background: 'radial-gradient(ellipse at 30% 70%, #10b98122 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #6366f122 0%, transparent 60%), #111827' }}
            >
              <p className="text-4xl md:text-5xl font-black text-white/10 uppercase tracking-widest text-center px-8">{active.title}</p>
            </div>
            <div className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{active.category}</p>
              <h3 className={`text-2xl md:text-3xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{active.title}</h3>
              <p className={`${themeClasses.mutedText} leading-relaxed mb-6`}>{active.description}</p>
              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${themeClasses.mutedText}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
