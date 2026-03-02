/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Layout, 
  Globe, 
  Server, 
  ChevronRight, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-electric to-blue-electric rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)] rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="font-black text-black text-2xl">W</span>
          </div>
          <span className="text-3xl font-black tracking-tighter uppercase">Web-<span className="text-cyan-electric">Nova</span></span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {['Inicio', 'Contacto'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-cyan-electric transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="#contacto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
          >
            Hablemos
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-[88px] bg-[#050505] z-40 p-8"
          >
            <div className="flex flex-col gap-8">
              {['Inicio', 'Contacto'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-4xl font-black uppercase tracking-tighter text-white/40 hover:text-cyan-electric"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-cyan-electric text-center text-black font-black rounded-2xl text-xl uppercase tracking-widest">
                Contáctanos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Dynamic Aurora Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-cyan-electric/15 rounded-full blur-[160px]"
      />
      <motion.div
        animate={{
          scale: [1.5, 1, 1.5],
          x: ['20%', '-20%', '20%'],
          y: ['10%', '-10%', '10%'],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] bg-blue-electric/15 rounded-full blur-[180px]"
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      {/* Grain / Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
  );
};

const Marquee = () => {
  return (
    <div className="py-12 overflow-hidden border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20 items-center"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-20">
            <span className="text-6xl font-black uppercase tracking-tighter text-white/10">Web-Nova Bolivia</span>
            <div className="w-4 h-4 rounded-full bg-cyan-electric shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
            <span className="text-6xl font-black uppercase tracking-tighter text-white/10 italic">Diseño de Vanguardia</span>
            <div className="w-4 h-4 rounded-full bg-blue-electric shadow-[0_0_15px_rgba(0,102,255,0.5)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-32 pb-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black tracking-[0.3em] uppercase mb-12"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse" />
            Sello de Calidad • La Paz, Bolivia
          </motion.div>
          
          <h1 className="text-7xl md:text-[12rem] font-black tracking-[-0.05em] mb-12 leading-[0.8] uppercase">
            ESTILO <br />
            <span className="text-gradient">DIGITAL</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/40 max-w-3xl mx-auto mb-16 leading-tight font-light tracking-tight">
            No diseñamos páginas, creamos el <span className="text-white">prestigio digital</span> de tu marca con un estándar global inigualable.
          </p>
          
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-6 bg-cyan-electric text-black font-black rounded-2xl text-xl uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(0,242,255,0.2)]"
          >
            Empezar Proyecto <ArrowRight size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const Essence = () => {
  return (
    <section className="py-48 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Nuestra <br /><span className="text-white/20">Esencia</span>
            </h2>
            <p className="text-2xl text-white/40 leading-relaxed font-light">
              La excelencia no es un acto, es un hábito. En Web-Nova, cada pixel tiene un propósito y cada interacción cuenta una historia de éxito.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8">
            {[
              { title: "Exclusividad", desc: "Cada diseño es una pieza única de arte digital." },
              { title: "Impacto", desc: "Interfaces que cautivan y convierten desde el primer segundo." },
              { title: "Calidad", desc: "El estándar de La Paz proyectado al mundo entero." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 rounded-[40px] border-white/5 hover:border-cyan-electric/30 transition-colors group"
              >
                <h3 className="text-3xl font-black mb-4 group-hover:text-cyan-electric transition-colors uppercase tracking-tighter">{item.title}</h3>
                <p className="text-white/40 text-lg font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contacto" className="py-48 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-9xl font-black mb-12 leading-[0.8] uppercase tracking-tighter">
              ¿LISTO <br />PARA <br /><span className="text-gradient">BRILLAR?</span>
            </h2>
            
            <div className="space-y-12">
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-cyan-electric group-hover:bg-cyan-electric group-hover:text-black transition-all duration-500 rotate-3 group-hover:rotate-0">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Email Directo</h4>
                  <a href="mailto:k4rn3r0@gmail.com" className="text-3xl font-bold hover:text-cyan-electric transition-colors tracking-tight">k4rn3r0@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-cyan-electric group-hover:bg-cyan-electric group-hover:text-black transition-all duration-500 -rotate-3 group-hover:rotate-0">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-2">WhatsApp Directo</h4>
                  <a href="tel:+59167046521" className="text-3xl font-bold hover:text-cyan-electric transition-colors tracking-tight">+591 67046521</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-16 rounded-[60px] shadow-2xl relative border-white/5"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-electric/10 rounded-full blur-[80px]" />
            <form className="space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Tu Identidad</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 focus:border-cyan-electric outline-none transition-all text-lg font-light" placeholder="Nombre completo" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Tu Contacto</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 focus:border-cyan-electric outline-none transition-all text-lg font-light" placeholder="email@ejemplo.com" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Tu Visión</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 focus:border-cyan-electric outline-none transition-all resize-none text-lg font-light" placeholder="Cuéntanos brevemente..."></textarea>
              </div>
              <button className="w-full py-6 bg-white text-black font-black rounded-[24px] hover:bg-cyan-electric transition-all text-xl uppercase tracking-widest shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                Enviar Solicitud
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-cyan-electric rounded-2xl flex items-center justify-center rotate-3">
            <span className="font-black text-black text-2xl">W</span>
          </div>
          <span className="text-4xl font-black tracking-tighter uppercase">Web-<span className="text-cyan-electric">Nova</span></span>
        </div>
        
        <div className="text-center md:text-right space-y-4">
          <p className="text-white/40 text-lg font-medium">
            © {new Date().getFullYear()} Web-Nova Bolivia.
          </p>
          <div className="flex gap-8 justify-center md:justify-end">
            {['LinkedIn', 'Instagram', 'Behance'].map(social => (
              <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-cyan-electric transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="font-sans antialiased selection:bg-cyan-electric/30 selection:text-white">
      <BackgroundAnimation />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Essence />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
