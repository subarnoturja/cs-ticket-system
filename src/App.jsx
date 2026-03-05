import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// Icons
const UserIcon = () => (
  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const CalIcon = () => (
  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Ticket Card
const TicketCard = ({ ticket, onAdd, active }) => (
  <div
    onClick={() => !active && onAdd(ticket)}
    className={`border rounded-lg p-3 transition-shadow duration-150 bg-white
      ${active
        ? "border-indigo-300 cursor-default"
        : "border-gray-200 cursor-pointer hover:shadow-md hover:border-indigo-200"}`}
  >
    {/* top row */}
    <div className="flex justify-between items-start gap-2 mb-1.5">
      <span className="text-[13px] font-semibold text-gray-900 leading-snug flex-1">
        {ticket.title}
      </span>
      <StatusBadge status={ticket.status} />
    </div>

    {/* description */}
    <p className="text-[11.5px] text-gray-500 leading-relaxed mb-2 line-clamp-2">
      {ticket.description}
    </p>

    {/* footer row */}
    <div className="flex items-center justify-between flex-wrap gap-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-gray-400">#{ticket.id}</span>
        <PriorityBadge priority={ticket.priority} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-gray-500 flex items-center gap-1">
          <UserIcon /> {ticket.customer}
        </span>
        <span className="text-[11px] text-gray-500 flex items-center gap-1">
          <CalIcon /> {ticket.createdAt}
        </span>
      </div>
    </div>
  </div>
);

// Task Status Card
const TaskCard = ({ ticket, onComplete }) => (
  <div className="border border-gray-200 rounded-lg p-3 bg-white">
    <p className="text-[12.5px] font-semibold text-gray-900 leading-snug mb-2.5">
      {ticket.title}
    </p>
    <button
      onClick={() => onComplete(ticket)}
      className="w-full bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold rounded-md py-2 transition-colors duration-150"
    >
      Complete
    </button>
  </div>
);

function App() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);

  const handleAddTicket = (ticket) => {
    if (inProgress.some(t => t.id === ticket.id)) return;
    setInProgress(p => [...p, ticket]);
    toast.info(`"${ticket.title}" added to Task Status`, { autoClose: 3000 });
  };

  const handleComplete = (ticket) => {
    setInProgress(p => p.filter(t => t.id !== ticket.id));
    setResolved(r => [...r, ticket]);
    setTickets(t => t.filter(t => t.id !== ticket.id));
    toast.success(`"${ticket.title}" marked as resolved!`, { autoClose: 3000 });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <ToastContainer position="top-right" />
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
      {/* Ticket Section */}
      <div className="px-6 pt-4 pb-8">
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 grid grid-cols-[1fr_248px] gap-4 items-start">

          {/* LEFT: Customer Tickets */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3 pb-2.5 border-b border-gray-100">
              Customer Tickets
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {tickets.map(ticket => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onAdd={handleAddTicket}
                  active={inProgress.some(t => t.id === ticket.id)}
                />
              ))}
              {tickets.length === 0 && (
                <div className="col-span-2 text-center py-12 text-gray-400">
                  <p className="text-3xl mb-2">🎉</p>
                  <p className="text-[13px] font-semibold">All tickets resolved!</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Task Status */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3 pb-2.5 border-b border-gray-100">
              Task Status
            </h2>

            {/* In-progress list */}
            <div className="flex flex-col gap-2.5 mb-5">
              {inProgress.length === 0 ? (
                <p className="text-xs text-gray-400 py-4">Click a ticket card to add it here.</p>
              ) : (
                inProgress.map(ticket => (
                  <TaskCard key={ticket.id} ticket={ticket} onComplete={handleComplete} />
                ))
              )}
            </div>

            {/* Resolved list */}
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 mb-2">Resolved Task</h3>
              {resolved.length === 0 ? (
                <p className="text-xs text-gray-400">No resolved tasks yet.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {resolved.map(ticket => (
                    <div key={ticket.id}
                      className="bg-green-50 border border-green-200 rounded-md px-2.5 py-1.5 flex items-center gap-1.5 text-[12px] text-green-700 font-medium">
                      <CheckIcon />
                      <span className="truncate">{ticket.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-7 pt-10 pb-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.2fr] gap-7 mb-8">

            {/* Brand */}
            <div>
              <p className="text-white font-bold text-[15px] mb-3">CS — Ticket System</p>
              <p className="text-[12px] text-gray-500 leading-7 max-w-[230px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>

            {/* Company */}
            <div>
              <p className="text-white font-semibold text-[13px] mb-3.5">Company</p>
              {["About Us", "Our Mission", "Contact Sales"].map(l => (
                <p key={l} className="text-[12.5px] text-gray-500 mb-2.5 cursor-pointer hover:text-gray-300 transition-colors">{l}</p>
              ))}
            </div>

            {/* Services */}
            <div>
              <p className="text-white font-semibold text-[13px] mb-3.5">Services</p>
              {["Products & Services", "Customer Stories", "Download Apps"].map(l => (
                <p key={l} className="text-[12.5px] text-gray-500 mb-2.5 cursor-pointer hover:text-gray-300 transition-colors">{l}</p>
              ))}
            </div>

            {/* Information */}
            <div>
              <p className="text-white font-semibold text-[13px] mb-3.5">Information</p>
              {["Privacy Policy", "Terms & Conditions", "Join Us"].map(l => (
                <p key={l} className="text-[12.5px] text-gray-500 mb-2.5 cursor-pointer hover:text-gray-300 transition-colors">{l}</p>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-white font-semibold text-[13px] mb-3.5">Social Links</p>
              {[
                { bg: "bg-blue-700",  label: "CS — Ticket System", icon: "𝕏" },
                { bg: "bg-sky-600",   label: "CS — Ticket System", icon: "in" },
                { bg: "bg-blue-600",  label: "CS — Ticket System", icon: "f" },
                { bg: "bg-gray-600",  label: "support@css.com",    icon: "✉" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 mb-2.5 cursor-pointer group">
                  <span className={`${s.bg} w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}>
                    {s.icon}
                  </span>
                  <span className="text-[12px] text-gray-500 group-hover:text-gray-300 transition-colors">{s.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-4 text-center">
            <p className="text-[12px] text-gray-600">© 2025 CS — Ticket System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
