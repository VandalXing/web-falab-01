import { useParams, Link } from 'react-router';
import { getSubTechnique, getMainTool } from '@/data/toolsData';
import { ArrowLeft } from 'lucide-react';

export default function SubTechDetail() {
  const { subTechId } = useParams<{ subTechId: string }>();
  const sub = getSubTechnique(subTechId || '');
  const parent = sub ? getMainTool(sub.parentTool) : null;

  if (!sub) {
    return (
      <div className="min-h-[100dvh] bg-[#0a0e17] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[#f1f5f9] text-xl mb-4">Sub-technique not found</h2>
          <Link to="/tools" className="text-[#00d4ff] hover:underline">Back to Tools Overview</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#0a0e17] pt-24 pb-16" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/tools" className="text-[#64748b] hover:text-[#00d4ff] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Tools
          </Link>
          <span className="text-[#64748b]">/</span>
          {parent && (
            <>
              <Link to={`/tools/${parent.id}`} className="text-[#64748b] hover:text-[#00d4ff] transition-colors">{parent.name}</Link>
              <span className="text-[#64748b]">/</span>
            </>
          )}
          <span className="text-[#00d4ff] font-medium">{sub.name}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-2">Sub-Technique of {parent?.name}</p>
          <h1 className="text-[#f1f5f9] font-bold text-3xl mb-2">{sub.name}</h1>
          <p className="text-[#64748b] text-sm">{sub.fullName}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Image */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
              <img src={sub.image} alt={sub.name} className="w-full h-auto object-contain max-h-[400px]" />
              <p className="text-[#64748b] text-xs py-3 px-4 border-t border-[rgba(148,163,184,0.1)]">{sub.imageCaption}</p>
            </div>

            {/* Principle */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">Operating Principle</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{sub.principle}</p>
            </div>

            {/* Physics Detail */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">Physics Details</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{sub.physicsDetail}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Specs */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 gap-2">
                {sub.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-[#0d121f]">
                    <span className="text-[#94a3b8] text-sm">{spec.label}</span>
                    <span className="text-[#f1f5f9] text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">Key Applications</h3>
              <ul className="space-y-2">
                {sub.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 shrink-0" />
                    <span className="text-[#94a3b8] text-sm">{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FA Usage */}
            <div className="bg-[#111827] border border-[rgba(0,212,255,0.15)] rounded-xl p-6">
              <h3 className="text-[#00d4ff] font-semibold text-base mb-3">FA Procedures</h3>
              <ul className="space-y-2">
                {sub.faUsage.map((u, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 shrink-0" />
                    <span className="text-[#94a3b8] text-sm">{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comparison Table */}
            {sub.comparison && (
              <div className="bg-[#111827] border border-[rgba(0,212,255,0.15)] rounded-xl p-6">
                <h3 className="text-[#00d4ff] font-semibold text-base mb-4">{sub.comparison.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[rgba(148,163,184,0.2)]">
                        <th className="text-left py-2 px-3 text-[#94a3b8] font-medium">Parameter</th>
                        {sub.comparison.rows[0] && Object.keys(sub.comparison.rows[0]).filter(k => k !== 'param').map((key) => (
                          <th key={key} className="text-left py-2 px-3 text-[#00d4ff] font-medium uppercase">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sub.comparison.rows.map((row, i) => (
                        <tr key={i} className="border-b border-[rgba(148,163,184,0.08)]">
                          <td className="py-2.5 px-3 text-[#94a3b8]">{row.param}</td>
                          {Object.keys(row).filter(k => k !== 'param').map((key) => (
                            <td key={key} className="py-2.5 px-3 text-[#f1f5f9]">{row[key as keyof typeof row]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
