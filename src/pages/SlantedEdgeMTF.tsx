import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, BarChart3, Layers, Zap, Move, Image as ImageIcon, LineChart, Calculator } from 'lucide-react';

const steps = [
  {
    id: 1, title: 'ROI Selection', icon: ImageIcon,
    detail: 'Select region of interest (m lines x n pixels) surrounding the slanted edge. The edge should be oriented near-vertical (angle between 2-10 degrees from vertical) to enable effective projection-based oversampling.',
    formula: 'ROI = { pixels(x,y) | x in [x_min, x_max], y in [y_min, y_max] }',
  },
  {
    id: 2, title: 'OECF Application', icon: Zap,
    detail: 'Transform image data using the Opto-Electronic Conversion Function (OECF) to linearize the photometric response. This step converts raw pixel values to linear luminance values, compensating for non-linear sensor response.',
    formula: 'L(x,y) = OECF[ pixel_value(x,y) ]',
  },
  {
    id: 3, title: 'Luminance Computation', icon: Layers,
    detail: 'Compute luminance as a weighted sum of R, G, B channels at each pixel. For grayscale SEM images, this step may be skipped or use the raw intensity directly.',
    formula: 'Y = 0.2126 R + 0.7152 G + 0.0722 B (ITU-R BT.709)',
  },
  {
    id: 4, title: 'Edge Location Estimation', icon: Move,
    detail: 'Estimate edge location and direction via linear regression on 1D derivative centroids per line. For each row in the ROI, compute the first derivative and find the centroid position. A least-squares fit gives the edge line.',
    formula: 'x_edge(y) = a * y + b, solved via linear regression on centroids',
  },
  {
    id: 5, title: 'Projection & Oversampling', icon: BarChart3,
    detail: 'Project all pixel data along the edge direction to create a 1D supersampled ESF (Edge Spread Function) at 4x original sampling rate. This projection effectively redistributes pixels along bins perpendicular to the edge, achieving sub-pixel sampling.',
    formula: 'ESF(x_4x) = average of all pixels projected to bin x_4x (4x oversampling)',
  },
  {
    id: 6, title: 'Derivative (PSF)', icon: LineChart,
    detail: 'Compute the discrete derivative of the oversampled ESF to obtain the Point Spread Function (PSF). The derivative converts the edge transition into a line spread function that represents the system impulse response.',
    formula: 'PSF(x) = d/dx [ESF(x)] = ESF(x+1) - ESF(x)',
  },
  {
    id: 7, title: 'Window & DFT', icon: Calculator,
    detail: 'Apply a Hamming window to the PSF data to reduce spectral leakage, then compute the Discrete Fourier Transform (DFT). The window function tapers the data at the edges, minimizing artifacts in the frequency domain.',
    formula: 'W(x) = 0.54 - 0.46 * cos(2\u03c0x/N); MTF_raw = |DFT[PSF(x) * W(x)]|',
  },
  {
    id: 8, title: 'SFR/MTF Output', icon: BarChart3,
    detail: 'Normalize the modulus as Spatial Frequency Response (SFR). Correct for input modulation to obtain the true MTF. MTF50 (frequency at 50% MTF) is commonly used as the resolution metric.',
    formula: 'MTF(\u03be) = SFR(\u03be) / M_input(\u03be);  MTF50: frequency where MTF = 0.50',
  },
];

const theory = [
  {
    title: 'ESF and PSF Relationship',
    content: 'The Optical Transfer Function (OTF) and its modulus, the Modulation Transfer Function (MTF), describe signal transfer in imaging systems. The edge-gradient method derives the MTF from a captured edge image:',
    formulas: [
      'ESF(x) = Edge Spread Function = \u222b PSF(x\u2032) dx\u2032 from \u2212\u221e to x',
      'PSF(x) = d/dx [ESF(x)] \u2014 Point Spread Function is the derivative of ESF',
      'MTF(\u03be) = |F{PSF(x)}| \u2014 modulus of Fourier Transform of PSF',
    ],
  },
  {
    title: 'Slanted-Edge Advantage',
    content: 'Traditional vertical edge methods are limited by pixel sampling frequency. The slanted-edge method overcomes this by projecting pixels along a slightly tilted edge direction. This projection-based oversampling achieves sub-pixel sampling without requiring physical sub-pixel movement, effectively providing Nx oversampling where N depends on the number of lines in the ROI.',
  },
  {
    title: 'Input Modulation Correction',
    content: 'If the input edge is of sufficiently high quality (sharp edge target), the measured modulus directly estimates the system MTF. Otherwise, the output modulation must be divided by the input target modulation frequency-by-frequency to obtain the true system MTF.',
  },
];

export default function SlantedEdgeMTF() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="min-h-[100dvh] bg-[#0a0e17] pt-24 pb-16" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/resolution-center" className="text-[#64748b] hover:text-[#00d4ff] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Resolution Center
          </Link>
          <span className="text-[#64748b]">/</span>
          <span className="text-[#00d4ff] font-medium">Slanted-Edge MTF</span>
        </div>

        <div className="mb-10">
          <h1 className="text-[#f1f5f9] font-bold text-3xl mb-3">Slanted-Edge MTF Analysis</h1>
          <p className="text-[#94a3b8] text-base max-w-3xl leading-relaxed">
            A deep dive into the <strong className="text-[#f1f5f9]">ISO 12233</strong> slanted-edge spatial frequency response method, based on the work of <strong className="text-[#f1f5f9]">Peter D. Burns (Eastman Kodak, 2000)</strong> and the <strong className="text-[#f1f5f9]">ISO TC42/WG18</strong> standard. This technique has become the industry standard for evaluating digital camera and scanner resolution.
          </p>
        </div>

        {/* 8-Step Interactive Flow */}
        <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6 md:p-8 mb-12">
          <h2 className="text-[#f1f5f9] font-semibold text-lg mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00d4ff]" />
            Complete Algorithm Flow (Interactive)
          </h2>
          <p className="text-[#94a3b8] text-sm mb-6">Click each step to expand details. The slanted-edge method modifies traditional edge-gradient analysis by using a skewed edge with projection-based oversampling.</p>

          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="border border-[rgba(148,163,184,0.1)] rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-[#0d121f] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center shrink-0">
                    <step.icon className="w-4 h-4 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#64748b] text-xs font-medium mr-2">STEP {step.id}</span>
                    <span className="text-[#f1f5f9] text-sm font-medium">{step.title}</span>
                  </div>
                  <svg className={`w-4 h-4 text-[#64748b] transition-transform ${expandedStep === step.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {expandedStep === step.id && (
                  <div className="px-4 pb-4 border-t border-[rgba(148,163,184,0.08)]">
                    <div className="pt-4 pl-14">
                      <p className="text-[#94a3b8] text-sm leading-relaxed mb-3">{step.detail}</p>
                      {step.formula && (
                        <div className="bg-[#0d121f] rounded-lg p-3 font-mono text-xs text-[#00d4ff]">
                          {step.formula}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Theoretical Foundation */}
        <div className="space-y-6">
          <h2 className="text-[#f1f5f9] font-semibold text-lg">Theoretical Foundation</h2>
          {theory.map((t) => (
            <div key={t.title} className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
              <h3 className="text-[#f1f5f9] font-medium text-base mb-3">{t.title}</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{t.content}</p>
              {t.formulas && (
                <div className="space-y-2">
                  {t.formulas.map((f, i) => (
                    <div key={i} className="bg-[#0d121f] rounded-lg p-3 font-mono text-xs text-[#00d4ff]">
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
