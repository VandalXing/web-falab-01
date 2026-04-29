export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[rgba(148,163,184,0.1)]">
      <div
        className="max-w-[1200px] mx-auto py-8 text-center"
        style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
      >
        <p className="text-[#64748b] text-xs">
          半导体失效分析学习平台 — 仅供学习参考使用
        </p>
      </div>
    </footer>
  );
}
