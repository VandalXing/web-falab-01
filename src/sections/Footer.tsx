import { Microscope } from 'lucide-react';

const footerLinks = [
  { label: '首页', href: '#hero' },
  { label: '实验室管理', href: '#management' },
  { label: '设备', href: '#equipment' },
  { label: '功能与案例', href: '#functions' },
  { label: '联系我们', href: '#contact' },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] border-t border-[rgba(148,163,184,0.1)]">
      <div
        className="max-w-[1200px] mx-auto py-16"
        style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] flex items-center justify-center">
                <Microscope className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <span className="text-[#f1f5f9] font-semibold text-sm tracking-wide">FA Lab</span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed">
              专业半导体失效分析实验室，提供从晶圆验收测试到可靠性认证的全链条分析服务。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#f1f5f9] font-semibold text-sm mb-4">快速链接</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className="text-[#94a3b8] hover:text-[#00d4ff] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#f1f5f9] font-semibold text-sm mb-4">联系方式</h4>
            <div className="space-y-2.5 text-sm text-[#94a3b8]">
              <p>fa-lab@example.com</p>
              <p>某市半导体产业园区FA大楼</p>
              <p>+86-xxx-xxxx-xxxx</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[rgba(148,163,184,0.1)]">
          <p className="text-[#64748b] text-xs text-center">
            &copy; {new Date().getFullYear()} FA Laboratory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
