import { useScrollReveal } from '@/hooks/useScrollReveal';

const lessons = [
  {
    num: '01',
    title: 'Samples without leakage can still show hotspots',
    desc: 'Do not rely solely on I-V curves for judgment. In an ESD HBM fail case, the I-V curves of fail and pass devices were identical, yet OBIRCH/EMMI still detected a hotspot. Always try fault isolation techniques — they may reveal unexpected findings.',
  },
  {
    num: '02',
    title: 'A hotspot location is not necessarily the defect location',
    desc: 'In MIM capacitor cases, metal residue causes abnormal series/parallel connections, creating excessive load at other locations which then become hotspots. The hotspot appears where the load is highest, not where the actual process defect is. Always correlate with layout to validate hotspot合理性.',
  },
  {
    num: '03',
    title: 'Leaky samples may also have via open or metal breakage',
    desc: 'A via open can reconfigure the circuit pathway, creating new leakage paths. Therefore, leakage failure is not necessarily a short — layer-by-layer VC comparison and layout tracing are required to confirm the true failure type.',
  },
  {
    num: '04',
    title: 'For high via stacks, inspect at multiple angles and voltages',
    desc: 'Use low kV for via/metal top VC, high kV for bottom metal, and also high kV from top to inspect the IMD. Thick via IMD can harbor particles or delamination in the middle that are easily missed when viewing only a single layer.',
  },
  {
    num: '05',
    title: 'When metal appears dark, check layout before cutting',
    desc: 'Dark metal does not necessarily mean the metal layer itself is defective. Always check the layout to see how it connects downward, identify the open via/CT location, then cut the cross-section. Cutting directly below the VC-abnormal metal may miss the actual defect.',
  },
  {
    num: '06',
    title: 'Inline PID cases can resemble ESD fails',
    desc: 'Plasma Induced Damage (PID) can produce failure morphologies very similar to ESD test failures, causing confusion. Distinguish by testing conditions, failure distribution (inline vs. post-test), and detailed analysis — this is a well-documented lesson.',
  },
];

const specialTechniques = [
  {
    title: 'FIB/I-beam Assisted Memory Scramble Establishment',
    desc: 'When precise dummy bit counting is needed, use FIB/I-beam to manufacture a defect at a known bit, store the image, perform testing, and validate without requiring additional FA. This enables rapid memory address-to-physical location mapping.',
  },
  {
    title: 'FIB Trenching for New Product Structure Learning',
    desc: 'Dig trenches around the target point to expose structures at different layers. This is especially helpful for products with varying layer counts per address. Quickly understand the new product metal/via layer stack structure.',
  },
  {
    title: 'Trenching / Pt Deposition for Improved Polishing Planarity',
    desc: 'Dig trenches around the target and fill with harder metal (Pt) to create support structures. This reduces edge effects and pattern effects while lowering polishing rate and improving controllability.',
  },
  {
    title: 'Test Board Assisted Dynamic Electrical Analysis',
    desc: 'Use a test board to apply dynamic bias during EMMI/OBIRCH analysis, capturing failure points that only appear during dynamic operating conditions and not under static bias.',
  },
];

export default function LessonLearning() {
  const headerReveal = useScrollReveal();
  const lessonsReveal = useScrollReveal();
  const techReveal = useScrollReveal();

  return (
    <section id="lessons" className="relative py-24 md:py-32 bg-[#0d121f]" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerReveal.ref} className={`mb-16 transition-all duration-700 ${headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">Best Practices & Techniques</p>
          <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Best Practices</h2>
          <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">Six core lessons learned from extensive real-case experience, plus four specialized FA techniques to improve analysis efficiency and avoid common pitfalls.</p>
        </div>

        <div ref={lessonsReveal.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 transition-all duration-700 delay-100 ${lessonsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {lessons.map((l) => (
            <div key={l.num} className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6 hover:border-[rgba(0,212,255,0.2)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center">
                  <span className="text-[#00d4ff] text-sm font-bold">{l.num}</span>
                </div>
                <h3 className="text-[#f1f5f9] text-sm font-medium leading-snug">{l.title}</h3>
              </div>
              <p className="text-[#94a3b8] text-xs leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>

        <div ref={techReveal.ref} className={`transition-all duration-700 delay-200 ${techReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-6">Specialized FA Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {specialTechniques.map((t) => (
              <div key={t.title} className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                <h4 className="text-[#f1f5f9] text-sm font-medium mb-2">{t.title}</h4>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
