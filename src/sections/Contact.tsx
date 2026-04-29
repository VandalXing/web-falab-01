import { Mail, MapPin, Phone } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const contactItems = [
  { icon: Mail, label: '邮箱', value: 'fa-lab@example.com' },
  { icon: MapPin, label: '地址', value: '某市半导体产业园区FA大楼' },
  { icon: Phone, label: '电话', value: '+86-xxx-xxxx-xxxx' },
];

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32"
      style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          {/* Left: Contact Info */}
          <div>
            <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">Contact Us</p>
            <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              联系我们
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10">
              如需失效分析服务或技术咨询，请通过以下方式联系。
            </p>

            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-[#64748b] text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-[#f1f5f9] text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Reference Image */}
          <div className="rounded-xl overflow-hidden border border-[rgba(148,163,184,0.1)]">
            <img
              src="/images/en_page1_img1.jpeg"
              alt="Microelectronics Failure Analysis Desk Reference"
              className="w-full h-auto object-cover"
            />
            <p className="text-[#64748b] text-xs py-3 px-4 bg-[#111827]">
              失效分析参考标准 — Microelectronics Failure Analysis Desk Reference, 7th Edition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
