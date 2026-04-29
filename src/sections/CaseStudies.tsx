import { useScrollReveal } from '@/hooks/useScrollReveal';

const cases = [
  {
    id: 'via-open',
    category: 'WAT / Low Yield',
    title: 'Via-2 Open Detected by Backside EMMI with Layout Trace',
    image: '/images/cn_page9_img1.jpeg',
    imageCaption: 'Complete case documentation: (Top) I-V curves show Pass and Fail are comparable; OBIRCH found no hotspot. (Bottom) Backside EMMI at 5x, 20x, 100x revealed burn-out; Layout traced V2 open location and M3 VC location; TEM cross-section confirmed the open.',
    process: [
      { step: 'Electrical Test', desc: 'I-V curve characterization shows the Fail device and fresh device are comparable, suggesting a subtle defect not easily detected by standard electrical testing.' },
      { step: 'OBIRCH Analysis', desc: 'OBIRCH (Optical Beam Induced Resistance Change) scanning found no detectable hotspot, indicating the defect does not produce significant thermal signature.' },
      { step: 'Backside EMMI', desc: 'Backside EMMI (Emission Microscopy) at 5x, 20x, and 100x magnification revealed a clear photon emission spot — burn-out was found at the 100x zoom level, bypassing frontside metal obstruction.' },
      { step: 'Layout Trace', desc: 'Layout tracing correlated the EMMI hotspot location to the V2 (Via-2) open location in the M3 (Metal-3) routing layer, confirming the electrical path affected.' },
      { step: 'VC Comparison', desc: 'Voltage Contrast (VC) imaging at the M3 layer showed grayscale difference between Pass and Fail samples, further confirming an open in the via chain.' },
      { step: 'TEM Confirmation', desc: 'FIB cross-section followed by TEM imaging confirmed the Via-2 was not properly formed — a process issue at the via etch or fill step.' },
    ],
    lesson: 'When OBIRCH finds no hotspot but electrical abnormality persists, backside EMMI can bypass frontside metal layers and detect photon emission from the defect. Layout tracing is essential to correlate the physical location with the circuit net.',
    tags: ['Via-2 Open', 'Backside EMMI', 'Layout Trace', 'VC', 'TEM'],
  },
  {
    id: 'metal-barrier',
    category: 'Low Yield',
    title: 'SRAM Single-Bit Failure: Metal-1 Barrier / Cu Partial Missing',
    image: '/images/cn_page10_img1.jpeg',
    imageCaption: 'Case documentation: (Top) Layout tracing with fail path highlighted; SEM top-view of fail region. (Bottom) Pass vs Fail VC comparison showing grayscale difference at the fail location; FIB cross-section confirming Metal-1 barrier and Cu are partially missing.',
    process: [
      { step: 'Failure Symptom', desc: 'SRAM CP (Chip Probe) testing revealed a repeatable single-bit failure at a specific address, indicating a localized structural defect in the SRAM cell.' },
      { step: 'Layout Tracing', desc: 'The failing bit address was traced through the layout to identify the corresponding SRAM cell and the Metal-1 routing path connected to it.' },
      { step: 'VC Comparison', desc: 'Pass vs Fail Voltage Contrast (VC) SEM imaging was performed layer by layer. At the Metal-1 layer, a clear grayscale difference was observed between Pass and Fail samples at the suspected location.' },
      { step: 'FIB Cross-Section', desc: 'FIB (Focused Ion Beam) was used to cut a precise cross-section at the VC anomaly location, exposing the Metal-1 layer structure for TEM analysis.' },
      { step: 'TEM Confirmation', desc: 'TEM imaging of the FIB cross-section confirmed that the Metal-1 barrier layer and Cu fill were partially missing at the fail site, causing high resistance or open circuit.' },
    ],
    lesson: 'For SRAM single-bit failures, the systematic path is: address -> layout -> layer-by-layer VC comparison -> cross-section. Barrier/Cu missing typically relates to CMP over-polishing or insufficient barrier deposition.',
    tags: ['SRAM', 'Single-Bit', 'Metal-1 Barrier', 'VC Comparison', 'FIB/TEM'],
  },
  {
    id: 'nanoprobe-vt',
    category: 'Device Characterization',
    title: 'Nanoprobe + Junction Stain TEM: PU Transistor Vt Shift',
    image: '/images/cn_page20_img1.jpeg',
    imageCaption: 'Complete analysis: (Top-Left) Nanoprobe I-V curves show Fail PU has higher Vt and lower Id than Pass. (Top-Right) SEM top-view of the fail location. (Bottom) Junction Stain TEM comparison: Fail shows X-OVL=24.5nm vs Pass X-OVL=8.5nm, indicating significant junction profile shift. Stain: KOH:DI=10g:500ml, 80C, 2min.',
    process: [
      { step: 'Failure Symptom', desc: 'SRAM cell write/read failure was observed. The pull-up (PU) transistor showed abnormal electrical behavior affecting cell stability.' },
      { step: 'Nanoprobe I-V', desc: 'Nanoprobe direct contact I-V measurement on the SRAM cell transistors revealed the Fail PU has higher threshold voltage (Vt) and lower drain current (Id) compared to the Pass device, indicating device degradation.' },
      { step: 'SEM Top-View', desc: 'SEM top-view imaging of the Fail vs Pass locations showed subtle morphological differences in the polysilicon gate pattern.' },
      { step: 'Junction Stain TEM', desc: 'Junction Stain preparation (KOH:DI water = 10g:500ml, 80C, 2min) followed by TEM imaging revealed the junction profile difference: Fail X-OVL = 24.5nm vs Pass X-OVL = 8.5nm.' },
      { step: 'Root Cause', desc: 'The enlarged X-OVL (junction overlap) on the Fail device indicates a dope shift or photolithography misalignment during the LDD (Lightly Doped Drain) ion implantation step, causing Vt shift and Idsat degradation.' },
    ],
    lesson: 'Nanoprobe + Junction Stain TEM is a powerful combination for transistor-level failure analysis. The I-V curves identify the failing device electrically, while Junction Stain TEM reveals the physical junction profile difference quantitatively.',
    tags: ['Nanoprobe', 'Vt Shift', 'Junction Stain', 'TEM', 'LDD'],
  },
  {
    id: 'esd',
    category: 'Reliability',
    title: 'ESD Failure: Backside EMMI Localization with Burn-Out',
    image: '/images/cn_page14_img1.jpeg',
    imageCaption: 'ESD analysis flow: (Top-Left) I-V curve showing fail and fresh are comparable. (Top-Right) OBIRCH found no hotspot. (Bottom) Backside EMMI at 5x, 20x, and 100x progressively zooming into the burn-out location, revealing ESD damage site.',
    process: [
      { step: 'ESD Testing', desc: 'ESD stress testing (HBM - Human Body Model) was performed. Post-stress electrical test showed the device failed, but the I-V curve of the fail device was comparable to fresh, suggesting a subtle defect.' },
      { step: 'OBIRCH Screening', desc: 'OBIRCH scanning was performed but found no detectable hotspot, indicating the ESD damage does not produce sufficient thermal signature for OBIRCH detection.' },
      { step: 'Backside EMMI', desc: 'Backside EMMI was employed to bypass frontside metal layers. Starting at 5x for coarse localization, progressively zooming to 20x and then 100x, a clear burn-out spot was identified at the highest magnification.' },
      { step: 'Physical Analysis', desc: 'The EMMI hotspot location was marked and the sample was processed with HF (hydrofluoric acid) down to the AA (Active Area) layer to expose the underlying device structure.' },
      { step: 'OM/SEM Confirmation', desc: 'Optical microscope and SEM inspection at the burn-out location revealed melted Si and oxide rupture characteristics of ESD damage at the junction area.' },
    ],
    lesson: 'For ESD failures, the standard analysis path is: I-V confirmation -> backside OBIRCH/EMMI localization -> HF to AA layer -> observe burn morphology. Even without obvious leakage, EMMI can catch photon emission from ESD damage.',
    tags: ['ESD', 'HBM', 'Backside EMMI', 'Burn-Out', 'HF'],
  },
  {
    id: 'wat-yield',
    category: 'WAT Analysis',
    title: 'WAT Low Yield: Abnormal VC on Multiple Dies with TEM Confirmation',
    image: '/images/cn_page16_img1.jpeg',
    imageCaption: 'Case documentation: (Top-Left) CP wafer map showing multiple failing dies circled. (Top-Right) Abnormal VC vs Normal VC SEM comparison. (Bottom) FIB/TEM cross-sections revealing the physical defect causing the VC abnormality across multiple similar structures.',
    process: [
      { step: 'WAT Data', desc: 'CP (Chip Probe) testing revealed multiple failing dies on the wafer with similar failure signatures, suggesting a systematic process issue rather than random defect.' },
      { step: 'Wafer Map Analysis', desc: 'The CP wafer map was analyzed and failing dies were circled for targeted FA. The spatial distribution pattern suggested a process-related issue affecting specific structures.' },
      { step: 'VC Comparison', desc: 'Voltage Contrast (VC) SEM imaging was performed on both abnormal (Fail) and normal (Pass) structures. Clear grayscale difference was observed — the abnormal VC indicated an electrical anomaly (floating, open, or short).' },
      { step: 'Structure Correlation', desc: 'Multiple similar structures showed the same VC abnormality, confirming a systematic issue rather than a random defect. The affected structure type pointed to a specific process layer.' },
      { step: 'FIB/TEM Confirmation', desc: 'FIB cross-sections were prepared at the abnormal VC locations, followed by TEM imaging. The cross-sections revealed a physical defect (e.g., incomplete etch, residual material, or structural deformation) causing the electrical failure.' },
    ],
    lesson: 'When multiple dies show similar failure patterns, suspect a systematic process issue. VC comparison between Pass and Fail structures is an efficient screening method. Multiple structure correlation helps confirm the root cause layer.',
    tags: ['WAT', 'Low Yield', 'VC Comparison', 'FIB/TEM', 'Systematic'],
  },
  {
    id: 'emmi-dual',
    category: 'Fault Isolation',
    title: 'Dual Hotspot EMMI Localization on Failing Structures',
    image: '/images/cn_page25_img1.jpeg',
    imageCaption: 'EMMI dual hotspot analysis: (Top) Two hotspots S1 and S2 were found by EMMI, each with corresponding I-V curves. (Bottom) Progressive EMMI zoom at 20x and 100x for both hotspots, revealing emission points on the failing structures.',
    process: [
      { step: 'Failure Detection', desc: 'Electrical testing identified leakage in the device. Preliminary analysis suggested multiple potential defect sites.' },
      { step: 'EMMI Screening', desc: 'Emission Microscopy (EMMI) was performed to detect photon emission from leakage sites. Two distinct hotspots were identified — labeled S1 and S2 — each showing photon emission under bias.' },
      { step: 'I-V Characterization', desc: 'Individual I-V curves were measured for both S1 and S2 emission sites. The curves showed similar leakage characteristics, suggesting related failure mechanisms at both locations.' },
      { step: 'Progressive Zoom', desc: 'EMMI progressive zoom (20x to 100x) was performed on both hotspots to precisely locate the emission points on the device structures.' },
      { step: 'Physical Correlation', desc: 'The EMMI emission points were correlated with the device layout to identify the specific structures (e.g., junctions, gates, metal lines) responsible for the leakage at each hotspot.' },
    ],
    lesson: 'When EMMI detects multiple hotspots, individual I-V characterization of each hotspot helps determine if they share the same root cause. Progressive EMMI zoom (20x -> 100x) is essential for precise localization before destructive analysis.',
    tags: ['EMMI', 'Dual Hotspot', 'Photon Emission', 'I-V', 'Localization'],
  },
  {
    id: 'eds-comp',
    category: 'Composition Analysis',
    title: 'EDS Analysis: Tin (Sn) Contamination on Metal Lines',
    image: '/images/en_page26_img2.jpeg',
    imageCaption: 'EDS analysis result: (Top) Color-coded SEM image showing the region of interest on the metal line structure with contamination. (Bottom) EDS spectrum showing a clear Sn (Tin) peak at ~3.7 keV, along with C peak, confirming Sn contamination on the metal lines.',
    process: [
      { step: 'Visual Inspection', desc: 'SEM inspection of the metal line structure revealed anomalous material on the surface, appearing as discoloration or residue not present in reference samples.' },
      { step: 'EDS Point Analysis', desc: 'Energy Dispersive X-ray Spectroscopy (EDS) point analysis was performed on the anomalous region. The EDS spectrum showed a prominent Sn (Tin) peak at approximately 3.7 keV, confirming tin contamination.' },
      { step: 'Carbon Detection', desc: 'The EDS spectrum also showed a Carbon (C) peak, suggesting organic residue mixed with the tin contamination, possibly from solder flux or packaging material.' },
      { step: 'Mapping Analysis', desc: 'Elemental mapping was performed to visualize the distribution of Sn across the metal line structure, confirming the contamination was localized to specific areas.' },
      { step: 'Source Tracing', desc: 'The Sn contamination was traced to the solder bump reflow process, where tin residue was transferred to the metal lines during assembly, causing electrical anomalies.' },
    ],
    lesson: 'EDS is essential for identifying unknown materials and contamination. Even trace amounts of foreign elements (like Sn) can cause electrical failures. Always perform EDS on any anomalous material observed during SEM inspection.',
    tags: ['EDS', 'EDX', 'Sn Contamination', 'Elemental Analysis', 'Spectrum'],
  },
  {
    id: 'em-crack',
    category: 'Reliability',
    title: 'SEM Observation: Metal Line Crack Due to Electromigration Stress',
    image: '/images/en_page25_img3.png',
    imageCaption: 'SEM high-magnification image showing a clear crack running across the metal line. The crack appears as a dark line disrupting the metal continuity, typical of electromigration-induced voiding or mechanical stress failure in interconnects.',
    process: [
      { step: 'Failure Symptom', desc: 'Post-reliability testing (EM - Electromigration stress) showed resistance increase in the metal interconnect, indicating structural degradation.' },
      { step: 'SEM Inspection', desc: 'SEM top-view inspection at high magnification revealed a visible crack running across the metal line, disrupting electrical continuity.' },
      { step: 'Crack Characterization', desc: 'The crack morphology was characterized: it appears as a sharp dark line across the metal, suggesting either electromigration-induced void formation or mechanical stress cracking.' },
      { step: 'Cross-Section FIB', desc: 'FIB cross-section was prepared at the crack location to examine the crack depth and profile, confirming whether it penetrates the full metal thickness.' },
      { step: 'Root Cause', desc: 'The crack was attributed to a combination of electromigration stress and mechanical stress at a weak point in the metal line (e.g., grain boundary, interface), accelerated by high current density during operation.' },
    ],
    lesson: 'Metal line cracks visible in SEM top-view are often the result of cumulative stress (electromigration + mechanical). Always follow up with FIB cross-section to determine crack depth and whether it causes full or partial electrical open.',
    tags: ['EM', 'Crack', 'Metal Line', 'SEM', 'Reliability'],
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

export default function CaseStudies() {
  return (
    <section id="cases" className="relative py-24 md:py-32" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="Real-World Case Studies" title="Case Studies" desc="Eight carefully documented failure analysis cases with verified image associations. Each case includes the complete analysis flow from electrical detection through physical confirmation, with the actual images produced during analysis." />

        <div className="space-y-16">
          {cases.map((c) => {
            const reveal = useScrollReveal();
            return (
              <div key={c.id} ref={reveal.ref} className={`bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden transition-all duration-700 ${reveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="p-6 md:p-8 border-b border-[rgba(148,163,184,0.1)]">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[rgba(0,212,255,0.08)] text-[#00d4ff] text-xs font-medium">{c.category}</span>
                    {c.tags.map((tag) => (<span key={tag} className="px-2.5 py-0.5 rounded-full bg-[rgba(148,163,184,0.08)] text-[#94a3b8] text-[11px]">#{tag}</span>))}
                  </div>
                  <h3 className="text-[#f1f5f9] font-semibold text-xl">{c.title}</h3>
                </div>

                {/* Case Image — FULL WIDTH, accurately associated */}
                <div className="bg-[#0a0e17] border-b border-[rgba(148,163,184,0.1)]">
                  <img src={c.image} alt={c.title} className="w-full h-auto object-contain max-h-[600px]" />
                  <p className="text-[#64748b] text-xs py-3 px-6">{c.imageCaption}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8">
                    <h4 className="text-[#f1f5f9] font-medium text-sm mb-5">Analysis Flow</h4>
                    <div className="space-y-5">
                      {c.process.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-7 h-7 rounded-full bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] flex items-center justify-center shrink-0">
                              <span className="text-[#00d4ff] text-xs font-bold">{i + 1}</span>
                            </div>
                            {i < c.process.length - 1 && <div className="w-px flex-1 bg-[rgba(148,163,184,0.15)] my-1" />}
                          </div>
                          <div className="pb-2">
                            <p className="text-[#f1f5f9] text-sm font-medium mb-1">{step.step}</p>
                            <p className="text-[#94a3b8] text-xs leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 bg-[#0d121f] border-l border-[rgba(148,163,184,0.08)] flex items-center">
                    <div className="bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.12)] rounded-lg p-5 w-full">
                      <p className="text-[#00d4ff] text-xs font-medium mb-2">💡 Key Lesson</p>
                      <p className="text-[#94a3b8] text-xs leading-relaxed">{c.lesson}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
