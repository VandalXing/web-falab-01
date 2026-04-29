export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[rgba(148,163,184,0.1)]">
      <div className="max-w-[1200px] mx-auto py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#64748b] text-xs">
          Semiconductor Failure Analysis Learning Platform — For educational purposes only
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[#64748b] text-xs">Version 2.0</span>
          <span className="text-[rgba(148,163,184,0.2)]">|</span>
          <span className="text-[#94a3b8] text-xs">Maintained by <span className="text-[#00d4ff] font-medium">Dr. Wu</span></span>
        </div>
      </div>
    </footer>
  );
}
