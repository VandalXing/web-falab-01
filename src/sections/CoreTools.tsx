import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const tools = [
  {
    id: 'sem',
    label: 'SEM',
    labelZh: '扫描电子显微镜',
    icon: '🔬',
    principle: 'SEM利用聚焦的高能电子束扫描样品表面，通过检测二次电子、背散射电子等信号获取样品表面形貌和成分信息。电子束与样品相互作用产生的各种信号被探测器收集后转换为图像。',
    specs: [
      { label: '分辨率', value: '~1nm（场发射型）' },
      { label: '加速电压', value: '0.5kV - 30kV' },
      { label: '放大倍数', value: '10x - 1,000,000x' },
      { label: '探测器', value: 'SE, BSE, EDX' },
    ],
    applications: [
      '高分辨率表面形貌观察（Top View）',
      '逐层剥离后的层间结构检查',
      '电压对比（VC）分析——定位开路和短路',
      '搭配EDX进行微区成分分析',
      '失效点的精确定位和拍照存档',
    ],
    faUsage: [
      '研磨到目标层后，用5kV低电压观察金属线是否有断线',
      '利用被动电压对比（PVC）观察floating/open的金属线颜色差异',
      '高电压观察下层金属，确认Via是否真正开路',
      'Fail/Pass样品逐层VC比对，找出差异层',
    ],
    images: ['/images/cn_page18_img1.jpeg', '/images/en_page25_img3.png'],
    imageCaption: 'SEM逐层VC对比图（左）与金属线断裂SEM图像（右）',
  },
  {
    id: 'tem',
    label: 'TEM',
    labelZh: '透射电子显微镜',
    icon: '🎯',
    principle: 'TEM利用穿透超薄样品（<100nm）的高能电子束成像，由于电子波长极短（200kV时约0.0025nm），可获得原子级分辨率的截面结构信息。需要FIB制备超薄样品。',
    specs: [
      { label: '分辨率', value: '~0.1nm（原子级）' },
      { label: '加速电压', value: '80kV - 300kV' },
      { label: '样品厚度', value: '< 100nm' },
      { label: '制备方式', value: 'FIB lift-out / 离子减薄' },
    ],
    applications: [
      '原子级分辨率截面结构分析',
      '薄膜厚度精确量测（误差<5%）',
      '界面形貌和晶体缺陷观察',
      'Junction Stain染色后观察S/D/LDD/Well形貌',
      '与Pass样品对比找出结构差异',
    ],
    faUsage: [
      '量测Poly线宽、Gate氧化层厚度等关键尺寸',
      'Junction Stain TEM确认离子注入形貌异常（如NLDD missing）',
      'Via/Contact截面确认底部形貌、Barrier层覆盖情况',
      '多层金属结构中各层的相对位置和厚度',
    ],
    images: ['/images/cn_page5_img1.jpeg', '/images/cn_page20_img1.jpeg'],
    imageCaption: 'TEM截面图像：通孔链条截面（左）与EM失效截面（右）',
  },
  {
    id: 'fib',
    label: 'FIB',
    labelZh: '聚焦离子束',
    icon: '⚡',
    principle: 'FIB利用聚焦的Ga+或Xe等离子束轰击样品表面，通过离子与样品的溅射作用实现精准切割、沉积和成像。现代Plasma FIB采用Xe离子源，可处理更大面积且减少Ga污染。',
    specs: [
      { label: '离子源', value: 'Ga LMIS / Xe Plasma' },
      { label: '加速电压', value: '1kV - 30kV' },
      { label: '束流范围', value: '1pA - 2μA（Plasma FIB可达65nA）' },
      { label: '精度', value: 'nm级定位精度' },
    ],
    applications: [
      '精准截面切割（Cross Section）',
      'TEM样品制备（Lift-out / 薄片制备）',
      '电路编辑（Circuit Edit）',
      'Pt/C沉积保护层和导电通路',
      '激光标记辅助定位（Laser Mark）',
    ],
    faUsage: [
      '在热点位置切截面，确认缺陷的纵向形貌',
      '打Marker标记目标位置，辅助后续OM/FIB定位',
      '对Via/Metal layer做截面分析，确认open/bridge',
      '挖坑法暴露目标结构，熟悉新产品层叠结构',
      '镀金/挖孔支撑，提高研磨样品平整性',
    ],
    images: ['/images/cn_page20_img2.jpeg', '/images/cn_page9_img1.jpeg'],
    imageCaption: 'FIB截面制备（左）与VC定位分析（右）',
  },
  {
    id: 'nanoprober',
    label: 'Nanoprober',
    labelZh: '纳米探针',
    icon: '📐',
    principle: 'Nanoprober在SEM或独立真空腔内，利用纳米级精度的探针（针尖半径<50nm）直接接触芯片表面测试点，实现对单个晶体管或电路节点的电性表征。可在失效分析前确认电性问题。',
    specs: [
      { label: '探针精度', value: '< 50nm 针尖半径' },
      { label: '定位精度', value: '亚微米级' },
      { label: '测量范围', value: 'fA - mA 电流 / nV - V 电压' },
      { label: '工作模式', value: 'I-V, C-V, 脉冲测试' },
    ],
    applications: [
      '单个晶体管电性参数量测（Id-Vg, Id-Vd）',
      '失效器件与正常器件的参数对比',
      'SRAM Cell中PU/PD/PG管单独表征',
      '确认Vt偏移、Idsat降低等器件退化问题',
      '无需大面积破坏即可获取电性数据',
    ],
    faUsage: [
      'NLDD missing case：确认单边/双边Idsat降低、Vt升高',
      'Dope shift导致的Vt shift问题分析',
      'SRAM单Bit失效时，单独量测Cell内各管参数',
      '与Pass die对比，精确定位哪颗晶体管异常',
    ],
    images: ['/images/cn_page16_img1.jpeg'],
    imageCaption: 'Nanoprobe电性表征图：Fail vs Pass的Id-Vg曲线对比',
  },
  {
    id: 'ofi',
    label: 'OFI',
    labelZh: '光学故障隔离',
    icon: '🔦',
    principle: 'OFI（Optical Fault Isolation）包括光子发射（EMMI）和热发射（OBIRCH/TIVA）技术。EMMI捕捉缺陷处电子-空穴复合产生的光子；OBIRCH利用激光扫描引起的电阻变化检测发热异常点。',
    specs: [
      { label: 'EMMI波段', value: '400nm - 1700nm（Si带隙~1.1μm）' },
      { label: 'OBIRCH激光', value: '1340nm / 1064nm（Si半透射波段）' },
      { label: '温度灵敏度', value: 'mK级（Lock-in Thermography）' },
      { label: '分析面', value: 'Frontside / Backside' },
    ],
    applications: [
      'EMMI：捕捉漏电点光子发射（栅氧化层击穿、junction漏电）',
      'OBIRCH/TIVA：定位短路、高阻和ESD损伤热点',
      'LADA/SDL：检测Marginal Failure的临界工作点',
      'Lock-in Thermography：3D热点定位',
      '支持背面分析（Backside OBIRCH/EMMI）',
    ],
    faUsage: [
      'GOI栅氧击穿：EMMI捕捉击穿点光子，定位后FIB/TEM分析',
      'O/S/Leakage fail：OBIRCH热点定位→FIB截面确认',
      'ESD失效：OBIRCH从背面定位烧毁区域→HF处理至AA层观察',
      '没有漏电的样品也可能抓到热点（如ESD HBM fail）',
      '有热点的地方不一定有问题（负载过大形成的热点）',
    ],
    images: ['/images/cn_page19_img2.jpeg', '/images/cn_page20_img1.jpeg'],
    imageCaption: 'OBIRCH热点分析图（左）与EM失效热点图（右）',
  },
];

export default function CoreTools() {
  const [activeTab, setActiveTab] = useState('sem');
  const headerReveal = useScrollReveal();
  const tool = tools.find((t) => t.id === activeTab);

  return (
    <section id="tools" className="relative py-24 md:py-32 bg-[#0d121f]" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerReveal.ref} className={`mb-12 transition-all duration-700 ${headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-[0.1em] mb-3">Core Analytical Tools</p>
          <h2 className="text-[#f1f5f9] font-semibold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            核心设备原理与应用
          </h2>
          <p className="text-[#94a3b8] text-base max-w-2xl leading-relaxed">
            深入理解SEM、TEM、FIB、Nanoprober和OFI五大核心失效分析设备的工作原理、技术规格和在FA中的典型应用场景。
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === t.id
                  ? 'bg-[rgba(0,212,255,0.12)] text-[#00d4ff] border border-[rgba(0,212,255,0.3)]'
                  : 'bg-transparent text-[#94a3b8] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(148,163,184,0.3)] hover:text-[#f1f5f9]'
              }`}
            >
              <span className="mr-1.5">{t.icon}</span>
              <span>{t.label}</span>
              <span className="hidden sm:inline ml-1.5 text-[#64748b]">· {t.labelZh}</span>
            </button>
          ))}
        </div>

        {/* Tool Detail */}
        {tool && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Text content */}
            <div className="space-y-6">
              {/* Principle */}
              <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">工作原理</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{tool.principle}</p>
              </div>

              {/* Specs */}
              <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                <h3 className="text-[#f1f5f9] font-semibold text-base mb-4">技术规格</h3>
                <div className="grid grid-cols-2 gap-3">
                  {tool.specs.map((spec) => (
                    <div key={spec.label} className="bg-[#0d121f] rounded-lg p-3">
                      <p className="text-[#64748b] text-xs mb-1">{spec.label}</p>
                      <p className="text-[#f1f5f9] text-sm font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6">
                <h3 className="text-[#f1f5f9] font-semibold text-base mb-3">主要应用</h3>
                <ul className="space-y-2">
                  {tool.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 shrink-0" />
                      <span className="text-[#94a3b8] text-sm">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FA Usage */}
              <div className="bg-[#111827] border border-[rgba(0,212,255,0.15)] rounded-xl p-6">
                <h3 className="text-[#00d4ff] font-semibold text-base mb-3">FA典型应用手法</h3>
                <ul className="space-y-2">
                  {tool.faUsage.map((usage, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 shrink-0" />
                      <span className="text-[#94a3b8] text-sm">{usage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Images */}
            <div className="space-y-4">
              {tool.images.map((img, idx) => (
                <div key={idx} className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
                  <img src={img} alt={`${tool.label} image ${idx + 1}`} className="w-full h-auto object-contain" />
                </div>
              ))}
              <p className="text-[#64748b] text-xs text-center">{tool.imageCaption}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
