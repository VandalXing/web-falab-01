import { useParams, Link } from 'react-router';
import { getMainTool, getSubTechniques } from '@/data/toolsData';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ToolDetail() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = getMainTool(toolId || '');
  const subs = tool ? getSubTechniques(tool.id) : [];

  if (!tool) {
    return (
      <div className="min-h-[100dvh] bg-[#0a0e17] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[#f1f5f9] text-xl mb-4">Tool not found</h2>
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
          <span className="text-[#00d4ff] font-medium">{tool.name}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{tool.icon}</span>
            <div>
              <h1 className="text-[#f1f5f9] font-bold text-3xl">{tool.name}</h1>
              <p className="text-[#64748b] text-sm">{tool.fullName}</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden mb-12">
          <img src={tool.image} alt={tool.name} className="w-full h-auto object-contain max-h-[500px]" />
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6 mb-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">Operating Principle</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{tool.shortDesc}</p>
            </div>
            <div className="bg-[#111827] border border-[rgba(0,212,255,0.15)] rounded-xl p-6">
              <h3 className="text-[#00d4ff] font-semibold text-base mb-3">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.keySpecs.map((spec) => {
                  const [label, value] = spec.split(':');
                  return (
                    <div key={spec} className="bg-[#0d121f] rounded-lg p-3">
                      <p className="text-[#64748b] text-xs mb-1">{label}</p>
                      <p className="text-[#f1f5f9] text-sm font-medium">{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">Associated Sub-Techniques</h3>
              {subs.length > 0 ? (
                <div className="space-y-3">
                  {subs.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/subtech/${sub.id}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#0d121f] border border-[rgba(148,163,184,0.08)] hover:border-[rgba(0,212,255,0.3)] transition-all group"
                    >
                      <div>
                        <p className="text-[#f1f5f9] text-sm font-medium">{sub.name}</p>
                        <p className="text-[#64748b] text-[11px]">{sub.fullName}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#64748b] group-hover:text-[#00d4ff] transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[#64748b] text-sm">No sub-techniques listed. Nanoprober operates as a standalone system.</p>
              )}
              <div className="mt-6 pt-4 border-t border-[rgba(148,163,184,0.1)]">
                <p className="text-[#94a3b8] text-xs leading-relaxed">
                  Each sub-technique above links to a dedicated page with detailed physics principles, specifications, applications, and FA procedures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Cases */}
        <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
          <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">Related Case Studies</h3>
          <p className="text-[#94a3b8] text-sm">
            See the <Link to="/" className="text-[#00d4ff] hover:underline">Case Studies</Link> section on the home page for real-world examples using {tool.name}.
          </p>
        </div>
      </div>
    </div>
  );
}
