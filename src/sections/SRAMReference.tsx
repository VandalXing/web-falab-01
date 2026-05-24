import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SRAMReference() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-24 md:py-32" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">Reference Data</p>
          <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>SRAM Failure Mode Quick Reference</h2>
          <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed mb-10">
            Compiled from extensive real-case analysis at 65nm and below process nodes. Use this table to quickly correlate SRAM failure type with suspected process layer and root cause, accelerating the analysis flow.
          </p>

          <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
            <img src="/images/cn_page11_img1.png" alt="SRAM Failure Mode vs Root Cause Summary" className="w-full h-auto object-contain" />
            <p className="text-[#64748b] text-xs py-3 px-4 border-t border-[rgba(148,163,184,0.1)]">
              SRAM Failure Mode vs Root Cause Summary — covering SB/DBL/BL/WL/Block failure types with corresponding process layers and root causes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'SB (Single Bit)', desc: 'Usually M1 and below' },
              { label: 'DBL (Double Bit)', desc: 'V2 and below' },
              { label: 'WL (Word Line)', desc: 'M3/TM2 driver circuit' },
              { label: 'Block Fail', desc: 'All layers possible' },
            ].map((item) => (
              <div key={item.label} className="bg-[#111827] border border-[rgba(148,163,184,0.08)] rounded-lg p-3">
                <p className="text-[#00d4ff] text-xs font-medium mb-1">{item.label}</p>
                <p className="text-[#64748b] text-[11px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
