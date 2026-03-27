import React, { useState, useEffect } from 'react';
import { Leaf, Sprout, Tractor, Globe, ChevronRight, Menu, X, ArrowRight, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

const realProducts = [
  {
    id: 1,
    name: 'UNIVERSAL Ca-B-Zn',
    tag: 'Fertilizante Premium',
    desc: 'Diseñado para prevenir y corregir deficiencias de Ca-B-Zn en cultivos de alto rendimiento. Su formulación con gluconatos lo hace más disponible para la planta, logrando un efecto mucho más rápido.',
    details: 'Ideal en cualquier estado fenológico del cultivo que presente deficiencia o requiera prevención.',
    imgPlaceholder: 'https://images.unsplash.com/photo-1584948013318-77114b7e3243?w=500&q=80', // Replace with actual bottle
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 2,
    name: 'AGRO MAG',
    tag: 'Fuente de Magnesio',
    desc: 'Fertilizante fuente de Magnesio quelatado con gluconatos de alta estabilidad.',
    details: 'Diseñado para aplicación al suelo y/o foliar para corregir y prevenir deficiencias de Magnesio.',
    imgPlaceholder: 'https://images.unsplash.com/photo-1628183185369-0bd46790901e?w=500&q=80', // Replace with actual bottle
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 3,
    name: 'NEW GREEN',
    tag: 'Mejora de Cultivos',
    desc: 'Diseñado para mejorar la calidad y llenado de cultivos de exportación. Enriquecido con citoquininas 600 ppm.',
    details: 'Actúa como activador de estructuras enzimáticas, capaz de catalizar la mayor parte de las reacciones típicas del metabolismo de la planta e influenciar su fisiología.',
    imgPlaceholder: 'https://images.unsplash.com/photo-1628183185566-1c25bd57e4e0?w=500&q=80', // Replace with actual bottle
    color: 'from-lime-500 to-green-400'
  },
  {
    id: 4,
    name: 'PERFEKTO',
    tag: 'Bioestimulante Foliar',
    desc: 'Aporta potasio y fósforo, ligados químicamente a moléculas orgánicas del metabolismo celular.',
    details: 'Contiene gluconato de potasio, ácidos carboxílicos de bajo peso molecular y hormonas (citoquininas) que ayudan a la división celular. Maximiza rendimiento y calidad en etapas productivas.',
    imgPlaceholder: 'https://images.unsplash.com/photo-1605369674061-0f781dfaa234?w=500&q=80', // Replace with actual bottle
    color: 'from-purple-500 to-indigo-400'
  },
  {
    id: 5,
    name: 'AGRO 30',
    tag: 'Acondicionador de Suelos',
    desc: 'Desarrollado según rigurosos estudios de nuestro equipo técnico para penetrar los perfiles del suelo en tiempos prudentes.',
    details: 'Aumenta el CIC y optimiza el pH del suelo, haciendo más eficiente la nutrición y extracción por parte de la planta. Ideal para cultivos de exportación con altos requerimientos fisiológicos.',
    imgPlaceholder: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500&q=80', // Replace with actual bottle
    color: 'from-amber-500 to-yellow-400'
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-earth-50 font-sans text-gray-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-nature-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-nature-500/30">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Universal Agro</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className={`text-sm font-medium transition-colors hover:text-nature-500 ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>Inicio</a>
            <a href="#nosotros" className={`text-sm font-medium transition-colors hover:text-nature-500 ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>Nosotros</a>
            <a href="#productos" className={`text-sm font-medium transition-colors hover:text-nature-500 ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>Productos</a>
            <a href="#contacto" className="px-5 py-2.5 rounded-full bg-nature-600 text-white text-sm font-semibold hover:bg-nature-700 transition-all shadow-lg hover:shadow-nature-600/40">Contáctanos</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={isScrolled ? "text-gray-900" : "text-white"}/> : <Menu className={isScrolled ? "text-gray-900" : "text-white"} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1592394533824-9440e5d68530?q=80&w=2000" alt="Campos agrícolas" className="w-full h-full object-cover filter brightness-[0.45]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center mt-16 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-nature-400/40 bg-nature-500/10 backdrop-blur-sm">
            <span className="text-nature-300 text-xs font-semibold tracking-wider uppercase">El futuro del agro</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Innovación y bienestar para el <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-400 to-emerald-200">sector agropecuario</span>
          </h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Soluciones integrales, tecnología avanzada y productos de primera calidad para potenciar la productividad de sus tierras.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#productos" className="px-8 py-4 rounded-full bg-nature-600 text-white font-semibold text-lg hover:bg-nature-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2">
              Ver Catálogo
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#nosotros" className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
              Conoce Más
            </a>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="glass-effect rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="flex flex-col items-center pt-4 md:pt-0">
            <div className="w-16 h-16 rounded-2xl bg-earth-100 flex items-center justify-center mb-6 text-earth-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Calidad Garantizada</h3>
            <p className="text-gray-500">Estándares internacionales para el máximo rendimiento.</p>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <div className="w-16 h-16 rounded-2xl bg-nature-100 flex items-center justify-center mb-6 text-nature-600">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compromiso Sustentable</h3>
            <p className="text-gray-500">Prácticas agrícolas amigables con el medio ambiente.</p>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mayor Productividad</h3>
            <p className="text-gray-500">Incrementa tus resultados con tecnología de vanguardia.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000" alt="Agricultura moderna" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs hidden md:block">
                <div className="text-nature-600 font-extrabold text-5xl mb-2">15+</div>
                <div className="text-gray-800 font-bold text-lg leading-tight">Años liderando el desarrollo agropecuario</div>
              </div>
            </div>
            <div>
              <h2 className="text-nature-600 font-bold tracking-wide uppercase text-sm mb-3">Sobre Nosotros</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Potenciando el corazón de la tierra</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                En <span className="font-semibold text-nature-700">Universal Agro S.A.S</span>, no solo comercializamos productos; brindamos soluciones transformadoras. Nuestro compromiso es evolucionar las prácticas agrícolas mediante innovación y excelencia, garantizando la prosperidad del campo y de quienes lo trabajan.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Asesoría técnica especializada.',
                  'Insumos agrícolas de marcas líderes mundiales.',
                  'Compromiso inquebrantable con la rentabilidad de su cultivo.'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <div className="mr-4 p-1 rounded-full bg-nature-100 text-nature-600">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Products Showcase */}
      <section id="productos" className="py-32 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-nature-50 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-earth-50 to-transparent rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="px-4 py-1.5 rounded-full bg-nature-100 text-nature-700 text-sm font-bold tracking-wider uppercase inline-block mb-4">Catálogo Estrella</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Fórmulas Avanzadas</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Soluciones hiper-optimizadas para el campo moderno. Diseñadas para corregir, prevenir y potenciar.</p>
          </div>

          <div className="space-y-32">
            {realProducts.map((p, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={p.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 group`}>
                  {/* Image Presentation */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="aspect-square max-w-md mx-auto relative rounded-[2.5rem] bg-gray-50 p-10 flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl">
                      {/* Subdued shadow logic for image */}
                      <div className={`absolute inset-0 rounded-[2.5rem] opacity-20 bg-gradient-to-tr ${p.color} blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-40`}></div>
                      
                      {/* Product Image placeholder logic */}
                      <div className="relative w-full h-full glass-effect rounded-2xl flex items-center justify-center overflow-hidden border border-white/40 shadow-xl z-10 p-6 bg-white shrink-0">
                          {/* NOTE: You will replace this IMG with your bottle images */}
                          <img src={p.imgPlaceholder} alt={p.name} className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full lg:w-1/2">
                    <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 bg-gradient-to-r ${p.color} text-white shadow-lg`}>
                      {p.tag}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-serif tracking-tight">{p.name}</h3>
                    <div className="w-20 h-1.5 bg-nature-500 mb-8 rounded-full"></div>
                    
                    <p className="text-xl text-gray-600 leading-relaxed mb-6 font-light">
                      {p.desc}
                    </p>
                    <div className="bg-earth-50 rounded-2xl p-6 border-l-4 border-nature-500 mb-8 shadow-sm">
                      <p className="text-gray-700 font-medium">
                        {p.details}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-10">
                      <li className="flex items-center text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-nature-500 mr-3" /> Alta Estabilidad & Eficiencia
                      </li>
                      <li className="flex items-center text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-nature-500 mr-3" /> Resultados Notables en Campo
                      </li>
                    </ul>

                    <button className="px-8 py-4 rounded-full border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2">
                       Consultar Disponibilidad <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer id="contacto" className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -ml-[40rem] w-[80rem] h-[40rem] -translate-y-1/2 opacity-20 pointer-events-none">
          <div className="mx-auto w-full h-full bg-gradient-to-b from-nature-500 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6">Impulse su rendimiento productivo hoy.</h3>
              <p className="text-gray-400 mb-8 max-w-md line-clamp-3">
                Contáctenos para descubrir cómo nuestros productos y asesoría técnica especializada pueden transformar la rentabilidad de sus cultivos.
              </p>
              <a href="mailto:contacto@universalagrosas.com" className="inline-block px-8 py-4 rounded-full bg-nature-500 text-gray-900 font-bold hover:bg-nature-400 transition-colors shadow-lg shadow-nature-500/20">
                Contactar a un Asesor
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm text-gray-400">
              <div>
                <h4 className="text-white font-semibold mb-4 text-base">Navegación</h4>
                <ul className="space-y-3">
                  <li><a href="#inicio" className="hover:text-nature-400 transition-colors">Inicio</a></li>
                  <li><a href="#nosotros" className="hover:text-nature-400 transition-colors">Acerca de Nosotros</a></li>
                  <li><a href="#productos" className="hover:text-nature-400 transition-colors">Productos</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-base">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-nature-400 transition-colors">Política de Privacidad</a></li>
                  <li><a href="#" className="hover:text-nature-400 transition-colors">Términos de Servicio</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2026 Universal Agro S.A.S. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
