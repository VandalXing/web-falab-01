import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0a0e17]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridDrift 60s linear infinite',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 60%)',
        }}
      />

      {/* Hero background image with slow zoom */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slowZoom 8s ease-out forwards',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <p
          className="text-[#00d4ff] text-xs md:text-sm font-medium uppercase tracking-[0.2em] mb-6"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
        >
          Semiconductor Failure Analysis
        </p>

        {/* Main title */}
        <h1
          className="text-[#f1f5f9] font-bold leading-[1.1] tracking-tight mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            animation: 'fadeInUp 0.8s ease-out 0.4s both',
          }}
        >
          半导体失效分析实验室
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.7s both' }}
        >
          从晶圆验收测试到可靠性认证，提供全链条失效分析解决方案
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'fadeInUp 0.5s ease-out 1s both' }}
        >
          <button
            onClick={() => handleClick('#functions')}
            className="px-8 py-3 rounded-full bg-[#00d4ff] text-[#0a0e17] font-semibold text-sm hover:brightness-110 transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.25)]"
          >
            浏览核心功能
          </button>
          <button
            onClick={() => handleClick('#management')}
            className="px-8 py-3 rounded-full border border-[rgba(148,163,184,0.2)] text-[#f1f5f9] font-medium text-sm hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.06)] transition-all duration-200"
          >
            了解实验室
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: 'fadeIn 0.5s ease-out 1.5s both' }}
      >
        <button
          onClick={() => handleClick('#management')}
          className="text-[#64748b] hover:text-[#00d4ff] transition-colors"
        >
          <ChevronDown className="w-6 h-6" style={{ animation: 'bounceDown 2s infinite' }} />
        </button>
      </div>
    </section>
  );
}
