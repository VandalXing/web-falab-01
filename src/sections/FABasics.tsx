import { useScrollReveal } from '@/hooks/useScrollReveal';

const faFlows = [
  {
    title: 'WAT (Wafer Acceptance Test)',
    desc: 'Test structures on the wafer scribe line monitor device parameters at each process step. When parameters deviate from specifications, FA is performed to identify the root cause.',
    points: ['Front-end device parameter analysis (Vt, Idsat, Ioff)', 'Metal line resistance and leakage detection', 'Via chain open/high-resistance localization', 'TEM structural measurement and comparison'],
  },
  {
    title: 'CP/FT Yield Analysis',
    desc: 'Comprehensive functional testing of all dies on the wafer. Failed dies are recorded with failing test items (O/S, Mbist, Scan, etc.) for subsequent FA.',
    points: ['O/S (Open/Short) and Leakage failure analysis', 'Scan / LBIST / ATPG failure analysis', 'Memory addressable failure analysis', 'DFT path verification and Layout tracing'],
  },
  {
    title: 'Reliability Qualification',
    desc: 'Accelerated stress testing (temperature, voltage, current, humidity) to simulate real-world degradation and quantify product lifetime.',
    points: ['GOI gate oxide reliability (TDDB/Vramp/Jramp)', 'EM electromigration / SM stress migration', 'ESD / Latch-up characterization', 'HTOL high-temperature lifetime / EFR'],
  },
];

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">{eyebrow}</p>
      <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>{title}</h2>
      <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">{desc}</p>
    </div>
  );
}

export default function FABasics() {
  const flowReveal = useScrollReveal();
  const testReveal = useScrollReveal();

  return (
    <section id="basics" className="relative py-24 md:py-32" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="Failure Analysis Fundamentals" title="FA Fundamentals" desc="Failure Analysis spans the entire semiconductor manufacturing flow — from wafer processing through packaging and final test. Every anomaly may require FA to pinpoint the root cause and drive process improvement." />

        <div ref={flowReveal.ref} className={`bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-8 mb-16 transition-all duration-700 delay-100 ${flowReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-4">Definition and Objectives of Failure Analysis</h3>
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
            Failure Analysis (FA) is a systematic engineering discipline that employs physical, electrical, and chemical analysis techniques to locate defects, determine failure mechanisms, and infer root causes when test results deviate from specifications. FA findings directly feed back to process, design, and manufacturing teams to improve product quality and reliability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Defect Localization', desc: 'Pinpoint the physical location of failure' },
              { label: 'Mechanism Identification', desc: 'Analyze the root cause of failure' },
              { label: 'Process Improvement', desc: 'Feed back findings to optimize process flow' },
            ].map((item) => (
              <div key={item.label} className="bg-[#0d121f] border border-[rgba(148,163,184,0.08)] rounded-lg p-4">
                <p className="text-[#00d4ff] text-sm font-medium mb-1">{item.label}</p>
                <p className="text-[#64748b] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={testReveal.ref} className={`transition-all duration-700 delay-200 ${testReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-8">Three Major FA Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faFlows.map((flow) => (
              <div key={flow.title} className="group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6 hover:border-[rgba(0,212,255,0.25)] transition-all duration-300">
                <h4 className="text-[#f1f5f9] font-semibold text-base mb-2">{flow.title}</h4>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{flow.desc}</p>
                <ul className="space-y-2">
                  {flow.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00d4ff] mt-2 shrink-0" />
                      <span className="text-[#94a3b8] text-xs">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-6">SRAM CP Test Flow Diagram</h3>
          <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
            <img src="/images/cn_page7_img1.jpeg" alt="SRAM CP Test Flow" className="w-full h-auto object-contain" />
            <p className="text-[#64748b] text-xs py-3 px-4 border-t border-[rgba(148,163,184,0.1)]">
              Complete analysis chain from O/S test through leakage test, DC test, and functional test to metal/poly layer FA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
