import { useScrollReveal } from '@/hooks/useScrollReveal';

const faFlows = [
  {
    title: 'WAT 晶圆验收测试',
    desc: '在晶圆切割道上设计测试结构，检测生产制程中的器件参数异常、金属线短路/断路、通孔链条高阻等问题。',
    points: ['前段器件参数分析（Vt, Idsat, Ioff）', '金属线电阻及漏电检测', '通孔链条断路/高阻定位', 'TEM结构量测与对比'],
  },
  {
    title: 'CP/FT 良率测试',
    desc: '对晶圆上所有芯片进行全面功能测试，记录未通过项目（O/S, Mbist, Scan等），对不合格品进行失效分析。',
    points: ['O/S (Open/Short) / Leakage 分析', 'Scan / LBIST / ATPG 失效分析', 'Memory区域带地址失效分析', 'DFT路径验证与Layout追踪'],
  },
  {
    title: '可靠性认证分析',
    desc: '通过加速应力测试模拟实际应用中的失效机制，评估芯片寿命和可靠性。',
    points: ['GOI栅氧化层可靠性（TDDB/Vramp/Jramp）', 'EM电迁移 / SM应力迁移', 'ESD静电放电 / Latch-up闩锁效应', 'HTOL高温寿命 / EFR早期失效'],
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
        <SectionHeader
          eyebrow="Failure Analysis Fundamentals"
          title="失效分析基础理论"
          desc="失效分析贯穿芯片生产制造的全过程，从晶圆加工到封装测试，每个环节出现异常都可能需要FA来定位根因、改善制程。"
        />

        {/* Overview Card */}
        <div ref={flowReveal.ref} className={`bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-8 mb-16 transition-all duration-700 delay-100 ${flowReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-4">失效分析的定义与目的</h3>
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
            失效分析（Failure Analysis, FA）是在芯片生产制造过程中，当测试结果不符合要求时，通过一系列物理、电性和化学分析手段，定位缺陷位置、确定失效机制、推断失效模型的系统性工程。FA的结果直接反馈给工艺、设计和制造团队，用于改善生产流程、提高产品质量和可靠性。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { label: '定位缺陷', desc: '精确定位失效发生的物理位置' },
              { label: '确定机制', desc: '分析导致失效的根本原因' },
              { label: '改善制程', desc: '反馈工艺问题，优化生产流程' },
            ].map((item) => (
              <div key={item.label} className="bg-[#0d121f] border border-[rgba(148,163,184,0.08)] rounded-lg p-4">
                <p className="text-[#00d4ff] text-sm font-medium mb-1">{item.label}</p>
                <p className="text-[#64748b] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Three Analysis Flows */}
        <div ref={testReveal.ref} className={`transition-all duration-700 delay-200 ${testReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-8">三大失效分析场景</h3>
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

        {/* Analysis Flow Image */}
        <div className="mt-16">
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-6">SRAM CP测试流程示意</h3>
          <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
            <img src="/images/cn_page7_img1.jpeg" alt="SRAM CP测试流程" className="w-full h-auto object-contain" />
            <p className="text-[#64748b] text-xs py-3 px-4 border-t border-[rgba(148,163,184,0.1)]">
              从O/S测试开始，经过漏电测试、DC测试、功能测试等阶段，逐步定位失效类型的完整分析链路
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
