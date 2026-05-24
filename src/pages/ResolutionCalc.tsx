import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Calculator } from 'lucide-react';

// Physical constants
const h = 6.626e-34; // Planck constant (J·s)
const m_e = 9.109e-31; // electron mass (kg)
const e = 1.602e-19; // elementary charge (C)
const c = 2.998e8; // speed of light (m/s)

function electronWavelength(V_kV: number): number {
  // Relativistic electron wavelength in nm
  const V = V_kV * 1000; // convert to V
  const numerator = h * c;
  const denominator = Math.sqrt(V * e * (2 * m_e * c * c + V * e));
  return (numerator / denominator) * 1e9; // convert to nm
}

function classicalWavelength(V_kV: number): number {
  // Classical approximation: λ(nm) = 1.226 / √V(kV)
  return 1.226 / Math.sqrt(V_kV);
}

export default function ResolutionCalc() {
  const [voltage, setVoltage] = useState(15); // kV
  const [cs, setCs] = useState(2); // mm
  const [alpha, setAlpha] = useState(10); // mrad

  const results = useMemo(() => {
    const lambda = electronWavelength(voltage); // nm
    const classical = classicalWavelength(voltage); // nm
    const alpha_rad = alpha * 1e-3; // convert mrad to rad
    const cs_nm = cs * 1e6; // convert mm to nm

    // Diffraction-limited resolution
    const d_diffraction = 0.61 * lambda / alpha_rad;

    // Spherical aberration-limited resolution (Scherzer)
    const d_aberration = 0.43 * Math.pow(cs_nm, 0.25) * Math.pow(lambda, 0.75);

    // Practical resolution (combined)
    const d_practical = Math.sqrt(d_diffraction * d_diffraction + d_aberration * d_aberration);

    return {
      lambda: lambda.toFixed(4),
      classical: classical.toFixed(4),
      d_diffraction: d_diffraction.toFixed(2),
      d_aberration: d_aberration.toFixed(2),
      d_practical: d_practical.toFixed(2),
      energy_J: (voltage * 1000 * e).toExponential(2),
    };
  }, [voltage, cs, alpha]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0e17] pt-24 pb-16" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-[#64748b] hover:text-[#00d4ff] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-[#64748b]">/</span>
          <span className="text-[#00d4ff] font-medium">Resolution Calculator</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-6 h-6 text-[#00d4ff]" />
            <h1 className="text-[#f1f5f9] font-bold text-3xl">SEM Resolution Calculator</h1>
          </div>
          <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">
            Interactive calculator for electron wavelength and SEM resolution based on accelerating voltage, spherical aberration coefficient (Cs), and convergence semi-angle (α). Based on standard electron optics principles from Gandhi Desk Reference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Panel */}
          <div className="space-y-6">
            {/* Inputs */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-5">Input Parameters</h3>

              {/* Voltage */}
              <div className="mb-5">
                <div className="flex justify-between mb-2">
                  <label className="text-[#94a3b8] text-sm">Accelerating Voltage (V₀)</label>
                  <span className="text-[#00d4ff] text-sm font-medium">{voltage} kV</span>
                </div>
                <input type="range" min={0.5} max={30} step={0.5} value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#1a2236] rounded-full appearance-none cursor-pointer accent-[#00d4ff]" />
                <div className="flex justify-between text-[#64748b] text-[11px] mt-1">
                  <span>0.5 kV</span><span>15 kV</span><span>30 kV</span>
                </div>
              </div>

              {/* Cs */}
              <div className="mb-5">
                <div className="flex justify-between mb-2">
                  <label className="text-[#94a3b8] text-sm">Spherical Aberration (Cs)</label>
                  <span className="text-[#00d4ff] text-sm font-medium">{cs} mm</span>
                </div>
                <input type="range" min={0.1} max={10} step={0.1} value={cs}
                  onChange={(e) => setCs(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#1a2236] rounded-full appearance-none cursor-pointer accent-[#00d4ff]" />
                <div className="flex justify-between text-[#64748b] text-[11px] mt-1">
                  <span>0.1 mm</span><span>5 mm</span><span>10 mm</span>
                </div>
              </div>

              {/* Alpha */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[#94a3b8] text-sm">Convergence Semi-Angle (α)</label>
                  <span className="text-[#00d4ff] text-sm font-medium">{alpha} mrad</span>
                </div>
                <input type="range" min={1} max={50} step={1} value={alpha}
                  onChange={(e) => setAlpha(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#1a2236] rounded-full appearance-none cursor-pointer accent-[#00d4ff]" />
                <div className="flex justify-between text-[#64748b] text-[11px] mt-1">
                  <span>1 mrad</span><span>25 mrad</span><span>50 mrad</span>
                </div>
              </div>
            </div>

            {/* Electron Wavelength */}
            <div className="bg-[#111827] border border-[rgba(0,212,255,0.15)] rounded-xl p-6">
              <h3 className="text-[#00d4ff] font-semibold text-base mb-4">Electron Wavelength</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0d121f] rounded-lg p-4 text-center">
                  <p className="text-[#64748b] text-xs mb-1">Relativistic λ</p>
                  <p className="text-[#f1f5f9] text-2xl font-bold">{results.lambda} <span className="text-sm font-normal text-[#94a3b8]">nm</span></p>
                </div>
                <div className="bg-[#0d121f] rounded-lg p-4 text-center">
                  <p className="text-[#64748b] text-xs mb-1">Classical approx.</p>
                  <p className="text-[#f1f5f9] text-2xl font-bold">{results.classical} <span className="text-sm font-normal text-[#94a3b8]">nm</span></p>
                </div>
              </div>
              <p className="text-[#64748b] text-xs mt-3">
                λ (nm) = h / √(2meV) for classical; relativistic correction applied for V &gt; 50 kV
              </p>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Resolution Results */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">Calculated Resolutions</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-[#0d121f]">
                  <span className="text-[#94a3b8] text-sm">Diffraction Limit (d = 0.61λ/α)</span>
                  <span className="text-[#f1f5f9] text-lg font-bold">{results.d_diffraction} nm</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-[#0d121f]">
                  <span className="text-[#94a3b8] text-sm">Aberration Limit (Scherzer)</span>
                  <span className="text-[#f1f5f9] text-lg font-bold">{results.d_aberration} nm</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.15)]">
                  <span className="text-[#00d4ff] text-sm font-medium">Practical Resolution (combined)</span>
                  <span className="text-[#00d4ff] text-2xl font-bold">{results.d_practical} nm</span>
                </div>
              </div>

              <div className="text-[#64748b] text-xs space-y-1">
                <p>• At {voltage} kV: λ = {results.lambda} nm</p>
                <p>• Electron energy: {results.energy_J} J</p>
                <p>• The practical resolution combines diffraction and aberration contributions in quadrature</p>
              </div>
            </div>

            {/* Reference Table */}
            <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">Reference: λ at Common Voltages</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(148,163,184,0.2)]">
                      <th className="text-left py-2 px-3 text-[#94a3b8] font-medium">Voltage (kV)</th>
                      <th className="text-left py-2 px-3 text-[#94a3b8] font-medium">Classical λ (nm)</th>
                      <th className="text-left py-2 px-3 text-[#94a3b8] font-medium">Relativistic λ (nm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 5, 10, 15, 20, 25, 30].map((v) => {
                      const cl = classicalWavelength(v);
                      const rel = electronWavelength(v);
                      return (
                        <tr key={v} className={`border-b border-[rgba(148,163,184,0.08)] ${v === voltage ? 'bg-[rgba(0,212,255,0.05)]' : ''}`}>
                          <td className="py-2 px-3 text-[#f1f5f9]">{v}</td>
                          <td className="py-2 px-3 text-[#94a3b8]">{cl.toFixed(4)}</td>
                          <td className="py-2 px-3 text-[#94a3b8]">{rel.toFixed(4)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Formula Reference */}
        <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
          <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">Key Formulas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0d121f] rounded-lg p-4">
              <p className="text-[#00d4ff] text-xs font-medium mb-2">Electron Wavelength (Classical)</p>
              <p className="text-[#f1f5f9] text-sm font-mono">λ = h / √(2meV)</p>
              <p className="text-[#64748b] text-xs mt-1">≈ 1.226 / √V(kV) nm</p>
            </div>
            <div className="bg-[#0d121f] rounded-lg p-4">
              <p className="text-[#00d4ff] text-xs font-medium mb-2">Diffraction Limit</p>
              <p className="text-[#f1f5f9] text-sm font-mono">d = 0.61 λ / α</p>
              <p className="text-[#64748b] text-xs mt-1">Rayleigh criterion for point resolution</p>
            </div>
            <div className="bg-[#0d121f] rounded-lg p-4">
              <p className="text-[#00d4ff] text-xs font-medium mb-2">Scherzer Resolution</p>
              <p className="text-[#f1f5f9] text-sm font-mono">d = 0.43 Cs^0.25 λ^0.75</p>
              <p className="text-[#64748b] text-xs mt-1">Spherical aberration limited optimum</p>
            </div>
          </div>
          <p className="text-[#64748b] text-xs mt-4">
            Note: For a modern FE-SEM with Cs = 1 mm at 15 kV, the aberration limit is typically the dominant factor. For aberration-corrected STEM (Cs → 0), information limit is determined by chromatic aberration and temporal coherence.
          </p>
        </div>
      </div>
    </div>
  );
}
