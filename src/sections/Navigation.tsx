import { useState, useEffect } from 'react';
import { Menu, X, Microscope } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Fundamentals', href: '#basics' },
  { label: 'Tools', href: '#tools' },
  { label: 'Cases', href: '#cases' },
  { label: 'Best Practices', href: '#lessons' },
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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-[rgba(10,14,23,0.9)] backdrop-blur-xl border-b border-[rgba(148,163,184,0.1)]' : 'bg-transparent'}`}
        style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleClick('#hero'); }} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] flex items-center justify-center group-hover:border-[rgba(0,212,255,0.5)] transition-colors">
            <Microscope className="w-5 h-5 text-[#00d4ff]" />
          </div>
          <span className="text-[#f1f5f9] font-semibold text-sm tracking-wide">FA Learning</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); handleClick(item.href); }} className="text-[#94a3b8] hover:text-[#00d4ff] text-sm font-medium transition-colors duration-200">{item.label}</a>
          ))}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center text-[#94a3b8]">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-[#111827] border-b border-[rgba(148,163,184,0.1)] p-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); handleClick(item.href); }} className="text-[#94a3b8] hover:text-[#00d4ff] text-base font-medium py-2 transition-colors">{item.label}</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
