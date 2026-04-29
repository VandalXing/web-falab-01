import { Users, Building2, Calculator, Shield } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const managementAreas = [
  {
    icon: Users,
    title: '人员配置',
    titleEn: 'Staffing',
    desc: '招聘、培训、技能组合与职业发展路径规划',
  },
  {
    icon: Building2,
    title: '组织架构',
    titleEn: 'Organization',
    desc: '报告结构、管理模式与全球支持体系',
  },
  {
    icon: Calculator,
    title: '预算运营',
    titleEn: 'Budget & Operations',
    desc: '成本控制、设备采购与资源优化配置',
  },
  {
    icon: Shield,
    title: '质量管理',
    titleEn: 'Quality Management',
    desc: '标准化流程、数据安全与报告体系',
  },
];

const operatingModels = [
  {
    name: 'Corporate Asset',
    nameZh: '企业资产模式',
    desc: '成本由整个组织分摊，适合拥有多条产品线的大型IDM企业，实验室作为共享资源服务于所有部门。',
  },
  {
    name: 'Cost Center',
    nameZh: '成本中心模式',
    desc: '按服务使用量向客户收费，实现成本回收或盈利运营，使FA成本与需求 causally 关联。',
  },
  {
    name: 'Tiered Support',
    nameZh: '分层支持模式',
    desc: '基础分析与高级分析分级协作，初级分析师处理常规case，高级工程师专注复杂失效分析。',
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

export default function LabManagement() {
  const areasReveal = useScrollReveal();
  const modelsReveal = useScrollReveal();
  const trainingReveal = useScrollReveal();

  return (
    <section id="management" className="relative py-24 md:py-32" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          eyebrow="Laboratory Organization"
          title="实验室构成与管理"
          desc="涵盖人员配置、技能培训、实验室运营模式及质量管理体系，确保高效、可靠的FA服务交付。"
        />

        {/* Management Areas Grid */}
        <div
          ref={areasReveal.ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20 transition-all duration-700 delay-100 ${areasReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          {managementAreas.map((area) => (
            <div
              key={area.title}
              className="group bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6 hover:border-[rgba(0,212,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,212,255,0.08)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center mb-4 group-hover:bg-[rgba(0,212,255,0.15)] transition-colors">
                <area.icon className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <h3 className="text-[#f1f5f9] font-semibold text-base mb-1">{area.title}</h3>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-3">{area.titleEn}</p>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>

        {/* Operating Models */}
        <div ref={modelsReveal.ref} className={`mb-20 transition-all duration-700 delay-200 ${modelsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-[#f1f5f9] font-semibold text-xl mb-8">运营模式 Operating Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {operatingModels.map((model) => (
              <div
                key={model.name}
                className="bg-[#111827] border border-[rgba(148,163,184,0.1)] rounded-xl p-6 hover:border-[rgba(0,212,255,0.25)] transition-all duration-300"
              >
                <p className="text-[#00d4ff] text-xs font-medium uppercase tracking-wider mb-2">{model.name}</p>
                <h4 className="text-[#f1f5f9] font-semibold text-base mb-3">{model.nameZh}</h4>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Training */}
        <div
          ref={trainingReveal.ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center transition-all duration-700 delay-200 ${trainingReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <div>
            <h3 className="text-[#f1f5f9] font-semibold text-xl mb-6">技能与培训 Skills & Training</h3>
            <ul className="space-y-4">
              {[
                '新员工OJT培训计划：see one, do one, teach one',
                '器件物理、电路分析、电性表征技术',
                '材料科学、化学与制造工艺知识',
                '沟通技巧与客户服务能力',
                '失效分析工具操作与数据分析',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-2 shrink-0" />
                  <span className="text-[#94a3b8] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden border border-[rgba(148,163,184,0.1)]">
            <img
              src="/images/cn_page3_img1.jpeg"
              alt="WAT测试机台"
              className="w-full h-auto object-cover"
            />
            <p className="text-[#64748b] text-xs py-3 px-4 bg-[#111827]">WAT晶圆验收测试机台 — 4072测试仪与自动测试系统</p>
          </div>
        </div>
      </div>
    </section>
  );
}
