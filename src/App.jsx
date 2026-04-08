import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';

/* ─── Brand Data ─────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: 'UNIVERSAL Ca-B-Zn',
    tag: 'Fertilizante Premium',
    desc: 'Previene y corrige deficiencias de Ca-B-Zn. Su formulación con gluconatos logra un efecto mucho más rápido y disponible para la planta.',
    color: '#1b4999',
    accent: '#97c822',
    icon: '🌿',
    img: '/photos/pequeños.jpg',
    ficha: '/fichas-tecnicas/FT-UNIVERSAL-CaBZn-2026.pdf',
  },
  {
    id: 2,
    name: 'AGRO MAG',
    tag: 'Fuente de Magnesio',
    desc: 'Fertilizante fuente de Magnesio quelatado con gluconatos de alta estabilidad. Aplicación al suelo y/o foliar.',
    color: '#97c822',
    accent: '#1b4999',
    icon: '🌱',
    img: '/photos/agromag-jpg.jpg',
    ficha: '/fichas-tecnicas/FT-AGRO-MAG-2026.pdf',
  },
  {
    id: 3,
    name: 'NEW GREEN',
    tag: 'Mejora de Cultivos',
    desc: 'Mejora calidad y llenado de cultivos de exportación. Enriquecido con citoquininas 600 ppm. Activa el metabolismo celular.',
    color: '#1b4999',
    accent: '#97c822',
    icon: '🌾',
    img: '/photos/new-green-jpg.jpg',
    ficha: '/fichas-tecnicas/FT-NEW-GREEN-2026.pdf',
  },
  {
    id: 4,
    name: 'PERFEKTO',
    tag: 'Bioestimulante Foliar',
    desc: 'Aporta potasio y fósforo ligados a moléculas orgánicas. Con gluconato de potasio, ácidos carboxílicos y hormonas que maximizan el rendimiento.',
    color: '#97c822',
    accent: '#1b4999',
    icon: '🌻',
    img: '/photos/perfekto-jpg.jpg',
    ficha: '/fichas-tecnicas/FT-PERFEKTO-2026.pdf',
  },
  {
    id: 5,
    name: 'AGRO 30',
    tag: 'Acondicionador de Suelos',
    desc: 'Penetra los perfiles del suelo. Aumenta el CIC, optimiza el pH y hace más eficiente la nutrición de la planta.',
    color: '#1b4999',
    accent: '#97c822',
    icon: '🪴',
    img: '/photos/agro-30.png',
    ficha: '/fichas-tecnicas/FT-AGRO-30-2026.pdf',
  },
  {
    id: 6,
    name: 'AGRO CAL MAG',
    tag: 'Enmienda Agrícola',
    desc: 'Corrección y mejora de las condiciones físicas, químicas y biológicas del suelo. Mejora la calidad en cultivos de exportación y/o nacionales.',
    color: '#97c822',
    accent: '#1b4999',
    icon: '🧪',
    img: '/photos/agro-cal-mag.png',
    ficha: '/fichas-tecnicas/FT-AGRO-CAL-MAG-2026.pdf',
  },
  {
    id: 7,
    name: 'AGRO HUMITA',
    tag: 'Ácidos Húmicos y Fúlvicos',
    desc: 'Fuente concentrada de ácidos húmicos y fúlvicos. Mejora la estructura del suelo, activa la microbiología y potencia la absorción de nutrientes.',
    color: '#1b4999',
    accent: '#97c822',
    icon: '🌍',
    img: '/photos/agro-humita-jpg.jpg',
    ficha: '/fichas-tecnicas/FT-AGRO-HUMITA-2026.pdf',
  },
  {
    id: 8,
    name: 'MANTENIMIENTO SOLANACEAS',
    tag: 'Fórmula Especial',
    desc: 'Fórmula especial diseñada para el mantenimiento de cultivos de solanáceas. Equilibra la nutrición para un desarrollo óptimo y sostenido.',
    color: '#97c822',
    accent: '#1b4999',
    icon: '🍅',
    img: '/photos/mantenimiento-solanaceas.jpg',
    ficha: '/fichas-tecnicas/FT-MANTENIMIENTO-SOLANACEAS-2026.pdf',
  },
  {
    id: 9,
    name: 'LLENADO SOLANACEAS',
    tag: 'Fórmula Especial',
    desc: 'Fórmula especial para la etapa de llenado en cultivos de solanáceas. Maximiza el tamaño y calidad del fruto en el momento clave del ciclo.',
    color: '#1b4999',
    accent: '#97c822',
    icon: '🫑',
    img: '/photos/llenado-solanaceas.jpg',
    ficha: '/fichas-tecnicas/FT-LLENADO-SOLANACEAS-2026.pdf',
  },
  {
    id: 10,
    name: 'SOLANACEAS 10-30-10',
    tag: 'Fórmula Especial',
    desc: 'Fórmula balanceada 10-30-10 para solanáceas. Alto fósforo para estimular la floración, el cuaje y el desarrollo radicular en etapas críticas.',
    color: '#97c822',
    accent: '#1b4999',
    icon: '🌿',
    img: '/photos/solanaceas-10-30-10.jpg',
    ficha: '/fichas-tecnicas/FT-SOLANACEAS-10-30-10-2026.pdf',
  },
];

const values = [
  { icon: '💡', title: 'Innovación Aplicada', desc: 'Tecnología al servicio del campo colombiano.' },
  { icon: '♻️', title: 'Sostenibilidad Responsable', desc: 'Prácticas que cuidan el medio ambiente.' },
  { icon: '🏆', title: 'Calidad y Eficiencia', desc: 'Estándares internacionales en cada producto.' },
  { icon: '🤝', title: 'Compromiso con el Productor', desc: 'Tu rentabilidad es nuestra misión.' },
  { icon: '🌾', title: 'Desarrollo Rural', desc: 'Impulsando el campo colombiano hacia el futuro.' },
];

/* ─── Reveal on Scroll ───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Floating Particles ─────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 30 + (i * 7.3) % 120,
  left: (i * 17.3) % 100,
  top: (i * 23.7) % 100,
  delay: (i * 1.1) % 6,
  duration: 6 + (i * 0.9) % 8,
  color: i % 3 === 0 ? '#97c822' : i % 3 === 1 ? '#1b4999' : '#ffffff',
}));

function FloatingParticles() {
  const particles = PARTICLES;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            opacity: 0.07,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Photo Carousel ─────────────────────────────────────────────── */
const carouselPhotos = [
  { src: '/photos/ESR_7845.jpg', alt: 'Universal Agro en feria' },
  { src: '/photos/ESR_7849.jpg', alt: 'Cultivos' },
  { src: '/photos/ESR_7850.jpg', alt: 'Cosecha' },
  { src: '/photos/ESR_7856.jpg', alt: 'Campo' },
  { src: '/photos/ESR_7863.jpg', alt: 'Trabajo en campo' },
  { src: '/photos/IMG_5755.jpg', alt: 'Panorámica' },
  { src: '/photos/IMG_5760.jpg', alt: 'Cultivo 1' },
  { src: '/photos/IMG_5761.jpg', alt: 'Cultivo 2' },
  { src: '/photos/IMG_5763.jpg', alt: 'Cultivo 3' },
  { src: '/photos/IMG_5775.jpg', alt: 'Cultivo 4' },
  { src: '/photos/IMG_5789.jpg', alt: 'Cultivo 5' },
  { src: '/photos/IMG_5792.jpg', alt: 'Cultivo 6' },
  { src: '/photos/IMG_5795.jpg', alt: 'Cultivo 7' },
  { src: '/photos/IMG_5801.jpg', alt: 'Cultivo 8' },
  { src: '/photos/IMG_5806.jpg', alt: 'Cultivo 9' },
  { src: '/photos/IMG_5813.jpg', alt: 'Cultivo 10' },
  { src: '/photos/IMG_5823.jpg', alt: 'Cultivo 11' },
  { src: '/photos/IMG_5828.jpg', alt: 'Cultivo 12' },
  { src: '/photos/IMG_5836.jpg', alt: 'Cultivo 13' },
  { src: '/photos/IMG_5845.jpg', alt: 'Cultivo 14' },
  { src: '/photos/IMG_5857.jpg', alt: 'Cultivo 15' },
  { src: '/photos/IMG_5862.jpg', alt: 'Cultivo 16' },
  { src: '/photos/IMG_5868.jpg', alt: 'Cultivo 17' },
  { src: '/photos/IMG_5878.jpg', alt: 'Cultivo 18' },
  { src: '/photos/IMG_5889.jpg', alt: 'Cultivo 19' },
  { src: '/photos/IMG_5896.jpg', alt: 'Cultivo 20' },
  { src: '/photos/IMG_5902.jpg', alt: 'Cultivo 21' },
  { src: '/photos/IMG_7150.jpg', alt: 'Instalaciones' },
  { src: '/photos/IMG_7151.jpg', alt: 'Productos' },
  { src: '/photos/IMG_7152.jpg', alt: 'Equipo' },
  { src: '/photos/IMG_7153.jpg', alt: 'Campo 2' },
  { src: '/photos/IMG_7155.jpg', alt: 'Agricultura' },
  { src: '/photos/IMG_7157.jpg', alt: 'Trabajo 1' },
  { src: '/photos/IMG_7158.jpg', alt: 'Trabajo 2' },
  { src: '/photos/IMG_7161.jpg', alt: 'Trabajo 3' },
  { src: '/photos/IMG_7165.jpg', alt: 'Trabajo 4' },
];

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = carouselPhotos.length;
  const visibleCount = 3;

  const go = (dir) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + dir + total) % total);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  // Autoplay every 3.5 s; pause on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((prev) => (prev + 1) % total);
      setTimeout(() => setIsTransitioning(false), 400);
    }, 3500);
    return () => clearInterval(id);
  }, [paused, total]);

  // Get 3 consecutive photos starting at current
  const visible = Array.from({ length: visibleCount }, (_, i) => carouselPhotos[(current + i) % total]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
        {visible.map((photo, i) => (
          <div
            key={`${current}-${i}`}
            className={`rounded-2xl overflow-hidden transition-all duration-400 ${i !== 0 ? 'hidden md:block' : ''} ${i === 1 ? 'md:scale-105 shadow-2xl' : 'opacity-90'}`}
            style={{ aspectRatio: '4/3', transition: 'opacity 0.4s ease, transform 0.4s ease' }}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-12 h-12 rounded-full bg-agro-blue text-white flex items-center justify-center shadow-xl hover:bg-agro-blue-dark transition-all hover:scale-110 z-10"
        aria-label="Anterior"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-12 h-12 rounded-full bg-agro-blue text-white flex items-center justify-center shadow-xl hover:bg-agro-blue-dark transition-all hover:scale-110 z-10"
        aria-label="Siguiente"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(total / visibleCount) }, (_, i) => (
          <button
            key={i}
            onClick={() => { if (!isTransitioning) { setIsTransitioning(true); setCurrent(i * visibleCount); setTimeout(() => setIsTransitioning(false), 400); } }}
            className={`rounded-full transition-all duration-300 ${Math.floor(current / visibleCount) === i ? 'w-8 h-2.5 bg-agro-blue' : 'w-2.5 h-2.5 bg-agro-blue/30 hover:bg-agro-blue/60'}`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-center font-slogan text-gray-400 text-sm mt-3">
        {current + 1} – {Math.min(current + visibleCount, total)} de {total}
      </p>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-1'
          : 'bg-transparent py-2'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0">
            <img
              src={scrolled ? '/logos/logo-1.png' : '/logos/mesa-de-trabajo-3.png'}
              alt="Universal Agro"
              className="h-36 md:h-44 w-auto transition-all duration-300"
              style={{ mixBlendMode: scrolled ? 'multiply' : 'normal' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['inicio','nosotros','productos','valores','contacto'].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className={`text-sm font-slogan font-medium capitalize tracking-wide transition-colors duration-200 ${
                  scrolled
                    ? 'text-gray-600 hover:text-agro-blue'
                    : 'text-white/85 hover:text-agro-green'
                }`}
              >
                {s}
              </a>
            ))}
            <a
              href="#contacto"
              className="px-6 py-2.5 rounded-full bg-agro-green text-agro-blue font-brand text-sm tracking-wide hover:bg-agro-green-dark transition-all shadow-lg shadow-agro-green/30 hover:shadow-agro-green/50 hover:-translate-y-0.5"
            >
              Contáctanos
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${scrolled ? 'text-agro-blue' : 'text-white'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-agro-blue text-white px-6 py-6 flex flex-col gap-5 shadow-2xl">
            {['inicio','nosotros','productos','valores','contacto'].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setMobileOpen(false)}
                className="font-slogan capitalize text-lg border-b border-white/10 pb-4 hover:text-agro-green transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        id="inicio"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d2b5e 0%, #1b4999 50%, #112f66 100%)' }}
      >
        <FloatingParticles />

        {/* Huge watermark globe */}
        <div
          className="absolute -right-40 -top-40 opacity-[0.08] pointer-events-none select-none"
          style={{ animation: 'spin 40s linear infinite' }}
        >
          <img src="/logos/logo-9.png" alt="" className="w-[900px] h-[900px] object-contain"
            onError={(e) => { e.target.src = '/logos/logo-1.png'; }} />
        </div>
        <div
          className="absolute -left-32 -bottom-32 opacity-[0.06] pointer-events-none select-none"
          style={{ animation: 'spin 60s linear infinite reverse' }}
        >
          <img src="/logos/logo-9.png" alt="" className="w-[700px] h-[700px] object-contain"
            onError={(e) => { e.target.src = '/logos/logo-1.png'; }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-32">
          {/* Main Logo */}
          <div className="flex justify-center mb-0" style={{ animation: 'slideUp 0.8s ease-out forwards' }}>
            <img
              src="/logos/mesa-de-trabajo-3.png"
              alt="Universal Agro"
              className="h-52 md:h-64 w-auto"
            />
          </div>

          {/* Headline */}
          <div style={{ animation: 'slideUp 0.8s 0.2s ease-out both' }}>
            <h1 className="font-brand text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-4 tracking-tight">
              Universally<br />
              <span className="text-agro-green" style={{ WebkitTextStroke: '0px' }}>
                different.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div style={{ animation: 'slideUp 0.8s 0.4s ease-out both' }}>
            <p className="font-slogan text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
              Soluciones integrales, innovación y compromiso real para el campo colombiano.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animation: 'slideUp 0.8s 0.6s ease-out both' }}
          >
            <a
              href="#productos"
              className="px-8 py-4 rounded-full bg-agro-green text-agro-blue font-brand text-base tracking-wider hover:bg-agro-green-light transition-all glow-green hover:-translate-y-1 flex items-center gap-2"
            >
              Ver Catálogo <ArrowRight size={18} />
            </a>
            <a
              href="#nosotros"
              className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-slogan text-base hover:border-agro-green hover:text-agro-green transition-all"
            >
              Conoce Más
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
             style={{ animation: 'float 3s ease-in-out infinite' }}>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────── */}
      <div className="bg-agro-green overflow-hidden py-5 relative">
        <div className="marquee-track">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-brand text-agro-blue text-2xl tracking-widest uppercase mx-16 whitespace-nowrap">
              Universally Different &nbsp;&nbsp;•&nbsp;&nbsp; Universal Agro &nbsp;&nbsp;•&nbsp;&nbsp; Innovación Agrícola &nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── VIDEO ───────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0b1e45 0%, #1b4999 50%, #0d2454 100%)' }}>
        {/* Watermark */}
        <div className="absolute -right-40 -bottom-40 opacity-[0.06] pointer-events-none select-none"
          style={{ animation: 'spin 50s linear infinite' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[700px] h-[700px] object-contain"
            onError={(e) => { e.target.src = '/logos/logo-1.png'; }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="font-slogan text-agro-green text-sm uppercase tracking-widest mb-3">Universal Agro en Acción</p>
              <h2 className="font-brand text-4xl md:text-5xl text-white leading-tight">
                Innovación en el <span className="text-stroke-green font-brand">Campo</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(151, 200, 34, 0.2), 0 30px 80px rgba(0,0,0,0.5)' }}>
              {/* Green border accent */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                style={{ border: '2px solid rgba(151,200,34,0.4)' }} />
              <iframe
                className="w-full aspect-video"
                src="https://drive.google.com/file/d/12hedPXS627SzkCEES11XIQ9yBVR6zft6/preview"
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section id="nosotros" className="py-32 bg-white relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-agro-green-pale rounded-full blur-3xl opacity-60 pointer-events-none" />
        {/* Spinning logo watermarks – blue tint on white */}
        <div className="absolute -left-32 -bottom-20 opacity-[0.07] pointer-events-none select-none"
          style={{ animation: 'spin 50s linear infinite' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[700px] h-[700px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>
        <div className="absolute -right-32 -top-20 opacity-[0.05] pointer-events-none select-none"
          style={{ animation: 'spin 70s linear infinite reverse' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[500px] h-[500px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left: Visual */}
            <Reveal>
              <div className="relative">
                {/* Big background number */}
                <div
                  className="absolute -top-6 -left-6 font-brand text-[200px] leading-none text-agro-blue opacity-[0.04] pointer-events-none select-none"
                >
                  UA
                </div>

                {/* Logo showcase card */}
                <div className="relative bg-agro-blue rounded-[2.5rem] p-12 shadow-2xl glow-blue overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-agro-green rounded-full blur-2xl" />
                  </div>
                  <img
                    src="/logos/mesa-de-trabajo-3.png"
                    alt="Universal Agro"
                    className="w-full max-w-md mx-auto relative z-10"
                  />
                  <div className="mt-8 text-center relative z-10">
                    <p className="font-slogan text-white/60 text-sm tracking-widest uppercase">Est. Colombia</p>
                    <p className="font-brand text-agro-green text-3xl mt-1">2026</p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-agro-green rounded-2xl p-6 shadow-2xl">
                  <div className="font-brand text-agro-blue text-5xl leading-none">15+</div>
                  <div className="font-slogan text-agro-blue text-xs uppercase tracking-wide mt-1">Años en el campo</div>
                </div>
              </div>
            </Reveal>

            {/* Right: Text */}
            <div>
              <Reveal delay={100}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-agro-blue text-agro-green font-brand text-xs tracking-widest uppercase mb-6">
                  Quiénes somos
                </span>
              </Reveal>

              <Reveal delay={150}>
                <h2 className="font-brand text-5xl md:text-6xl text-agro-blue leading-tight mb-8">
                  El aliado del<br />
                  <span className="text-agro-green">campo colombiano</span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-slogan text-gray-600 text-lg leading-relaxed mb-8">
                  <strong className="text-agro-blue font-brand">Universal Agro</strong> es una empresa especializada en
                  la producción y comercialización de insumos agrícolas y soluciones para la agroindustria,
                  comprometida con el fortalecimiento del campo colombiano mediante productos de alta calidad,
                  acompañamiento técnico y un enfoque sostenible.
                </p>
              </Reveal>

              <Reveal delay={250}>
                <div className="bg-agro-blue/5 border-l-4 border-agro-green rounded-r-2xl p-6 mb-8">
                  <p className="font-slogan text-agro-blue text-base italic leading-relaxed">
                    "Para el año 2030, ser la compañía referente a nivel nacional en soluciones agrícolas
                    y agroindustriales."
                  </p>
                  <span className="font-brand text-agro-green text-xs tracking-widest uppercase mt-3 block">
                    — Nuestra Visión 2030
                  </span>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-agro-blue text-white font-brand tracking-wide hover:bg-agro-blue-light transition-all hover:-translate-y-1 shadow-lg shadow-agro-blue/30"
                >
                  Habla con un asesor <ArrowRight size={18} />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────────────────── */}
      <section id="productos" className="py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f8fbf0 0%, #eaf4f8 50%, #f0f5ff 100%)' }}>
        {/* Spinning logo watermarks – blue tint on light bg */}
        <div className="absolute -right-40 top-1/4 opacity-[0.07] pointer-events-none select-none"
          style={{ animation: 'spin 55s linear infinite reverse' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[750px] h-[750px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>
        <div className="absolute -left-40 bottom-1/4 opacity-[0.05] pointer-events-none select-none"
          style={{ animation: 'spin 65s linear infinite' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[550px] h-[550px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-agro-green text-agro-blue font-brand text-xs tracking-widest uppercase mb-6">
                Catálogo Estrella
              </span>
              <h2 className="font-brand text-5xl md:text-7xl text-agro-blue leading-tight">
                Fórmulas<br />
                <span className="text-stroke-blue font-brand">Avanzadas</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div
                  className="group relative rounded-3xl overflow-hidden cursor-pointer hover-lift"
                  style={{ background: p.color }}
                  onClick={() => setActiveProduct(activeProduct === p.id ? null : p.id)}
                >
                  {/* Top area */}
                  <div className="p-8">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-brand tracking-widest uppercase mb-4"
                      style={{ background: p.accent, color: p.accent === '#1b4999' ? 'white' : '#1b4999' }}
                    >
                      {p.tag}
                    </div>

                    {p.img ? (
                      <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                        {p.icon}
                      </div>
                    )}

                    <h3 className="font-brand text-3xl text-white leading-tight mb-4">{p.name}</h3>

                    <p className={`font-slogan text-sm leading-relaxed transition-all duration-500 ${
                      activeProduct === p.id ? 'text-white/90 max-h-40' : 'text-white/60 max-h-0 overflow-hidden md:max-h-40 md:text-white/60'
                    }`}>
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex flex-col" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <a
                      href={p.ficha}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-8 py-3 flex items-center justify-between border-b border-white/10"
                    >
                      <span className="font-slogan text-white/60 text-xs uppercase tracking-widest">Ficha Técnica</span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                        style={{ background: p.accent }}
                      >
                        <ArrowRight size={14} color={p.color} />
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/573144591627?text=${encodeURIComponent(`Hola, me interesa el producto ${p.name}. ¿Me pueden dar más información?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-8 py-3 flex items-center justify-between hover:bg-white/10 transition-colors"
                    >
                      <span className="font-slogan text-white/60 text-xs uppercase tracking-widest">Consultar por WhatsApp</span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#25D366' }}>
                        <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </div>
                    </a>
                  </div>

                  {/* Decorative circle */}
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-80 rounded-full opacity-20 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30 pointer-events-none"
                    style={{ background: p.accent }}
                  />
                </div>
              </Reveal>
            ))}

            {/* CTA Card */}
            <Reveal delay={products.length * 80}>
              <div className="rounded-3xl border-2 border-dashed border-agro-blue/30 p-8 flex flex-col items-center justify-center text-center hover-lift cursor-pointer group min-h-[200px]"
                onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}>
                <div className="w-16 h-16 rounded-full bg-agro-green/20 flex items-center justify-center mb-4 group-hover:bg-agro-green transition-colors">
                  <ArrowRight size={24} className="text-agro-blue" />
                </div>
                <h3 className="font-brand text-agro-blue text-xl mb-2">¿Necesitas otro producto?</h3>
                <p className="font-slogan text-gray-500 text-sm">Nuestros asesores tienen toda la línea disponible.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────────────────── */}
      <section id="valores" className="py-32 bg-agro-blue relative overflow-hidden noise-overlay">
        {/* Watermark logos */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none"
          style={{ animation: 'spin 50s linear infinite' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[850px] h-[850px] object-contain"
            onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <div className="absolute -right-32 -bottom-20 opacity-[0.05] pointer-events-none select-none"
          style={{ animation: 'spin 70s linear infinite reverse' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[500px] h-[500px] object-contain"
            onError={(e) => { e.target.style.display = 'none'; }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-1.5 rounded-full border border-agro-green/40 text-agro-green font-brand text-xs tracking-widest uppercase mb-6">
                Identidad de Marca
              </span>
              <h2 className="font-brand text-5xl md:text-7xl text-white leading-tight">
                Nuestros <span className="text-agro-green">Valores</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group text-center">
                  <div className="w-20 h-20 rounded-full bg-agro-green mx-auto flex items-center justify-center text-3xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-agro-green/40">
                    {v.icon}
                  </div>
                  <h3 className="font-brand text-white text-base mb-2 leading-tight">{v.title}</h3>
                  <p className="font-slogan text-white/50 text-xs leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mission / Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <Reveal delay={100}>
              <div className="rounded-3xl p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-agro-green rounded-full" />
                  <h3 className="font-brand text-agro-green text-2xl tracking-wide">Misión</h3>
                </div>
                <p className="font-slogan text-white/70 leading-relaxed text-sm">
                  Contribuir al desarrollo sostenible del agro colombiano ofreciendo soluciones integrales
                  en insumos agrícolas y productos para la agroindustria, acompañadas de asesoría técnica especializada.
                  Trabajamos para fortalecer la productividad, rentabilidad y competitividad del productor.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-3xl p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-agro-green rounded-full" />
                  <h3 className="font-brand text-agro-green text-2xl tracking-wide">Visión 2030</h3>
                </div>
                <p className="font-slogan text-white/70 leading-relaxed text-sm">
                  Ser reconocida como la compañía referente a nivel nacional en soluciones agrícolas y agroindustriales,
                  destacándose por innovación, respaldo técnico y compromiso con la sostenibilidad.
                  El aliado estratégico del agricultor colombiano.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ───────────────────────────────────────────── */}
      <section className="py-24 bg-agro-gray relative overflow-hidden">
        {/* Spinning logo watermarks – blue tint */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none select-none"
          style={{ animation: 'spin 60s linear infinite' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[800px] h-[800px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>
        <div className="absolute -right-20 top-10 opacity-[0.04] pointer-events-none select-none"
          style={{ animation: 'spin 80s linear infinite reverse' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[400px] h-[400px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-agro-green/20 text-agro-green font-semibold text-sm tracking-widest uppercase mb-4">
                En el campo
              </span>
              <h2 className="font-brand text-4xl md:text-5xl text-agro-blue">
                Así Trabajamos
              </h2>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                Presentes donde más importa — junto al agricultor, en cada cosecha.
              </p>
            </div>
          </Reveal>

          <PhotoCarousel />
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32"
        style={{ background: 'linear-gradient(135deg, #97c822 0%, #6e9318 100%)' }}>
        <FloatingParticles />
        {/* Spinning logo watermarks – dark blue on green bg */}
        <div className="absolute -right-32 -bottom-24 opacity-[0.10] pointer-events-none select-none"
          style={{ animation: 'spin 45s linear infinite reverse' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[700px] h-[700px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>
        <div className="absolute -left-32 -top-24 opacity-[0.07] pointer-events-none select-none"
          style={{ animation: 'spin 60s linear infinite' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[550px] h-[550px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(73%) saturate(800%) hue-rotate(200deg)' }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="font-brand text-6xl md:text-8xl text-agro-blue leading-tight mb-8">
              Impulse su<br />campo hoy.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="font-slogan text-agro-blue/70 text-xl mb-10 leading-relaxed">
              Contáctenos y descubra cómo nuestros productos transforman la rentabilidad de sus cultivos.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <a
              href={`https://wa.me/573144591627?text=${encodeURIComponent('Hola, me gustaría recibir asesoría sobre sus productos agrícolas.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-agro-blue text-white font-brand text-lg tracking-wide hover:bg-agro-blue-dark transition-all hover:-translate-y-1 shadow-2xl shadow-agro-blue/30"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contactar un Asesor
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ────────────────────────────────────────── */}
      <footer id="contacto" className="text-white pt-24 pb-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0b1e45 0%, #0d2454 50%, #0a1a3d 100%)' }}>
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-agro-blue/20 blur-3xl rounded-full pointer-events-none" />
        {/* Spinning logo watermarks – white on dark bg */}
        <div className="absolute -left-32 bottom-0 opacity-[0.07] pointer-events-none select-none"
          style={{ animation: 'spin 70s linear infinite' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[650px] h-[650px] object-contain"
            style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
        <div className="absolute -right-32 top-0 opacity-[0.05] pointer-events-none select-none"
          style={{ animation: 'spin 55s linear infinite reverse' }}>
          <img src="/logos/logo-9.png" alt="" className="w-[500px] h-[500px] object-contain"
            style={{ filter: 'brightness(0) invert(1)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

            {/* Brand column */}
            <div>
              <img src="../Logotipo final - submarca-20260227T024625Z-1-001/Logotipo final - submarca/Png/Mesa de trabajo 8.png" alt="Universal Agro" className="h-80 w-auto mb-6"
                onError={(e) => { e.target.src = '/logos/mesa-de-trabajo-3.png'; }} />
              <p className="font-slogan text-gray-400 text-sm leading-relaxed mb-6">
                Especialistas en insumos agrícolas y soluciones para la agroindustria colombiana.
              </p>
              <p className="font-brand text-agro-green text-lg tracking-wide">Universally different.</p>

              {/* Socials */}
              <div className="flex gap-4 mt-6">
                <a href="https://www.facebook.com/profile.php?id=100068785181654" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-agro-green hover:text-agro-green transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/universalagrosas/" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-agro-green hover:text-agro-green transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.youtube.com/@universalagrosas5318" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-agro-green hover:text-agro-green transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-brand text-white text-lg tracking-wide mb-6">Navegación</h4>
              <ul className="space-y-3">
                {['Inicio','Nosotros','Productos','Valores','Contacto'].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`}
                      className="font-slogan text-gray-400 text-sm hover:text-agro-green transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-agro-green/40 inline-block" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-brand text-white text-lg tracking-wide mb-6">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm font-slogan">
                  <MapPin size={16} className="text-agro-green mt-0.5 flex-shrink-0" />
                  Calle 105 sur 5a -64 - Bogotá
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-slogan">
                  <Phone size={16} className="text-agro-green flex-shrink-0" />
                  +57 314 459 1627
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-slogan">
                  <Mail size={16} className="text-agro-green flex-shrink-0" />
                  contabilidad@universalagrosas.com.co
                </li>
              </ul>

              <a
                href="mailto:contabilidad@universalagrosas.com.co"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-agro-green text-agro-green font-brand text-sm tracking-wide hover:bg-agro-green hover:text-agro-blue transition-all"
              >
                Enviar mensaje <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-slogan text-gray-600 text-xs">
              © 2026 Universal Agro S.A.S. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-slogan text-gray-600 text-xs hover:text-agro-green transition-colors">Política de Privacidad</a>
              <a href="#" className="font-slogan text-gray-600 text-xs hover:text-agro-green transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ────────────────────────────────── */}
      <a
        href="https://wa.me/573144591627"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/40"
        style={{ background: '#25D366' }}
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Global keyframe styles */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(4deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
