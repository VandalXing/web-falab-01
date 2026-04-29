import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const equipmentTabs = [
  {
    id: 'incoming',
    label: '入厂检测',
    labelEn: 'Incoming Inspection',
    items: [
      {
        name: '光学显微镜',
        nameEn: 'Optical Microscopy (OM)',
        desc: '高精度光学检查，支持明场/暗场、偏振光和液晶热点检测，是FA实验室最基础也是最高效的目视检测工具。',
        image: '/images/cn_page18_img1.jpeg',
      },
      {
        name: 'X射线成像',
        nameEn: 'X-Ray Imaging',
        desc: '无损检测封装内部结构、焊点质量和引线框架缺陷，支持2D和3D CT成像，快速识别封装级异常。',
        image: '/images/en_page23_img3.png',
      },
      {
        name: '声学显微镜',
        nameEn: 'Scanning Acoustic Microscopy (SAM)',
        desc: '超声波扫描检测封装分层、裂缝和空洞，对多层封装和MCP堆叠芯片的分层缺陷尤为敏感。',
        image: '/images/en_page23_img2.png',
      },
    ],
  },
  {
    id: 'isolation',
    label: '故障隔离',
    labelEn: 'Fault Isolation',
    items: [
      {
        name: '光子发射显微镜',
        nameEn: 'Photoemission Microscopy (EMMI)',
        desc: '捕捉缺陷处电子-空穴复合产生的光子，精确定位漏电点。配备高灵敏度的制冷CCD相机，可探测nW级微弱光信号。',
        image: '/images/cn_page20_img1.jpeg',
      },
      {
        name: '热发射分析',
        nameEn: 'Thermal / OBIRCH / TIVA',
        desc: '利用激光扫描检测微区发热异常，通过OBIRCH或TIVA技术定位短路和高阻故障，支持正/背面分析。',
        image: '/images/cn_page19_img2.jpeg',
      },
      {
        name: '电压对比分析',
        nameEn: 'Voltage Contrast (VC)',
        desc: '通过FIB/SEM观察电压对比度差异，快速定位开路和短路。包括被动电压对比(PVC)和主动电压对比(AVC)。',
        image: '/images/cn_page9_img1.jpeg',
      },
    ],
  },
  {
    id: 'physical',
    label: '物理分析',
    labelEn: 'Physical Analysis',
    items: [
      {
        name: '扫描电子显微镜',
        nameEn: 'Scanning Electron Microscope (SEM)',
        desc: '高分辨率表面形貌观察与成分分析(EDX)，景深大、导航便捷，是FA实验室最通用的成像工具。',
        image: '/images/cn_page18_img1.jpeg',
      },
      {
        name: '聚焦离子束',
        nameEn: 'Focused Ion Beam (FIB)',
        desc: '精准截面切割、TEM样品制备与电路编辑。现代Plasma FIB支持大面积切割，Xe离子束减少Ga污染。',
        image: '/images/cn_page20_img2.jpeg',
      },
      {
        name: '透射电子显微镜',
        nameEn: 'Transmission Electron Microscope (TEM)',
        desc: '原子级分辨率截面结构分析，可精确测量薄膜厚度、界面形貌和晶体缺陷，是纳米级失效分析的金标准。',
        image: '/images/cn_page5_img1.jpeg',
      },
    ],
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

export default function Equipment() {
  const [activeTab, setActiveTab] = useState('incoming');
  const tabReveal = useScrollReveal();

  const currentTab = equipmentTabs.find((t) => t.id === activeTab);

  return (
    <section
      id="equipment"
      className="relative py-24 md:py-32 bg-[#0d121f]"
      style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          eyebrow="Analytical Equipment"
          title="实验室主要设备"
          desc="覆盖从入厂检测、故障隔离到物理分析的全链条设备体系，配备行业领先的分析仪器。"
        />

        {/* Tabs */}
        <div
          ref={tabReveal.ref}
          className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-100 ${tabReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          {equipmentTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[rgba(0,212,255,0.12)] text-[#00d4ff] border border-[rgba(0,212,255,0.3)]'
                  : 'bg-transparent text-[#94a3b8] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(148,163,184,0.3)] hover:text-[#f1f5f9]'
              }`}
            >
              <span>{tab.label}</span>
              <span className="hidden sm:inline ml-1.5 text-[#64748b]">· {tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTab?.items.map((item) => {
            const cardReveal = useScrollReveal();
            return (
              <div
                key={item.nameEn}
                ref={cardReveal.ref}
                className={`group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden hover:border-[rgba(0,212,255,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,212,255,0.08)] transition-all duration-300 ${cardReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-[#f1f5f9] font-semibold text-base mb-1">{item.name}</h4>
                  <p className="text-[#64748b] text-xs uppercase tracking-wider mb-3">{item.nameEn}</p>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
