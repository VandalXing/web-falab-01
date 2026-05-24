import { useState, useEffect } from 'react';
import { Menu, X, Microscope } from 'lucide-react';

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '实验室管理', href: '#management' },
  { label: '设备', href: '#equipment' },
  { label: '功能与案例', href: '#functions' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,14,23,0.9)] backdrop-blur-xl border-b border-[rgba(148,163,184,0.1)]'
            : 'bg-transparent'
        }`}
        style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] flex items-center justify-center group-hover:border-[rgba(0,212,255,0.5)] transition-colors">
            <Microscope className="w-5 h-5 text-[#00d4ff]" />
          </div>
          <span className="text-[#f1f5f9] font-semibold text-sm tracking-wide">FA Lab</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
              className="text-[#94a3b8] hover:text-[#00d4ff] text-sm font-medium transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full border border-[rgba(148,163,184,0.15)] text-[#f1f5f9] text-sm font-medium hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.08)] transition-all duration-200"
        >
          联系我们
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-[#94a3b8]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div
            className="absolute top-16 left-0 right-0 bg-[#111827] border-b border-[rgba(148,163,184,0.1)] p-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                className="text-[#94a3b8] hover:text-[#00d4ff] text-base font-medium py-2 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#00d4ff] text-[#0a0e17] text-sm font-semibold"
            >
              联系我们
            </a>
          </div>
        </div>
      )}
    </>
  );
}
