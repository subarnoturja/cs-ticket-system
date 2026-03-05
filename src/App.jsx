import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const INITIAL_TICKETS = [
  { id: 1001, title: "Login Issues - Can't Access Account", description: "Customer is unable to log in to their account. They've tried resetting their password multiple times but still...", customer: "John Smith", priority: "high", status: "open", createdAt: "1/16/2024" },
  { id: 1002, title: "Payment Failed - Card Declined", description: "Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.", customer: "Sarah Johnson", priority: "high", status: "open", createdAt: "1/16/2024" },
  { id: 1003, title: "Unable to Download Invoice", description: "Customer cannot download their January invoice from the billing section. The download button is...", customer: "Michael Brown", priority: "medium", status: "inprogress", createdAt: "1/17/2024" },
  { id: 1004, title: "Incorrect Billing Address", description: "Customer's billing address shows a different city. They updated it but it still displays the old one.", customer: "Emily Davis", priority: "low", status: "open", createdAt: "1/17/2024" },
  { id: 1005, title: "App Crash on Launch", description: "Customer reports that the mobile app crashes immediately upon opening on Android 13.", customer: "David Wilson", priority: "high", status: "open", createdAt: "1/16/2024" },
  { id: 1006, title: "Refund Not Processed", description: "Customer requested a refund two weeks ago but has not received the amount yet.", customer: "Sophia Taylor", priority: "medium", status: "inprogress", createdAt: "1/20/2024" },
  { id: 1007, title: "Two-Factor Authentication Issue", description: "Customer is not receiving 2FA codes on their registered phone number.", customer: "James Anderson", priority: "high", status: "open", createdAt: "1/21/2024" },
  { id: 1008, title: "Unable to Update Profile Picture", description: "Customer tries to upload a new profile picture but gets 'Upload failed' error.", customer: "Olivia Martinez", priority: "low", status: "open", createdAt: "1/22/2024" },
  { id: 1009, title: "Subscription Auto-Renewal", description: "Customer wants to enable auto-renewal for their subscription but the toggle is disabled.", customer: "Liam Thomas", priority: "medium", status: "inprogress", createdAt: "1/17/2024" },
  { id: 1010, title: "Missing Order Confirmation Email", description: "Customer placed an order but didn't receive a confirmation email even though payment succeeded.", customer: "Isabella Garcia", priority: "medium", status: "open", createdAt: "1/24/2024" },
];

/* ── Priority badge ─────────────────────────────────────────────────────────── */
const priorityConfig = {
  high:   { cls: "text-red-600",   label: "HIGH PRIORITY" },
  medium: { cls: "text-amber-600", label: "MEDIUM PRIORITY" },
  low:    { cls: "text-green-600", label: "LOW PRIORITY" },
};

const PriorityBadge = ({ priority }) => {
  const { cls, label } = priorityConfig[priority] ?? priorityConfig.low;
  return (
    <span className={`text-[9px] font-bold tracking-wide uppercase ${cls}`}>{label}</span>
  );
};

/* ── Status badge ───────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const isProgress = status === "inprogress";
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2 py-0.5 border whitespace-nowrap
      ${isProgress ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-green-50 text-green-800 border-green-300"}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isProgress ? "bg-amber-400" : "bg-green-500"}`} />
      {isProgress ? "In-Progress" : "Open"}
    </span>
  );
};

/* ── Icons ──────────────────────────────────────────────────────────────────── */
const UserIcon = () => (
  <svg className="w-2.5 h-2.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const CalIcon = () => (
  <svg className="w-2.5 h-2.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const MenuIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

/* ── Ticket card ────────────────────────────────────────────────────────────── */
const TicketCard = ({ ticket, onAdd, active }) => (
  <div
    onClick={() => !active && onAdd(ticket)}
    className={`border rounded-lg p-3 transition-shadow duration-150 bg-white
      ${active ? "border-indigo-300 cursor-default" : "border-gray-200 cursor-pointer hover:shadow-md hover:border-indigo-200"}`}
  >
    <div className="flex justify-between items-start gap-2 mb-1.5">
      <span className="text-[13px] font-semibold text-gray-900 leading-snug flex-1">{ticket.title}</span>
      <StatusBadge status={ticket.status} />
    </div>
    <p className="text-[11.5px] text-gray-500 leading-relaxed mb-2 line-clamp-2">{ticket.description}</p>
    <div className="flex items-center justify-between flex-wrap gap-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-gray-400">#{ticket.id}</span>
        <PriorityBadge priority={ticket.priority} />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] text-gray-500 flex items-center gap-1"><UserIcon />{ticket.customer}</span>
        <span className="text-[11px] text-gray-500 flex items-center gap-1"><CalIcon />{ticket.createdAt}</span>
      </div>
    </div>
  </div>
);

/* ── Task card ──────────────────────────────────────────────────────────────── */
const TaskCard = ({ ticket, onComplete }) => (
  <div className="border border-gray-200 rounded-lg p-3 bg-white">
    <p className="text-[12.5px] font-semibold text-gray-900 leading-snug mb-2.5">{ticket.title}</p>
    <button
      onClick={() => onComplete(ticket)}
      className="w-full bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold rounded-md py-2 transition-colors duration-150"
    >
      Complete
    </button>
  </div>
);

/* ── App ────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="h-14 flex items-center justify-between px-4 md:px-7">
          <span className="font-bold text-[15px] text-gray-900">CS — Ticket System</span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {["Home", "FAQ", "Changelog", "Blog", "Download", "Contact"].map(n => (
              <a key={n} href="#" className="text-[13px] text-gray-600 hover:text-gray-900 no-underline font-normal transition-colors">{n}</a>
            ))}
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-semibold rounded-md px-3.5 py-1.5 transition-colors">
              + New Ticket
            </button>
          </div>

          {/* Mobile: New Ticket + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-[12px] font-semibold rounded-md px-3 py-1.5 transition-colors">
              + New Ticket
            </button>
            <button onClick={() => setMenuOpen(o => !o)} className="p-1.5 text-gray-600 hover:text-gray-900 transition-colors">
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
            {["Home", "FAQ", "Changelog", "Blog", "Download", "Contact"].map(n => (
              <a key={n} href="#" onClick={() => setMenuOpen(false)}
                className="text-[14px] text-gray-700 hover:text-indigo-600 no-underline font-medium transition-colors py-1">
                {n}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── BANNER ─────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-6 pt-4">
        <div className="rounded-xl overflow-hidden grid grid-cols-2">

          {/* In-Progress */}
          <div className="relative overflow-hidden flex flex-col items-center justify-center py-6 md:py-7"
            style={{ background: "linear-gradient(135deg,#7c3aed 0%,#5b21b6 45%,#4338ca 100%)" }}>
            <div className="absolute top-[-60px] right-[-60px] w-[150px] h-[150px] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute bottom-[-70px] left-[-40px] w-[200px] h-[200px] rounded-full border border-white/10 pointer-events-none" />
            <p className="relative text-white/80 text-xs md:text-sm font-medium mb-1">In-Progress</p>
            <p className="relative text-white text-4xl md:text-[44px] font-bold leading-none">{inProgress.length}</p>
          </div>

          {/* Resolved */}
          <div className="relative overflow-hidden flex flex-col items-center justify-center py-6 md:py-7"
            style={{ background: "linear-gradient(135deg,#0d9488 0%,#0f766e 50%,#064e3b 100%)" }}>
            <div className="absolute top-[-60px] left-[-60px] w-[150px] h-[150px] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute bottom-[-70px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/10 pointer-events-none" />
            <p className="relative text-white/80 text-xs md:text-sm font-medium mb-1">Resolved</p>
            <p className="relative text-white text-4xl md:text-[44px] font-bold leading-none">{resolved.length}</p>
          </div>

        </div>
      </div>

      {/* ── MAIN SECTION ───────────────────────────────────────────────────── */}
      <div className="px-4 md:px-6 pt-4 pb-8">
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-3 md:p-4
          grid grid-cols-1 lg:grid-cols-[1fr_248px] gap-4 items-start">

          {/* LEFT: Customer Tickets */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3 pb-2.5 border-b border-gray-100">
              Customer Tickets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tickets.map(ticket => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onAdd={handleAddTicket}
                  active={inProgress.some(t => t.id === ticket.id)}
                />
              ))}
              {tickets.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <p className="text-3xl mb-2">🎉</p>
                  <p className="text-[13px] font-semibold">All tickets resolved!</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Task Status */}
          <div className="lg:sticky lg:top-20">
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

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 px-4 md:px-7 pt-10 pb-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] gap-6 md:gap-7 mb-8">

            {/* Brand — full width on mobile */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <p className="text-white font-bold text-[15px] mb-3">CS — Ticket System</p>
              <p className="text-[12px] text-gray-500 leading-7 max-w-xs lg:max-w-[230px]">
                CS Ticket System is a modern support platform designed to manage customer issues efficiently and streamline communication between users and support teams.
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
                { bg: "bg-blue-700", label: "CS — Ticket System", icon: "𝕏" },
                { bg: "bg-sky-600",  label: "CS — Ticket System", icon: "in" },
                { bg: "bg-blue-600", label: "CS — Ticket System", icon: "f" },
                { bg: "bg-gray-600", label: "support@css.com",    icon: "✉" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 mb-2.5 cursor-pointer group">
                  <span className={`${s.bg} w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}>
                    {s.icon}
                  </span>
                  <span className="text-[12px] text-gray-500 group-hover:text-gray-300 transition-colors truncate">{s.label}</span>
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