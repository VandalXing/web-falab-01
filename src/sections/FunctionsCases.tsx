import { Microscope, Search, Shield } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const functionCategories = [
  {
    icon: Microscope,
    title: 'WAT晶圆验收测试分析',
    desc: '针对晶圆切割道上测试结构的参数异常进行失效分析',
    points: [
      '前段器件参数分析（Vt, Idsat, Ioff等）',
      '金属线断路/短路检测',
      '通孔链条高阻与断路分析',
      '酸处理揭示S/D、LDD、Well形貌',
    ],
    image: '/images/cn_page2_img1.png',
  },
  {
    icon: Search,
    title: '低良率失效分析',
    desc: '针对CP/FT良率测试中的不合格品进行系统分析',
    points: [
      'O/S (Open/Short) / Leakage 失效分析',
      'Scan / LBIST / ATPG 失效分析',
      'Memory区域带地址失效分析',
      'DFT路径验证与Layout追踪',
    ],
    image: '/images/cn_page10_img1.jpeg',
  },
  {
    icon: Shield,
    title: '可靠性认证分析',
    desc: '工艺可靠性与产品可靠性认证失效分析',
    points: [
      'GOI栅氧化层可靠性失效分析',
      'EM电迁移 / SM应力迁移分析',
      'ESD静电放电 / Latch-up闩锁效应',
      'HTOL高温寿命 / EFR早期失效率',
    ],
    image: '/images/cn_page20_img1.jpeg',
  },
];

const caseStudies = [
  {
    image: '/images/cn_page10_img1.jpeg',
    title: '金属阻挡层缺失导致SRAM单Bit失效',
    tags: ['SRAM', 'SingleBit', 'M1Barrier', 'SMIC65nm'],
    desc: '通过Pass/Fail VC对比和截面分析，确认Metal_1 barrier/Cu部分缺失导致单Bit失效。',
  },
  {
    image: '/images/cn_page14_img1.jpeg',
    title: 'Via Open引起的电路漏电故障',
    tags: ['ViaOpen', 'Leakage', 'OBIRCH', '65nm'],
    desc: '利用OBIRCH热点分析定位，TEM截面确认Via-2 open，Layout追踪精确定位故障点。',
  },
  {
    image: '/images/cn_page25_img1.jpeg',
    title: 'WAT通孔链条断路失效分析',
    tags: ['WAT', 'ViaChain', 'Open', 'VC定位'],
    desc: '晶圆右上角通孔链条电阻异常达千万欧姆级，通过VC电压对比度分析定位断点。',
  },
  {
    image: '/images/cn_page16_img1.jpeg',
    title: 'NLDD缺失导致Vt漂移问题',
    tags: ['NLDD', 'VtShift', 'Nanoprobe', 'JunctionStain'],
    desc: '通过Nanoprobe电性表征和Junction Stain TEM分析确认NLDD注入偏移问题。',
  },
];

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">{eyebrow}</p>
      <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
        {title}
      </h2>
      <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">{desc}</p>
    </div>
  );
}

export default function FunctionsCases() {
  const flowReveal = useScrollReveal();
  const funcReveal = useScrollReveal();
  const caseReveal = useScrollReveal();

  return (
    <section
      id="functions"
      className="relative py-24 md:py-32"
      style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          eyebrow="Core Functions & Case Studies"
          title="主要功能与重点案例"
          desc="覆盖WAT晶圆验收测试、CP/FT良率分析、可靠性认证等全链条失效分析服务，每个案例均基于实际生产环境。"
        />

        {/* Analysis Flowchart */}
        <div
          ref={flowReveal.ref}
          className={`mb-20 transition-all duration-700 delay-100 ${flowReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-6">分析流程 Analysis Flow</h3>
          <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
            <img
              src="/images/cn_page7_img1.jpeg"
              alt="SRAM CP测试流程图"
              className="w-full h-auto object-contain"
            />
            <p className="text-[#64748b] text-xs py-3 px-4 border-t border-[rgba(148,163,184,0.1)]">
              SRAM区域CP测试流程示意 — 从O/S测试到功能测试的完整分析链路
            </p>
          </div>
        </div>

        {/* Function Categories */}
        <div
          ref={funcReveal.ref}
          className={`mb-20 transition-all duration-700 delay-200 ${funcReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-8">核心功能 Core Functions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {functionCategories.map((cat) => (
              <div
                key={cat.title}
                className="group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden hover:border-[rgba(0,212,255,0.25)] transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center">
                      <cat.icon className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <h4 className="text-[#f1f5f9] font-semibold text-base">{cat.title}</h4>
                  </div>
                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <ul className="space-y-2">
                    {cat.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#00d4ff] mt-2 shrink-0" />
                        <span className="text-[#94a3b8] text-xs leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Case Studies */}
        <div
          ref={caseReveal.ref}
          className={`transition-all duration-700 delay-300 ${caseReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-8">重点案例 Featured Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <div
                key={cs.title}
                className="group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden hover:border-[rgba(0,212,255,0.25)] transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-[rgba(0,212,255,0.08)] text-[#00d4ff] text-[11px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-[#f1f5f9] font-semibold text-base mb-2">{cs.title}</h4>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">{cs.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
