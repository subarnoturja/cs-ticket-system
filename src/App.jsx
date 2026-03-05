function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 h-14 flex items-center justify-between px-7">
        <span className="font-bold text-[15px] text-gray-900">
          CS — Ticket System
        </span>
        <div className="flex items-center gap-5">
          {["Home", "FAQ", "Changelog", "Blog", "Download", "Contact"].map(
            (n) => (
              <a
                key={n}
                href="#"
                className="text-[13px] text-gray-600 hover:text-gray-900 no-underline font-normal transition-colors"
              >
                {n}
              </a>
            )
          )}
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-semibold rounded-md px-3.5 py-1.5 transition-colors">
            + New Ticket
          </button>
        </div>
      </nav>
      {/* Banner */}
      <div className="px-6 pt-4">
        <div className="rounded-xl overflow-hidden grid grid-cols-2">

          {/* In-Progress */}
          <div className="relative overflow-hidden flex flex-col items-center justify-center py-7"
            style={{ background: "linear-gradient(135deg,#7c3aed 0%,#5b21b6 45%,#4338ca 100%)" }}>
            <div className="absolute top-[-60px] right-[-60px] w-[150px] h-[150px] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute bottom-[-70px] left-[-40px] w-[200px] h-[200px] rounded-full border border-white/10 pointer-events-none" />
            <p className="relative text-white/80 text-sm font-medium mb-1.5">In-Progress</p>
            <p className="relative text-white text-[44px] font-bold leading-none">{inProgress.length}</p>
          </div>

          {/* Resolved */}
          <div className="relative overflow-hidden flex flex-col items-center justify-center py-7"
            style={{ background: "linear-gradient(135deg,#0d9488 0%,#0f766e 50%,#064e3b 100%)" }}>
            <div className="absolute top-[-60px] left-[-60px] w-[150px] h-[150px] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute bottom-[-70px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/10 pointer-events-none" />
            <p className="relative text-white/80 text-sm font-medium mb-1.5">Resolved</p>
            <p className="relative text-white text-[44px] font-bold leading-none">{resolved.length}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
