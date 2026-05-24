import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Microscope } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Fundamentals', href: '/fundamentals' },
  { label: 'Tools', href: '/tools' },
  { label: 'Resolution Center', href: '/resolution-center' },
  { label: 'Cases', href: '/cases' },
  { label: 'Best Practices', href: '/best-practices' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-[rgba(10,14,23,0.95)] backdrop-blur-xl border-b border-[rgba(148,163,184,0.1)]' : 'bg-transparent'}`}
        style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] flex items-center justify-center group-hover:border-[rgba(0,212,255,0.5)] transition-colors">
            <Microscope className="w-5 h-5 text-[#00d4ff]" />
          </div>
          <span className="text-[#f1f5f9] font-semibold text-sm tracking-wide">FA Learning</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${location.pathname === item.href ? 'text-[#00d4ff]' : 'text-[#94a3b8] hover:text-[#00d4ff]'}`}>
              {item.label}
            </Link>
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
              <Link key={item.href} to={item.href}
                className={`text-base font-medium py-2 transition-colors ${location.pathname === item.href ? 'text-[#00d4ff]' : 'text-[#94a3b8]'}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
