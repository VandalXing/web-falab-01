import { Link } from 'react-router';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { BookOpen, Ruler, Calculator, ArrowRight } from 'lucide-react';

const sources = [
  {
    title: 'Silver Bullet on SEM Resolution (FEI, 2010)',
    desc: 'Comprehensive technical note addressing resolution terminology, probe size, image sharpness, and the Derivative (DR) method for SEM/SDB imaging. Introduces standardized definitions and ISO image sharpness methodology.',
  },
  {
    title: 'Resolution Measurement Overview (Thermo Fisher)',
    desc: 'Practical primer on different scanning probe performance measurement methods including Rayleigh Criterion, FWHM, d50, knife-edge/derivative method, and ISO 12233 standards.',
  },
  {
    title: 'FIB Image Processing for Auto Alignments (2015)',
    desc: 'Technical presentation on FIB automated lens alignment, pattern matching, hierarchical sharpness metrics (Pyramid Sharpness), auto focus/stigmation, and elliptical aperture handling.',
  },
  {
    title: 'Slanted-Edge MTF Analysis (Burns, Kodak, 2000)',
    desc: 'Foundational paper on ISO 12233 slanted-edge spatial frequency response evaluation, covering edge-gradient analysis, oversampling, discrete derivative effects, and noise bias.',
  },
];

const concepts = [
  {
    title: 'Probe Size (d50 / FWHM)',
    content: 'The size of the electron beam when focused at the sample surface. This is the fundamental optical limit of the system. d50 = beam diameter containing 50% of the beam current. FWHM = Full Width at Half Maximum of the probe intensity profile.',
    limitation: 'Probe size relates only to the performance of the electron/ion column alone. It does not account for probe shape, imaging chain, or human perception factors. Two probes with identical FWHM can have completely different shapes and imaging performance.',
  },
  {
    title: 'Image Sharpness',
    content: 'A well-defined characteristic of a digital image that describes the steepness of intensity transitions at edges. Sharpness is determined from the width distribution of edges found in the image.',
  },
];

const navCards = [
  {
    to: '/resolution-center/mtf',
    icon: Ruler,
    title: 'Slanted-Edge MTF',
    desc: 'Interactive 8-step ISO 12233 algorithm flow for spatial frequency response analysis. Based on Burns (Kodak, 2000).',
    color: '#00d4ff',
  },
  {
    to: '/resolution-center/calculator',
    icon: Calculator,
    title: 'Resolution Calculator',
    desc: 'Upload SEM/FIB images and analyze resolution using Slanted-Edge MTF, ESF/PSF/MTF50 charts, and multiple algorithms.',
    color: '#10b981',
  },
];

export default function ResolutionCenter() {
  const headerReveal = useScrollReveal();
  const sourcesReveal = useScrollReveal();
  const conceptsReveal = useScrollReveal();

  return (
    <div className="min-h-[100dvh] bg-[#0a0e17] pt-24 pb-16" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerReveal.ref} className={`mb-16 transition-all duration-700 ${headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">SEM Resolution Analysis</p>
          <h1 className="text-[#f1f5f9] font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Resolution Analysis Center
          </h1>
          <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">
            A comprehensive learning resource covering SEM/FIB resolution measurement methodologies, image sharpness algorithms, and standardized evaluation techniques across multiple industry sources.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {navCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6 hover:border-[rgba(0,212,255,0.3)] transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: `${card.color}15`, border: `1px solid ${card.color}30` }}>
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-[#f1f5f9] font-semibold text-base mb-1 group-hover:text-[#00d4ff] transition-colors">{card.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-3">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: card.color }}>
                  Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Document Sources */}
        <div ref={sourcesReveal.ref} className={`mb-16 transition-all duration-700 delay-100 ${sourcesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-[#00d4ff]" />
            <h2 className="text-[#f1f5f9] font-semibold text-xl">Document Sources & Scope</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((s, i) => (
              <div key={i} className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-5 hover:border-[rgba(0,212,255,0.2)] transition-all">
                <h3 className="text-[#f1f5f9] text-sm font-medium mb-2">{s.title}</h3>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Concepts */}
        <div ref={conceptsReveal.ref} className={`transition-all duration-700 delay-200 ${conceptsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-[#f1f5f9] font-semibold text-xl mb-6">Core Concepts & Definitions</h2>
          <div className="space-y-5">
            {concepts.map((c) => (
              <div key={c.title} className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">{c.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{c.content}</p>
                {c.limitation && (
                  <div className="bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.15)] rounded-lg p-4">
                    <p className="text-[#f59e0b] text-xs font-medium mb-1">⚠ Key Limitation</p>
                    <p className="text-[#94a3b8] text-xs leading-relaxed">{c.limitation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
