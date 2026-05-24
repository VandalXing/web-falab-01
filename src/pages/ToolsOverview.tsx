import { Link } from 'react-router';
import { mainTools } from '@/data/toolsData';
import { subTechniques } from '@/data/toolsData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight, Layers } from 'lucide-react';

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">{eyebrow}</p>
      <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>{title}</h2>
      <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">{desc}</p>
    </div>
  );
}

export default function ToolsOverview() {
  const headerReveal = useScrollReveal();

  return (
    <div className="min-h-[100dvh] bg-[#0a0e17] pt-24 pb-16" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          eyebrow="Analytical Equipment Overview"
          title="FA Analytical Tools"
          desc="Five core analytical platforms form the foundation of semiconductor failure analysis. Each tool has dedicated sub-techniques for specialized analysis. Click on any tool or sub-technique for in-depth technical details."
        />

        {/* Main Tools Grid */}
        <div ref={headerReveal.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 transition-all duration-700 delay-100 ${headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {mainTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.id}`}
              className="group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden hover:border-[rgba(0,212,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,212,255,0.08)] transition-all duration-300"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={tool.image} alt={tool.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{tool.icon}</span>
                  <div>
                    <h3 className="text-[#f1f5f9] font-semibold text-base">{tool.name}</h3>
                    <p className="text-[#64748b] text-xs">{tool.fullName}</p>
                  </div>
                </div>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{tool.shortDesc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.keySpecs.map((spec) => (
                    <span key={spec} className="px-2 py-1 rounded bg-[#0d121f] text-[#94a3b8] text-[11px]">{spec}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[#00d4ff] text-sm font-medium group-hover:gap-3 transition-all">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sub-techniques Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Layers className="w-5 h-5 text-[#00d4ff]" />
            <h3 className="text-[#f1f5f9] font-semibold text-xl">Sub-Techniques</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subTechniques.map((st) => (
              <Link
                key={st.id}
                to={`/subtech/${st.id}`}
                className="group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-5 hover:border-[rgba(0,212,255,0.25)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[rgba(0,212,255,0.08)] text-[#00d4ff] text-[10px] font-medium uppercase">
                    {mainTools.find((t) => t.id === st.parentTool)?.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#00d4ff] transition-colors" />
                </div>
                <h4 className="text-[#f1f5f9] font-medium text-sm mb-1">{st.name}</h4>
                <p className="text-[#64748b] text-[11px] leading-snug">{st.fullName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
