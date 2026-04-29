import { useScrollReveal } from '@/hooks/useScrollReveal';

const cases = [
  {
    id: 'wat-via',
    category: 'WAT分析',
    title: 'WAT通孔链条断路失效分析',
    process: [
      { step: '问题发现', desc: 'WAT测试结果显示晶圆右下角和左上角通孔链条电阻异常，达千万欧姆级，正常位置仅0.6欧。' },
      { step: '结构定位', desc: '根据shoot分布图找到测试结构系列（如S09），确定pad10与pad11之间为分析目标。' },
      { step: '样品制备', desc: '研磨到M7层上方一点点，保留原貌，不露出目标层。断路案例优先使用VC方法定位。' },
      { step: 'VC定位', desc: '将测试结构的一个pad接地（laser marker或FIB），在一定电压下观察对比度差异。断点两侧出现黑白交界，即为失效位置。' },
      { step: 'FIB截面确认', desc: '在VC定位的断点处切截面，FIB结果显示通孔没有做出来，确认为制程上通孔曝光或蚀刻问题。' },
    ],
    lesson: 'WAT后段通孔断路分析的标准流程：电性验证 → 研磨至目标层上方 → VC定位断点 → FIB/TEM截面确认 → 根因归类（曝光/蚀刻/电镀等制程问题）。',
    tags: ['WAT', 'ViaChain', 'VC定位', 'FIB截面'],
    images: ['/images/cn_page2_img1.png', '/images/cn_page25_img1.jpeg'],
  },
  {
    id: 'metal-barrier',
    category: '低良率分析',
    title: 'Metal Barrier缺失导致SRAM单Bit失效',
    process: [
      { step: '失效现象', desc: 'SRAM CP测试出现单Bit失效，Fail Bit在特定地址可重复出现。' },
      { step: 'EFA热点分析', desc: '对Fail die进行EMMI/OBIRCH分析，确认有无热点。如有热点可快速定位到对应电路区域。' },
      { step: '逐层VC比对', desc: '对Fail和Pass样品进行逐层Top-down剥离，每层拍摄VC图像进行比对。发现Metal-1层的VC灰度存在差异。' },
      { step: 'Layout追踪', desc: '根据失效地址反查到Layout上对应Bit的Cell结构，追踪Metal-1层连接路径。' },
      { step: 'FIB/TEM确认', desc: '在VC异常位置切截面，TEM结果显示Metal_1 barrier/Cu部分缺失，导致电阻异常升高或开路。' },
    ],
    lesson: '单Bit SRAM失效的系统分析路径：地址→Layout→层追踪→VC比对→截面确认。Barrier缺失通常与CMP过度研磨或Barrier沉积不足有关。',
    tags: ['SRAM', 'SingleBit', 'M1Barrier', 'VC比对'],
    images: ['/images/cn_page10_img1.jpeg', '/images/cn_page18_img1.jpeg'],
  },
  {
    id: 'via-open',
    category: '低良率分析',
    title: 'Via Open引起的电路漏电故障',
    process: [
      { step: '失效现象', desc: '某产品出现漏电fail，I-V curve显示Fail样品比Pass样品有明显漏电。' },
      { step: '热点分析', desc: '在Fail die（相对Pass die）漏电较大的电压条件下做OBIRCH/EMMI分析。先做正面，抓不到热点时考虑背面OBIRCH/EMMI。' },
      { step: 'I-V曲线对比', desc: 'Fail样品比Pass样品有更大的漏电，并在Fail样品上成功抓到热点。' },
      { step: '逐层VC比对', desc: 'Top view逐层比对Fail/Pass样品，发现Metal-3层VC存在明显差异——Fail样品某区域VC偏暗。' },
      { step: 'Layout定位', desc: '查找Layout确定进一步切cross section的位置，确认VC异常区域对应的Via-2位置。' },
      { step: 'TEM确认', desc: 'TEM截面结果确认Via-2 open。Via open导致电路重构，形成新的漏电通路。' },
    ],
    lesson: '有漏电的样品也可能是Via open引起——Via open会改变线路结构导致漏电。必须通过Layout确认往下连接方式，避免切错位置。',
    tags: ['ViaOpen', 'Leakage', 'OBIRCH', 'TEM'],
    images: ['/images/cn_page14_img1.jpeg', '/images/cn_page9_img1.jpeg'],
  },
  {
    id: 'nldd',
    category: '器件分析',
    title: 'NLDD缺失导致SRAM Vt漂移',
    process: [
      { step: '失效现象', desc: 'SRAM Cell中某PU管出现Vt升高、Idsat降低，导致Cell读写失效。Nanoprobe量测显示Fail Cell参数异常。' },
      { step: 'Nanoprobe表征', desc: '对Fail Cell内各管进行单独I-V测试。单边NLDD missing：一个方向Idsat lower, Vt higher。双边NLDD missing：两个方向均异常。' },
      { step: 'VC检查', desc: '双边NLDD missing时，SEM VC可观察到CT区域灰度比正常NMOS暗。单边NLDD missing通常无明显VC差异。' },
      { step: 'Junction Stain TEM', desc: '对样品做酸处理（Junction Stain），然后在TEM下观察S/D、LDD、Well的形貌轮廓。' },
      { step: '根因确认', desc: 'TEM结果显示NLDD区域缺失或严重偏移，确认是离子注入制程中Dope shift或光刻对准偏差导致。' },
    ],
    lesson: 'NLDD missing分析的三步法：Nanoprobe电性确认 → VC快速筛查 → Junction Stain TEM形貌确认。单边/双边missing的VC和电性表现不同，需区分对待。',
    tags: ['NLDD', 'VtShift', 'Nanoprobe', 'JunctionStain'],
    images: ['/images/cn_page16_img1.jpeg'],
  },
  {
    id: 'em',
    category: '可靠性分析',
    title: 'EM电迁移失效分析',
    process: [
      { step: '测试原理', desc: 'EM测试在高温大电流条件下加速金属线老化。电子对金属原子的推动作用会在金属线内产生空洞（Void），阻值逐渐增大直至失效。' },
      { step: '对比策略', desc: '选择失效时间短的（不合格）和时间长的（合格）样品各一颗进行对比分析。' },
      { step: 'FIB截面', desc: '在测试结构两端分别切截面。时间长的样品：空洞出现在金属线内部；时间短的样品：空洞出现在通孔下方。' },
      { step: '根因推断', desc: '空洞集中在通孔下方说明通孔制程存在问题（如通孔底部Barrier覆盖不全、Cu电镀空洞、通孔形貌异常等）。' },
      { step: '制程改善', desc: '针对通孔底部形貌和Barrier工艺进行优化，改善EM寿命表现。' },
    ],
    lesson: 'EM失效分析的关键在于对比策略——Pass/Fail对比可以快速锁定差异区域。空洞位置（金属线内vs通孔下）直接指向不同的制程改善方向。',
    tags: ['EM', '电迁移', '可靠性', '对比分析'],
    images: ['/images/cn_page20_img1.jpeg'],
  },
  {
    id: 'esd',
    category: '可靠性分析',
    title: 'ESD静电放电失效分析',
    process: [
      { step: '测试类型', desc: 'ESD测试分为HBM（人体模型）、MM（机器模型）和CDM（器件充电模型）。CDM放电带来的损伤通常最严重。' },
      { step: '失效判断', desc: 'ESD失效的判断标准通常是漏电大小或I-V曲线的漂移。对失效pin做I-V curve确认漏电存在。' },
      { step: '背面热点分析', desc: '对失效样品进行背面OBIRCH分析，从Si背面透过减薄硅层定位热点位置。正面有金属阻挡时背面分析更有效。' },
      { step: 'HF处理至AA层', desc: '用49% HF溶液直接处理样品至AA（有源区）层，去除上层所有金属和介电层，暴露底层器件结构。' },
      { step: 'OM/SEM观察', desc: '在热点对应区域观察是否存在烧毁痕迹（melted Si、oxide rupture、junction damage等）。' },
    ],
    lesson: 'ESD失效分析的标准路径：I-V确认漏电 → 背面OBIRCH定位 → HF处理至AA → 观察烧毁形貌。即使没有明显漏电，OBIRCH也可能抓到热点。',
    tags: ['ESD', '静电放电', 'OBIRCH', 'HF处理'],
    images: ['/images/cn_page19_img2.jpeg'],
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
        <SectionHeader
          eyebrow="Real-World Case Studies"
          title="实际案例分析"
          desc="基于真实生产环境的六个典型失效分析案例，涵盖WAT、低良率、器件和可靠性四大类别，每个案例包含完整的分析流程和技术要点。"
        />

        <div className="space-y-16">
          {cases.map((c) => {
            const reveal = useScrollReveal();
            return (
              <div
                key={c.id}
                ref={reveal.ref}
                className={`bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden transition-all duration-700 ${reveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-[rgba(148,163,184,0.1)]">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[rgba(0,212,255,0.08)] text-[#00d4ff] text-xs font-medium">{c.category}</span>
                    {c.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full bg-[rgba(148,163,184,0.08)] text-[#94a3b8] text-[11px]">#{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-[#f1f5f9] font-semibold text-xl">{c.title}</h3>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left: Process Steps */}
                  <div className="p-6 md:p-8">
                    <h4 className="text-[#f1f5f9] font-medium text-sm mb-5">分析流程</h4>
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

                    {/* Lesson */}
                    <div className="mt-6 bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.12)] rounded-lg p-4">
                      <p className="text-[#00d4ff] text-xs font-medium mb-1.5">💡 经验总结</p>
                      <p className="text-[#94a3b8] text-xs leading-relaxed">{c.lesson}</p>
                    </div>
                  </div>

                  {/* Right: Images */}
                  <div className="p-6 md:p-8 bg-[#0d121f] border-l border-[rgba(148,163,184,0.08)]">
                    <div className="space-y-4">
                      {c.images.map((img, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden border border-[rgba(148,163,184,0.1)]">
                          <img src={img} alt={`${c.title} - ${idx + 1}`} className="w-full h-auto object-contain" />
                        </div>
                      ))}
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
