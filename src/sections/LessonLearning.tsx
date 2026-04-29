import { useScrollReveal } from '@/hooks/useScrollReveal';

const lessons = [
  {
    num: '一',
    title: '没有漏电的样品，也可能抓到热点',
    desc: '不要仅凭I-V曲线判断。一个ESD HBM Fail案例中，Fail/Pass样品的I-V曲线完全一样，但OBIRCH仍能抓到热点。所以，不妨试一试热点分析，可能会有意外发现。',
  },
  {
    num: '二',
    title: '有热点的地方，不一定有问题',
    desc: 'MIM区域的Metal residue引起异常串联/并联，导致其他地方负载过大而形成热点。此时热点出现在负载过大的位置，而非制程真正有问题的地方。需要结合Layout判断热点的合理性。',
  },
  {
    num: '三',
    title: '有漏电的样品，也可能是Via open/Metal断线',
    desc: 'Via open会改变线路连接方式，导致电路重构并形成新的漏电通路。因此，漏电故障不一定就是短路问题，必须通过逐层VC比对和Layout追踪确认真正的失效类型。',
  },
  {
    num: '四',
    title: 'Via层较高的样品，需多角度VC检查',
    desc: '不仅要Low KV看Via/Metal顶部VC，High KV看Via底部的Metal，还要从顶部用High KV看IMD。厚的Via IMD材质中间可能有particle或delamination等缺陷，仅看单层容易被忽略。',
  },
  {
    num: '五',
    title: 'Metal暗掉时，必须看Layout确认往下连接',
    desc: 'Metal暗掉不一定是该层Metal本身的问题。必须查看Layout确认往下是怎么接的，确定是open的Via/CT位置再切cross section。直接切VC异常Metal底下的Via，可能切不到东西。',
  },
  {
    num: '六',
    title: 'Inline PID case与ESD fail的鉴别',
    desc: 'Plasma Induced Damage（PID）造成的失效形貌有时与ESD test fail非常相似，容易混淆。需要通过测试条件、失效分布（inline vs 测试后）和深度分析来区分，这是有lesson learning的。',
  },
];

const specialTechniques = [
  {
    title: 'FIB/I-beam辅助Memory Scramble建立',
    desc: '当需要精确定位计算各边dummy个数时，用FIB/I-beam制造缺陷后测试验证。在一个bit上标记→存图→测试完成后无需做FA即可达到定位目的。',
  },
  {
    title: 'FIB挖坑法熟悉新产品结构',
    desc: '在目标点四周挖坑，暴露不同层次的地址和结构，对于从不同层数地址的产品尤为有帮助。可快速理解新产品Metal/Via层叠结构。',
  },
  {
    title: '挖孔/镀金支撑提高研磨平整性',
    desc: '在目标点四周挖坑填入较硬金属（如Pt），对目标点形成支撑，减少边缘效应或图案效应的影响，同时降低研磨速率、提高可控性。',
  },
  {
    title: 'Test board辅助动态电性分析',
    desc: '利用测试板对样品进行动态偏置下的电性分析，可配合EMMI/OBIRCH捕捉只在动态工作状态下才出现的失效点。',
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
          <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">Lessons & Techniques</p>
          <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            失效分析经验总结
          </h2>
          <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">
            基于大量实际案例总结的六条核心经验教训，以及四项特殊的FA分析手法。这些经验可以帮助分析师避免常见陷阱、提高分析效率。
          </p>
        </div>

        {/* Six Lessons */}
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

        {/* Special Techniques */}
        <div ref={techReveal.ref} className={`transition-all duration-700 delay-200 ${techReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-[#f1f5f9] font-semibold text-lg mb-6">特殊FA分析手法</h3>
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
