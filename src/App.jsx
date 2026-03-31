import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Phone, Mail, MapPin, Globe, Link, Share2 } from 'lucide-react';

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
  },
  {
    id: 5,
    name: 'AGRO 30',
    tag: 'Acondicionador de Suelos',
    desc: 'Penetra los perfiles del suelo. Aumenta el CIC, optimiza el pH y hace más eficiente la nutrición de la planta.',
    color: '#1b4999',
    accent: '#97c822',
    icon: '🪴',
    img: '/photos/agro-humita-jpg.jpg',
  },
  {
    id: 6,
    name: 'AGRO CAL MAG',
    tag: 'Enmienda Agrícola',
    desc: 'Corrección y mejora de las condiciones físicas, químicas y biológicas del suelo. Mejora la calidad en cultivos de exportación y/o nacionales.',
    color: '#97c822',
    accent: '#1b4999',
    icon: '🧪',
    img: null,
  },
];

const values = [
  { icon: '💡', title: 'Innovación Aplicada', desc: 'Tecnología al servicio del campo colombiano.' },
  { icon: '♻️', title: 'Sostenibilidad Responsable', desc: 'Prácticas que cuidan el medio ambiente.' },
  { icon: '🏆', title: 'Calidad y Eficiencia', desc: 'Estándares internacionales en cada producto.' },
  { icon: '🤝', title: 'Compromiso con el Productor', desc: 'Tu rentabilidad es nuestra misión.' },
  { icon: '🌾', title: 'Desarrollo Rural', desc: 'Impulsando el campo colombiano hacia el futuro.' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Años de experiencia' },
  { value: 5, suffix: 'K+', label: 'Productores atendidos' },
  { value: 100, suffix: '%', label: 'Respaldo técnico' },
  { value: 30, suffix: '+', label: 'Productos en catálogo' },
];

/* ─── Animated Counter ───────────────────────────────────────────── */
function Counter({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2000;
        const step = 16;
        const increment = value / (duration / step);
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-brand text-6xl md:text-7xl text-agro-green leading-none mb-2 transition-transform duration-300 group-hover:scale-110">
        {count}{suffix}
      </div>
      <div className="font-slogan text-white/70 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

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
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 120 + 30,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 6,
    color: i % 3 === 0 ? '#97c822' : i % 3 === 1 ? '#1b4999' : '#ffffff',
  }));

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
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0">
            <img
              src={scrolled ? '/logos/logo-1.png' : '/logos/mesa-de-trabajo-3.png'}
              alt="Universal Agro"
              className="h-32 w-auto transition-all duration-300"
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
          className="absolute -right-40 -top-40 opacity-[0.06] pointer-events-none select-none"
          style={{ animation: 'spin 40s linear infinite' }}
        >
          <img src="/logos/logo-9.png" alt="" className="w-[700px] h-[700px] object-contain"
            onError={(e) => { e.target.src = '/logos/logo-1.png'; }} />
        </div>
        <div
          className="absolute -left-32 -bottom-32 opacity-[0.05] pointer-events-none select-none"
          style={{ animation: 'spin 60s linear infinite reverse' }}
        >
          <img src="/logos/logo-9.png" alt="" className="w-[500px] h-[500px] object-contain"
            onError={(e) => { e.target.src = '/logos/logo-1.png'; }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {/* Main Logo */}
          <div className="flex justify-center mb-10" style={{ animation: 'slideUp 0.8s ease-out forwards' }}>
            <img
              src="/logos/mesa-de-trabajo-3.png"
              alt="Universal Agro"
              className="h-32 md:h-44 w-auto"
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
          <span className="font-slogan text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────── */}
      <div className="bg-agro-green overflow-hidden py-4 relative">
        <div className="marquee-track">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-brand text-agro-blue text-2xl tracking-widest uppercase mx-8 whitespace-nowrap">
              Universally Different &nbsp;•&nbsp; Universal Agro &nbsp;•&nbsp; Innovación Agrícola &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <section className="bg-agro-blue py-24 relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 opacity-5">
          <img src="/logos/logo-9.png" alt="" className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <Counter value={s.value} suffix={s.suffix} label={s.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section id="nosotros" className="py-32 bg-white relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-agro-green-pale rounded-full blur-3xl opacity-60 pointer-events-none" />

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
                      style={{ background: p.accent, color: p.color === '#97c822' ? '#1b4999' : '#97c822' === p.accent ? '#1b4999' : 'white' }}
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
                  <div
                    className="px-8 py-4 flex items-center justify-between"
                    style={{ background: 'rgba(0,0,0,0.2)' }}
                  >
                    <span className="font-slogan text-white/60 text-xs uppercase tracking-widest">Ver detalles</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                      style={{ background: p.accent }}
                    >
                      <ArrowRight size={14} color={p.color} />
                    </div>
                  </div>

                  {/* Decorative circle */}
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30"
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
        {/* Watermark logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <img src="/logos/logo-9.png" alt="" className="w-[600px] h-[600px] object-contain"
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

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Large hero photo */}
            <Reveal delay={0}>
              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '4/3' }}>
                <img src="/photos/ESR_7845.jpg" alt="Campo Universal Agro" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/ESR_7849.jpg" alt="Cultivos" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/ESR_7850.jpg" alt="Cosecha" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/ESR_7856.jpg" alt="Campo" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/ESR_7863.jpg" alt="Trabajo en campo" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/IMG_7150.jpg" alt="Instalaciones" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/IMG_7151.jpg" alt="Productos" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/IMG_7152.jpg" alt="Equipo" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="col-span-2 rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '16/7' }}>
                <img src="/photos/IMG_5755.jpg" alt="Panorámica campo" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/IMG_7153.jpg" alt="Campo" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="rounded-2xl overflow-hidden hover-lift" style={{ aspectRatio: '1/1' }}>
                <img src="/photos/IMG_7155.jpg" alt="Agricultura" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32"
        style={{ background: 'linear-gradient(135deg, #97c822 0%, #6e9318 100%)' }}>
        <FloatingParticles />

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
              href="#contacto"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-agro-blue text-white font-brand text-lg tracking-wide hover:bg-agro-blue-dark transition-all hover:-translate-y-1 shadow-2xl shadow-agro-blue/30"
            >
              Contactar un Asesor <ArrowRight size={22} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ────────────────────────────────────────── */}
      <footer id="contacto" className="bg-gray-950 text-white pt-24 pb-10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-agro-blue/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

            {/* Brand column */}
            <div>
              <img src="/logos/mesa-de-trabajo-2.png" alt="Universal Agro" className="h-40 w-auto mb-6"
                onError={(e) => { e.target.src = '/logos/mesa-de-trabajo-3.png'; }} />
              <p className="font-slogan text-gray-400 text-sm leading-relaxed mb-6">
                Especialistas en insumos agrícolas y soluciones para la agroindustria colombiana.
              </p>
              <p className="font-brand text-agro-green text-lg tracking-wide">Universally different.</p>

              {/* Socials */}
              <div className="flex gap-4 mt-6">
                {[Globe, Share2, Link].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-agro-green hover:text-agro-green transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
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
                  Calle 51 No.26-10 Odeñas, Bogotá D.C., Colombia
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-slogan">
                  <Phone size={16} className="text-agro-green flex-shrink-0" />
                  31 372185
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm font-slogan">
                  <Mail size={16} className="text-agro-green flex-shrink-0" />
                  universal.agrosas@gmail.com
                </li>
              </ul>

              <a
                href="mailto:universal.agrosas@gmail.com"
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
