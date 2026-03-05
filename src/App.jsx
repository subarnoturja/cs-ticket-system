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
    </>
  );
}

export default App;
