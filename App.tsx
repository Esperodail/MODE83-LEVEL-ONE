/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Gamepad2, Code, Palette, Rocket, Download, ExternalLink } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import { Project, TrainingSession, Section } from './types';

// Training Data
const SESSIONS: TrainingSession[] = [
  {
    id: 's1',
    title: 'Session 01: Design & Assets',
    duration: '400 heures',
    description: 'Immersion dans l\'univers du Game Design et de la création d\'assets 2D/3D. Apprenez à concevoir des mondes cohérents et des interfaces intuitives.',
    modules: ['Game Design Document', 'UI/UX Design', 'Modélisation 3D (Blender)', 'Texturing & Shaders']
  },
  {
    id: 's2',
    title: 'Session 02: Développement & Code',
    duration: '400 heures',
    description: 'Le coeur de la formation. Maîtrisez les moteurs de jeu et le scripting pour donner vie à vos concepts les plus fous.',
    modules: ['Moteur Unity / Unreal Engine', 'Programmation C# / Blueprints', 'Physique & IA', 'Optimisation Performance']
  },
  {
    id: 's3',
    title: 'Session 03: Production & Portfolio',
    duration: '400 heures',
    description: 'Finalisation de votre projet majeur, publication sur les stores et préparation à l\'insertion professionnelle dans l\'industrie du jeu vidéo.',
    modules: ['Gestion de Projet (Agile)', 'Publication (itch.io, Steam)', 'Soft Skills & Portfolio', 'Stage en entreprise']
  }
];

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "Dragy's Island",
    author: "InkLink83",
    description: "Un jeu d'aventure coloré développé lors de la session LEVEL ONE. Explorez une île mystérieuse remplie de défis et de secrets.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    itchIoUrl: "https://inklink83.itch.io/dragys-island"
  },
  {
    id: 'p2',
    title: "Level Desert",
    author: "DB83",
    description: "Survivez dans un environnement hostile et désertique. Un projet mettant l'accent sur les mécaniques de survie et l'ambiance sonore immersive.",
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop",
    itchIoUrl: "https://db83.itch.io/level-desert"
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">MODE83</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Programme', 'Réalisations', 'Vidéos'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <a 
          href="https://mode83.net/site/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer"
          data-hover="true"
        >
          Visiter Mode83
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Programme', 'Réalisations', 'Vidéos'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <a 
              href="https://mode83.net/site/"
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Visiter Mode83
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#a8fbd3] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span>Formation CDUI</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4fb7b3] rounded-full animate-pulse"/>
            <span>Level One</span>
          </motion.div>

          <div className="relative w-full flex justify-center items-center">
            <GradientText 
              text="LEVEL ONE" 
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
            <motion.div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-white/5 blur-[40px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 6, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-2xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
            Maîtrisez le développement et la création de jeux vidéo avec Mode83.
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4">
                    MODE83 LEVEL ONE <span className="text-black text-2xl md:text-4xl">●</span> 
                    GAME DEV TRAINING <span className="text-black text-2xl md:text-4xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* PROGRAM SECTION */}
      <section id="programme" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase mb-4">Le Programme</h2>
            <p className="text-[#a8fbd3] font-mono uppercase tracking-widest text-sm md:text-base">3 Sessions Intensives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SESSIONS.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md hover:border-[#4fb7b3]/50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#4fb7b3]/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {i === 0 ? <Palette className="w-8 h-8 text-[#4fb7b3]" /> : i === 1 ? <Code className="w-8 h-8 text-[#4fb7b3]" /> : <Rocket className="w-8 h-8 text-[#4fb7b3]" />}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{session.title}</h3>
                <p className="text-sm font-mono text-[#a8fbd3] mb-6">{session.duration}</p>
                <p className="text-gray-300 mb-8 leading-relaxed">{session.description}</p>
                <ul className="space-y-3">
                  {session.modules.map((module, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 bg-[#4fb7b3] rounded-full" />
                      {module}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="réalisations" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Les <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Projets</span>
            </h2>
            <p className="text-gray-400 max-w-md mt-6 md:mt-0 text-right">
              Découvrez les jeux créés par nos étudiants. Jouables directement dans votre navigateur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS SECTION */}
      <section id="vidéos" className="relative z-10 py-20 md:py-32 bg-black/40 backdrop-blur-lg border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase mb-4">Vidéos</h2>
            <p className="text-[#a8fbd3] font-mono uppercase tracking-widest text-sm md:text-base">Coulisses & Présentations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video bg-black/50 rounded-3xl overflow-hidden border border-white/10 relative group">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
                title="Présentation Level One"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video bg-black/50 rounded-3xl overflow-hidden border border-white/10 relative group">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
                title="Projets Etudiants"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">MODE83</div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>© 2025 MODE83 - LEVEL ONE</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://mode83.net/site/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Site Officiel
            </a>
            <a href="https://x.com/GoogleAIStudio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Twitter
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal / Playable Game */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[90vh] bg-[#1a1b3b] border border-white/10 overflow-hidden flex flex-col shadow-2xl shadow-[#4fb7b3]/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header Info */}
              <div className="p-6 md:p-8 bg-black/40 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-2xl md:text-4xl font-heading font-bold uppercase text-white">{selectedProject.title}</h3>
                  <p className="text-[#a8fbd3] font-mono text-sm uppercase tracking-widest">Par {selectedProject.author}</p>
                </div>
                <div className="flex gap-4">
                  {selectedProject.downloadUrl && (
                    <a 
                      href={selectedProject.downloadUrl}
                      className="flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors border border-white/20"
                    >
                      <Download className="w-4 h-4" /> Télécharger
                    </a>
                  )}
                  <a 
                    href={selectedProject.itchIoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#a8fbd3] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> itch.io
                  </a>
                </div>
              </div>

              {/* Game Embed / Iframe */}
              <div className="flex-1 bg-black relative">
                <iframe 
                  src={`${selectedProject.itchIoUrl.replace('itch.io', 'itch.io/embed-upload')}`}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={selectedProject.title}
                ></iframe>
                
                {/* Fallback/Overlay if iframe is blocked or needs interaction */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                   <p className="text-white/50 text-xs font-mono">Chargement du jeu...</p>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-50">
                <button
                  onClick={(e) => { e.stopPropagation(); navigateProject('prev'); }}
                  className="p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                  data-hover="true"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateProject('next'); }}
                  className="p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                  data-hover="true"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;