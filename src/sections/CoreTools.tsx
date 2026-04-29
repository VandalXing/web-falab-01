import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const allTools = [
  {
    id: 'sem', label: 'SEM', labelZh: 'Scanning Electron Microscope', icon: '🔬',
    principle: 'SEM uses a focused high-energy electron beam to scan the sample surface. By detecting secondary electrons (SE), backscattered electrons (BSE), and other signals, it acquires surface morphology and compositional information. Secondary electrons originate from 1-10nm depth providing high-resolution topography; backscattered electrons come from deeper regions providing compositional contrast. Modern FE-SEM achieves ~1nm resolution.',
    specs: [
      { label: 'Resolution', value: '~1nm (FE-SEM)' },
      { label: 'Accelerating Voltage', value: '0.5kV - 30kV' },
      { label: 'Magnification', value: '10x - 1,000,000x' },
      { label: 'Stage Tilt', value: 'Typically >= 15 degrees' },
    ],
    applications: [
      'High-resolution surface morphology observation (Top View)',
      'Layer-by-layer deprocessing inspection',
      'Voltage Contrast (VC) analysis for open/short localization',
      'Focus and astigmatism correction for optimal imaging',
      'Failure site documentation at high magnification',
    ],
    faUsage: [
      'After delayering to target layer, use 5kV low voltage to inspect metal lines for opens',
      'Use Passive Voltage Contrast (PVC) to observe floating/open metal lines by grayscale difference',
      'Use high voltage to view underlying metal and confirm true via open',
      'Layer-by-layer VC comparison between Fail and Pass dies to identify the difference layer',
      'Tilt sample 15-30 degrees to enhance SE emission and improve topographic imaging',
    ],
    images: ['/images/cn_page18_img1.jpeg', '/images/en_page25_img3.png'],
    imageCaption: 'Layer-by-layer SEM deprocessing: M2, V1, M1, CT/Poly, AA layers (left) and SEM metal line defect (right)',
    subTechniques: [
      {
        name: 'EDS / EDX', nameFull: 'Energy Dispersive X-ray Spectroscopy',
        principle: 'When the high-energy electron beam strikes the sample, inner-shell electrons are ejected and outer-shell electrons transition to fill the vacancies, emitting characteristic X-rays. The EDS detector (Si(Li) or SDD) measures the energy distribution of these X-rays to determine elemental composition of a micro-region (~1 um). Each element has a unique X-ray energy fingerprint.',
        specs: [
          { label: 'Detectable Elements', value: 'Be(4) - U(92)' },
          { label: 'Energy Resolution', value: '~130eV (Mn K@5.9keV)' },
          { label: 'Spatial Resolution', value: '~0.5-2 um (SEM mode)' },
          { label: 'Detection Limit', value: '0.1-1 wt%' },
        ],
        applications: [
          'Micro-region elemental qualitative and quantitative analysis',
          'Line Scan — elemental distribution along a cross-section',
          'Elemental Mapping — 2D elemental distribution imaging',
          'Foreign particle / contamination identification',
          'Inter-metallic compound (IMC) composition verification',
        ],
        faUsage: [
          'Point analysis on discolored/corroded metal lines to identify abnormal elements (Cl, S corrosion sources)',
          'Line scan on via/contact cross-section to confirm barrier metal (Ta/TaN, Ti/TiN) presence',
          'Particle contaminant composition analysis to trace contamination source (Al particles, Cu residue)',
          'Compare composition between normal and abnormal regions to identify differences',
        ],
      },
      {
        name: 'EBIC', nameFull: 'Electron Beam Induced Current',
        principle: 'The electron beam generates electron-hole pairs (EHP) in the semiconductor. Built-in electric fields at p-n junctions or Schottky barriers separate these carriers, producing a measurable current. EBIC scans the electron beam across the sample and maps the current signal to form an image of the device electrical structure. Bright regions indicate efficient carrier collection (active junctions); dark regions indicate defects or recombination centers. Each incident electron can generate multiple EHP pairs, so EBIC signal can exceed the beam current.',
        specs: [
          { label: 'Lateral Resolution', value: '20-500nm' },
          { label: 'Signal Current', value: 'pA - nA' },
          { label: 'Accelerating Voltage', value: '5-30kV (controls depth)' },
          { label: 'Bias Condition', value: 'Zero or reverse bias' },
        ],
        applications: [
          'p-n junction location and delineation imaging',
          'Electrically active defect localization (dislocations, grain boundaries show as dark spots)',
          'Minority carrier diffusion length measurement',
          'Latch-up analysis — identifying parasitic thyristor structures',
          'ESD damage site localization',
        ],
        faUsage: [
          'SOI device leakage: EBIC locates junction leakage point -> FIB/SEM confirmation',
          'Bipolar device junction anomaly: EBIC shows junction morphology vs. normal comparison',
          'MOSFET polysilicon gate defect: EBIC rapidly localizes high-resistance defects (1-probe for kOhm range, 2-probe for MOhm range)',
          'Correlate EBIC dark spots with physical defects through FIB cross-section',
        ],
      },
    ],
  },
  {
    id: 'tem', label: 'TEM', labelZh: 'Transmission Electron Microscope', icon: '🎯',
    principle: 'TEM uses a high-energy electron beam (80-300kV) transmitted through an ultra-thin sample (<100nm). Due to the extremely short electron wavelength (~0.0025nm at 200kV), atomic-scale resolution cross-sectional structure information is obtained. Electrons undergo elastic scattering (forming diffraction patterns) and inelastic scattering (energy loss) for imaging and compositional analysis respectively. FIB lift-out is required for sample preparation.',
    specs: [
      { label: 'Resolution', value: '~0.1nm (atomic level)' },
      { label: 'Accelerating Voltage', value: '80kV - 300kV' },
      { label: 'Sample Thickness', value: '< 100nm' },
      { label: 'Preparation', value: 'FIB lift-out / ion milling' },
    ],
    applications: [
      'Atomic-scale resolution cross-sectional structure analysis',
      'Precise thin film thickness measurement (error < 5%)',
      'Interface morphology and crystalline defect observation',
      'Junction Stain to reveal S/D, LDD, Well profiles',
      'Selected Area Electron Diffraction (SAED) for crystal structure',
    ],
    faUsage: [
      'Measure critical dimensions: poly linewidth, gate oxide thickness',
      'Junction Stain TEM to confirm ion implantation profile anomalies (e.g., NLDD missing)',
      'Via/Contact cross-section to confirm bottom morphology and barrier coverage',
      'Multi-layer metal structure: relative position and thickness of each layer',
      'FIB lift-out preparation followed by cross-sectional TEM analysis',
    ],
    images: ['/images/cn_page5_img1.jpeg', '/images/cn_page20_img1.jpeg'],
    imageCaption: 'TEM cross-section of via chain structure (left) and Nanoprobe + Junction Stain TEM comparison: Fail vs Pass with X-OVL measurements (right)',
    subTechniques: [
      {
        name: 'EDS (TEM-EDS)', nameFull: 'TEM-Energy Dispersive X-ray Spectroscopy',
        principle: 'TEM-EDS operates on the same principle as SEM-EDS but in TEM the higher electron energy (200-300kV) and thinner sample result in lower X-ray yield. Modern TEM with large solid-angle SDD detectors significantly improves detection efficiency. In STEM mode, nanometer-scale spatial resolution elemental mapping is achieved. Due to minimal beam broadening in TEM (<1nm), spatial resolution far exceeds SEM-EDS.',
        specs: [
          { label: 'Spatial Resolution', value: '< 1nm (STEM mode)' },
          { label: 'Detectable Elements', value: 'B(5) - U(92)' },
          { label: 'Detection Limit', value: '0.1-1 at%' },
          { label: 'Detector', value: 'Large solid-angle SDD' },
        ],
        applications: [
          'Nanometer-scale spatial resolution elemental mapping',
          'Interfacial elemental interdiffusion analysis',
          'Ultra-thin film composition confirmation',
          'Particle/precipitate composition identification',
          'Line scan for multi-layer film composition gradient',
        ],
        faUsage: [
          'Via cross-section line scan to confirm barrier layer (Ta/TaN) coverage integrity',
          'Contact interface analysis to confirm silicide formation quality (NiSi, CoSi2, TiSi2)',
          'Nano-scale inter-metallic compound composition verification',
          'Gate oxide impurity (F, N) distribution analysis',
        ],
      },
      {
        name: 'EELS', nameFull: 'Electron Energy Loss Spectroscopy',
        principle: 'EELS detects the energy loss spectrum of electrons transmitted through the sample. When incident electrons undergo inelastic scattering with sample atoms, they lose specific energy (e.g., exciting inner-shell electron transitions). A magnetic prism spectrometer analyzes the energy distribution of outgoing electrons to obtain elemental composition and chemical state information. EELS energy resolution <1eV (superior to EDS ~130eV), with much higher detection efficiency for light elements (Li, B, C, N, O). EELS can also analyze chemical bonding states and band structures.',
        specs: [
          { label: 'Energy Resolution', value: '< 1.0 eV (FEG-TEM)' },
          { label: 'Spatial Resolution', value: '< 1nm (STEM-EELS)' },
          { label: 'Light Element Advantage', value: 'Li, B, C, N, O >> EDS' },
          { label: 'Additional Info', value: 'Chemical state, band structure, thickness' },
        ],
        applications: [
          'High-sensitivity detection of light elements (Li, B, C, N, O)',
          'Elemental chemical state analysis (oxidation state, bonding)',
          'Nanometer-scale spatial resolution elemental mapping',
          'Thin film thickness measurement (via plasmon peak in low-loss spectrum)',
          'Band structure and bandgap analysis',
        ],
        faUsage: [
          'DRAM capacitor high-k dielectric (HfO2, ZrO2) composition and chemical state confirmation',
          'Gate oxide N element distribution and bonding analysis (Si-N, Si-O-N)',
          'Low-k dielectric material C, H, O composition confirmation',
          'Li-ion battery material Li distribution mapping (EELS unique capability)',
          'Distinguish different oxidation states (e.g., Fe2+ vs Fe3+)',
        ],
      },
    ],
  },
  {
    id: 'fib', label: 'FIB', labelZh: 'Focused Ion Beam', icon: '⚡',
    principle: 'FIB uses a focused Ga+ or Xe plasma ion beam to sputter the sample surface, enabling precise cutting, deposition, and imaging. Modern Plasma FIB with Xe ion source can process larger areas (~1mm cross-section) with reduced Ga contamination. In dual-beam FIB-SEM systems, the electron beam provides high-resolution imaging while the ion beam performs cutting and sample preparation.',
    specs: [
      { label: 'Ion Source', value: 'Ga LMIS / Xe Plasma' },
      { label: 'Accelerating Voltage', value: '1kV - 30kV' },
      { label: 'Beam Current', value: '1pA - 65nA (Plasma FIB)' },
      { label: 'Precision', value: 'nm-level positioning' },
    ],
    applications: [
      'Precise cross-section cutting',
      'TEM sample preparation (lift-out / lamella)',
      'Circuit editing (CE)',
      'Pt/C deposition for protection and conductive pathways',
      'Laser mark for position reference',
    ],
    faUsage: [
      'Cut cross-section at hotspot location to confirm defect morphology',
      'Place markers to assist subsequent OM/FIB positioning',
      'Cross-section via/metal layers to confirm open/bridge',
      'Trenching method to expose target structures and learn new product layer stacks',
      'Pt deposition/trenching support to improve polishing planarity',
    ],
    images: ['/images/cn_page20_img2.jpeg', '/images/cn_page9_img1.jpeg'],
    imageCaption: 'FIB-SEM test setup for EMMI/OBIRCH (left) and Complete Via Open case: I-V curves, backside EMMI, Layout trace, VC, and TEM cross-section (right)',
    subTechniques: [
      {
        name: 'EBAC / RCI', nameFull: 'Electron Beam Absorbed Current / Resistive Contrast Imaging',
        principle: 'EBAC is a SEM-nanoprobing derivative technique. As the electron beam penetrates the sample surface, the electron current is absorbed by a nanoprobe, amplified, and mapped as an EBAC image overlaid on the SEM image. If a metal line or via chain is broken or open, the EBAC image shows a sudden change at the breakpoint. RCI (Resistive Contrast Imaging) uses two probes for high-resistance structure localization. EBAC signal current <= incident beam current.',
        specs: [
          { label: 'Detectable Current', value: 'pA level' },
          { label: 'Penetration Depth', value: 'Depends on kV and material' },
          { label: 'Resolution', value: '~10nm (SEM beam limit)' },
          { label: 'Sample State', value: 'No delayering needed, through passivation' },
        ],
        applications: [
          'Metal line open (Open) precise localization',
          'Via chain high-resistance / open localization',
          'Short / bridge localization — intersection of two different net highlights',
          'Advanced FinFET device nanometer-scale short localization',
          'Combined with EBIRCh for higher resolution fault isolation',
        ],
        faUsage: [
          'Advanced FinFET short: EBAC identifies fail net and aggressor net -> intersection is bridge suspect',
          'Multi-layer metal open: EBAC probes layer by layer to find the break layer',
          'High-resistance via: dual-probe RCI technique for precise partially-connected via localization',
          'Combined with nanoprobing: EBAC coarse localization -> nanoprobe precise positioning -> FIB confirmation',
        ],
      },
      {
        name: 'EBIRCh', nameFull: 'Electron Beam Induced Resistance Change',
        principle: 'EBIRCh is a recently developed SEM-derived fault isolation technique. The electron beam acts as a stimulator, and its interaction with defects induces current changes that are mapped onto the SEM image. Unlike OBIRCh (optical stimulation), EBIRCh uses electron beam excitation with higher resolution (~10nm vs ~1um) and is not affected by metal layer遮挡. Suitable for nanometer-scale defect localization at advanced process nodes.',
        specs: [
          { label: 'Stimulator', value: 'Focused electron beam' },
          { label: 'Resolution', value: '~10nm' },
          { label: 'Detected Signal', value: 'Resistance change (dR)' },
          { label: 'Mode', value: 'Single or multi-probe' },
        ],
        applications: [
          'Advanced node nanometer-scale defect localization',
          'Metal line resistance anomaly (high-res / micro-open) localization',
          'Combined with EBAC to improve localization precision',
          'Post-delayering specific metal layer defect localization',
        ],
        faUsage: [
          'FinFET high-resolution short: EBAC coarse -> EBIRCh precise (~10nm) -> FIB confirmation',
          'Detect invisible defects (nanometer-scale defects invisible to SEM) with precise localization',
          'Combined with EBAC to form a complete fault isolation solution',
        ],
      },
    ],
  },
  {
    id: 'nanoprober', label: 'Nanoprober', labelZh: 'Nano-Probing System', icon: '📐',
    principle: 'Nanoprober operates inside an SEM or dedicated vacuum chamber, using nanometer-precision probes (tip radius <50nm) to directly contact test points on the chip surface, enabling electrical characterization of individual transistors or circuit nodes. Modern nanoprobers feature multiple probes (4-8) for simultaneous multi-node measurement and support EBAC/RCI modes.',
    specs: [
      { label: 'Probe Tip Radius', value: '< 50nm' },
      { label: 'Positioning Accuracy', value: 'Sub-micron' },
      { label: 'Measurement Range', value: 'fA - mA / nV - V' },
      { label: 'Modes', value: 'I-V, C-V, Pulse, EBAC' },
    ],
    applications: [
      'Individual transistor electrical parameter measurement (Id-Vg, Id-Vd)',
      'Parametric comparison between failed and normal devices',
      'SRAM Cell PU/PD/PG transistor individual characterization',
      'Vt shift, Idsat degradation confirmation',
      'EBAC/RCI mode for open/short localization',
      'Non-destructive electrical data acquisition',
    ],
    faUsage: [
      'NLDD missing: confirm single/bilateral Idsat reduction and Vt increase',
      'Dope shift induced Vt shift analysis',
      'SRAM single-bit failure: individual cell transistor parameter measurement',
      'Compare with Pass die to precisely identify abnormal transistor',
      'Combined with EBAC: coarse -> precise -> FIB confirmation chain',
    ],
    images: ['/images/cn_page20_img1.jpeg'],
    imageCaption: 'Nanoprobe + Junction Stain TEM analysis: I-V curves showing Fail PU higher Vt and lower Id, SEM top view, and Stain TEM comparison with X-OVL measurement',
    subTechniques: [],
  },
  {
    id: 'ofi', label: 'OFI', labelZh: 'Optical Fault Isolation', icon: '🔦',
    principle: 'OFI includes two major categories: photon emission (EMMI/PEM) and thermal emission (OBIRCH/TIVA). EMMI captures near-infrared photons from electron-hole recombination at defect sites (Si bandgap ~1.1um corresponds to ~1100nm). OBIRCH uses 1340nm/1064nm laser scanning; defects exhibit resistance changes due to thermal expansion coefficient differences. Both rely on the principle that defects dissipate energy as light or heat.',
    specs: [
      { label: 'EMMI Band', value: '400nm - 1700nm (Si ~1.1um)' },
      { label: 'OBIRCH Laser', value: '1340nm / 1064nm' },
      { label: 'Temperature Sensitivity', value: 'mK level (Lock-in)' },
      { label: 'Analysis Side', value: 'Frontside / Backside' },
    ],
    applications: [
      'EMMI: Capture photon emission from leakage (gate oxide breakdown, junction leakage)',
      'OBIRCH/TIVA: Localize shorts, high-resistance, and ESD damage hotspots',
      'LADA/SDL: Detect marginal failure critical operating points',
      'Lock-in Thermography: 3D hotspot localization',
      'Backside analysis to bypass frontside metal obstruction',
    ],
    faUsage: [
      'GOI gate oxide breakdown: EMMI captures photons at breakdown point -> FIB/TEM analysis',
      'O/S/Leakage fail: OBIRCH hotspot -> Layout confirmation -> FIB cross-section',
      'ESD failure: backside OBIRCH -> delayer -> HF to AA -> OM/SEM observation',
      'Samples without leakage may still show hotspots (e.g., ESD HBM fail)',
      'Hotspots may not indicate the actual defect location (load-induced hotspots)',
    ],
    images: ['/images/cn_page19_img2.jpeg', '/images/cn_page14_img1.jpeg'],
    imageCaption: 'EMMI/OBIRCH test setup with DUT socket and emission detector (left) and ESD case: I-V curve, OBIRCH no hotspot, backside EMMI 5x/20x/100x showing burn-out (right)',
    subTechniques: [
      {
        name: 'OBIRCh', nameFull: 'Optical Beam Induced Resistance Change',
        principle: 'OBIRCh uses near-infrared laser (typically 1340nm, Si semi-transparent band) to scan the sample surface. Laser irradiation causes local temperature rise (~mK). Defects (cracks, voids, impurities) have different thermal expansion coefficients, causing local resistance changes. Lock-in amplification detects weak resistance change signals (dR/R ~10^-6), mapping them onto an optical image. Resolution is limited by laser wavelength (~1um).',
        specs: [
          { label: 'Laser Wavelength', value: '1340nm (primary) / 1064nm' },
          { label: 'Temperature Change', value: '~mK level' },
          { label: 'Sensitivity', value: 'dR/R ~ 10^-6' },
          { label: 'Spatial Resolution', value: '~1um (diffraction limit)' },
        ],
        applications: [
          'Metal line short/leakage hotspot localization',
          'Via/Contact high-resistance localization',
          'ESD damage burn area localization',
          'Gate oxide leakage (GOI) localization',
          'Backside analysis to bypass frontside metal obstruction',
        ],
        faUsage: [
          'Leakage fail: OBIRCh hotspot -> Layout confirmation -> FIB cross-section analysis',
          'ESD analysis: backside OBIRCh -> delayer -> HF to AA -> OM/SEM observation',
          'LADA (Laser Assisted Device Alteration) for marginal failure critical point',
          'MIM capacitor: note hotspot may be at load-heavy location, not actual defect',
        ],
      },
      {
        name: 'EMMI / PEM', nameFull: 'Photoemission Microscopy',
        principle: 'EMMI uses a high-sensitivity cooled CCD or InGaAs camera to capture near-infrared photon emission from semiconductor device defects. Multiple failure mechanisms produce photons: junction reverse bias leakage, gate oxide tunneling current, latch-up, hot carrier injection, etc. Photon wavelength reflects defect type; intensity reflects leakage magnitude. Modern EMMI systems can detect nW-level weak optical signals.',
        specs: [
          { label: 'Detection Band', value: '400nm - 1700nm' },
          { label: 'Sensitivity', value: '~nW-level weak signal' },
          { label: 'Detector', value: 'Cooled CCD / InGaAs camera' },
          { label: 'Resolution', value: '~1um (optical diffraction limit)' },
        ],
        applications: [
          'Gate oxide breakdown (GOI) localization — breakdown point emits light',
          'p-n junction reverse leakage localization',
          'Latch-up emission localization',
          'Hot carrier emission detection',
          'Backside PEM to bypass metal layer obstruction',
        ],
        faUsage: [
          'GOI fail: EMMI localizes emission point -> FIB to gate -> TEM confirms breakdown morphology',
          'I/O unit leakage: EMMI localization -> delayer -> layer-by-layer leakage confirmation',
          'Complementary to OBIRCh: EMMI sensitive to photons, OBIRCh sensitive to resistance changes',
          'Note: some failures do not produce photons (pure mechanical damage), require other techniques',
        ],
      },
    ],
  },
];

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

export default function CoreTools() {
  const [activeTab, setActiveTab] = useState('sem');
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const tool = allTools.find((t) => t.id === activeTab);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setActiveSub(null);
  };

  return (
    <section id="tools" className="relative py-24 md:py-32 bg-[#0d121f]" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="Core Analytical Tools & Sub-Techniques" title="Analytical Tools & Techniques" desc="In-depth coverage of SEM, TEM, FIB, Nanoprober, and OFI — including EDS, EELS, EBAC, EBIC, EBIRCh, OBIRCh, and EMMI sub-techniques with principles, specifications, and FA applications." />

        <div className="flex flex-wrap gap-3 mb-8">
          {allTools.map((t) => (
            <button key={t.id} onClick={() => handleTabChange(t.id)} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === t.id ? 'bg-[rgba(0,212,255,0.12)] text-[#00d4ff] border border-[rgba(0,212,255,0.3)]' : 'bg-transparent text-[#94a3b8] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(148,163,184,0.3)] hover:text-[#f1f5f9]'}`}>
              <span className="mr-1.5">{t.icon}</span><span>{t.label}</span><span className="hidden sm:inline ml-1.5 text-[#64748b]">· {t.labelZh}</span>
            </button>
          ))}
        </div>

        {tool && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                  <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">Operating Principle</h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">{tool.principle}</p>
                </div>
                <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                  <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {tool.specs.map((s) => (<div key={s.label} className="bg-[#0d121f] rounded-lg p-3"><p className="text-[#64748b] text-xs mb-1">{s.label}</p><p className="text-[#f1f5f9] text-sm font-medium">{s.value}</p></div>))}
                  </div>
                </div>
                <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                  <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">Key Applications</h3>
                  <ul className="space-y-2">{tool.applications.map((app, i) => (<li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 shrink-0" /><span className="text-[#94a3b8] text-sm">{app}</span></li>))}</ul>
                </div>
                <div className="bg-[#111827] border border-[rgba(0,212,255,0.15)] rounded-xl p-6">
                  <h3 className="text-[#00d4ff] font-semibold text-base mb-3">Typical FA Procedures</h3>
                  <ul className="space-y-2">{tool.faUsage.map((u, i) => (<li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 shrink-0" /><span className="text-[#94a3b8] text-sm">{u}</span></li>))}</ul>
                </div>
              </div>
              <div className="space-y-4">
                {tool.images.map((img, idx) => (
                  <div key={idx} className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
                    <img src={img} alt={`${tool.label} ${idx + 1}`} className="w-full h-auto object-contain" />
                  </div>
                ))}
                <p className="text-[#64748b] text-xs text-center">{tool.imageCaption}</p>
              </div>
            </div>

            {tool.subTechniques.length > 0 && (
              <div className="mt-12">
                <h3 className="text-[#f1f5f9] font-semibold text-lg mb-6">Associated Sub-Techniques</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.subTechniques.map((sub) => (
                    <button key={sub.name} onClick={() => setActiveSub(activeSub === sub.name ? null : sub.name)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeSub === sub.name ? 'bg-[rgba(0,212,255,0.12)] text-[#00d4ff] border border-[rgba(0,212,255,0.3)]' : 'bg-[#111827] text-[#94a3b8] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(148,163,184,0.3)]'}`}>{sub.name}</button>
                  ))}
                </div>
                {tool.subTechniques.map((sub) => activeSub === sub.name && (
                  <div key={sub.name} className="bg-[#111827] border border-[rgba(0,212,255,0.15)] rounded-xl p-6 md:p-8 animate-[fadeIn_0.3s_ease-out]">
                    <div className="mb-4"><h4 className="text-[#00d4ff] font-semibold text-base">{sub.name}</h4><p className="text-[#64748b] text-xs mt-1">{sub.nameFull}</p></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div><h5 className="text-[#f1f5f9] text-sm font-medium mb-2">Operating Principle</h5><p className="text-[#94a3b8] text-xs leading-relaxed">{sub.principle}</p></div>
                        <div><h5 className="text-[#f1f5f9] text-sm font-medium mb-2">Specifications</h5><div className="grid grid-cols-2 gap-2">{sub.specs.map((s) => (<div key={s.label} className="bg-[#0d121f] rounded-lg p-2.5"><p className="text-[#64748b] text-[11px] mb-0.5">{s.label}</p><p className="text-[#f1f5f9] text-xs font-medium">{s.value}</p></div>))}</div></div>
                        <div><h5 className="text-[#f1f5f9] text-sm font-medium mb-2">Key Applications</h5><ul className="space-y-1.5">{sub.applications.map((app, i) => (<li key={i} className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#00d4ff] mt-1.5 shrink-0" /><span className="text-[#94a3b8] text-xs">{app}</span></li>))}</ul></div>
                        <div className="bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.1)] rounded-lg p-4"><h5 className="text-[#00d4ff] text-sm font-medium mb-2">FA Procedures</h5><ul className="space-y-1.5">{sub.faUsage.map((u, i) => (<li key={i} className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#00d4ff] mt-1.5 shrink-0" /><span className="text-[#94a3b8] text-xs">{u}</span></li>))}</ul></div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#0d121f] border border-[rgba(148,163,184,0.08)] rounded-lg p-4 w-full">
                          <p className="text-[#f1f5f9] text-xs font-medium mb-3">Technical Comparison</p>
                          {sub.name.includes('EDS') && !sub.name.includes('TEM') && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Energy Resolution</span><span className="text-[#f1f5f9]">EDS: ~130eV</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Light Elements</span><span className="text-[#f1f5f9]">EELS &gt;&gt; EDS</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Heavy Elements</span><span className="text-[#f1f5f9]">EDS &gt; EELS</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Chemical State</span><span className="text-[#f1f5f9]">Only EELS</span></div>
                              <div className="flex justify-between py-1.5"><span className="text-[#94a3b8]">Spatial Res. (TEM)</span><span className="text-[#f1f5f9]">&lt;1nm both</span></div>
                            </div>
                          )}
                          {sub.name.includes('EELS') && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Energy Resolution</span><span className="text-[#f1f5f9]">EELS: &lt;1eV</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Light Elements</span><span className="text-[#f1f5f9]">EELS &gt;&gt; EDS</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Chemical State</span><span className="text-[#f1f5f9]">EELS unique</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Bandgap Analysis</span><span className="text-[#f1f5f9]">EELS unique</span></div>
                              <div className="flex justify-between py-1.5"><span className="text-[#94a3b8]">Complexity</span><span className="text-[#f1f5f9]">EELS &gt; EDS</span></div>
                            </div>
                          )}
                          {sub.name.includes('EBAC') && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Signal Source</span><span className="text-[#f1f5f9]">Absorbed e- current</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">I_EBAC vs I_Beam</span><span className="text-[#f1f5f9]">I_EBAC &le; I_Beam</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">vs EBIC</span><span className="text-[#f1f5f9]">EBAC absorbs, EBIC induces</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">RCI Mode</span><span className="text-[#f1f5f9]">Dual-probe for high-R</span></div>
                              <div className="flex justify-between py-1.5"><span className="text-[#94a3b8]">Resolution</span><span className="text-[#f1f5f9]">~10nm (SEM limit)</span></div>
                            </div>
                          )}
                          {sub.name.includes('EBIRCh') && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Stimulator</span><span className="text-[#f1f5f9]">e-beam (vs light in OBIRCh)</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Resolution</span><span className="text-[#f1f5f9]">~10nm (vs ~1um OBIRCh)</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Signal</span><span className="text-[#f1f5f9]">Resistance change dR</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Metal Blocking</span><span className="text-[#f1f5f9]">Not affected</span></div>
                              <div className="flex justify-between py-1.5"><span className="text-[#94a3b8]">Target Nodes</span><span className="text-[#f1f5f9]">Advanced FinFET &lt;7nm</span></div>
                            </div>
                          )}
                          {(sub.name.includes('OBIRCh') || sub.name.includes('EMMI')) && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Excitation</span><span className="text-[#f1f5f9]">{sub.name.includes('OBIRCh') ? 'Laser thermal' : 'e-beam electrical'}</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Signal</span><span className="text-[#f1f5f9]">{sub.name.includes('OBIRCh') ? 'dR resistance' : 'NIR photons'}</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Resolution</span><span className="text-[#f1f5f9]">{sub.name.includes('OBIRCh') ? '~1um (diffraction)' : '~1um'}</span></div>
                              <div className="flex justify-between py-1.5 border-b border-[rgba(148,163,184,0.08)]"><span className="text-[#94a3b8]">Backside</span><span className="text-[#f1f5f9]">Both supported</span></div>
                              <div className="flex justify-between py-1.5"><span className="text-[#94a3b8]">Complementary</span><span className="text-[#f1f5f9]">OBIRCh=heat, EMMI=light</span></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
