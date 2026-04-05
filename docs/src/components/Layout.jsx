import { useState, useEffect, useCallback } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import SearchModal from "./SearchModal";
import TableOfContents from "./TableOfContents";
import PageNavigation from "./PageNavigation";

const navSections = [
  {
    title: "GETTING STARTED",
    collapsible: true,
    links: [
      { to: "/", label: "Introduction" },
      { to: "/quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "API REFERENCE",
    collapsible: true,
    links: [
      { to: "/auth", label: "Authentication" },
      { to: "/transactions", label: "Transactions" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/users", label: "User Management" },
    ],
  },
  {
    title: "CONCEPTS",
    collapsible: true,
    links: [
      { to: "/concepts/jwt", label: "JWT Authentication" },
      { to: "/concepts/rbac", label: "Role-Based Access Control" },
      { to: "/concepts/data-models", label: "Data Models" },
      { to: "/concepts/aggregation", label: "MongoDB Aggregation" },
    ],
  },
  {
    title: "ARCHITECTURE",
    collapsible: true,
    links: [
      { to: "/architecture/project-structure", label: "Project Structure" },
      { to: "/architecture/environment", label: "Environment & Setup" },
    ],
  },
  {
    title: "ERROR HANDLING",
    collapsible: true,
    links: [{ to: "/error-handling", label: "Error Handling" }],
  },
];

// Find which sections contain the current path so they auto-expand
function getActiveSections(pathname) {
  const active = new Set();
  navSections.forEach((section) => {
    if (section.links.some((l) => l.to === pathname)) {
      active.add(section.title);
    }
  });
  return active;
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const [tocKey, setTocKey] = useState(0);
  const [expanded, setExpanded] = useState(() => {
    const active = getActiveSections(location.pathname);
    active.add("GETTING STARTED");
    return active;
  });

  const handleSearchClose = useCallback(() => setSearchOpen(false), []);

  const toggleSection = (title) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  useEffect(() => {
    setTocKey((k) => k + 1);
    window.scrollTo(0, 0);
    // Auto-expand the section that contains the current route
    setExpanded((prev) => {
      const next = new Set(prev);
      getActiveSections(location.pathname).forEach((s) => next.add(s));
      return next;
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-40 flex items-center px-5 lg:px-8">
        <div className="flex items-center gap-3.5 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 -ml-1.5 text-slate-500 hover:text-slate-900"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <NavLink to="/" className="flex items-center no-underline">
            <span className="text-[22px] font-extrabold text-slate-900 tracking-tight">
              FinTrack
            </span>
            <span className="text-[13px] text-slate-400 font-medium ml-2.5 mt-0.5">
              API Docs
            </span>
          </NavLink>
        </div>

        <div className="flex-1 justify-center px-6 max-w-md mx-auto hidden sm:flex">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 border border-slate-200 rounded-lg text-[14px] text-slate-400 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer bg-slate-50/80 hover:bg-white"
          >
            <Search size={15} className="text-slate-400" />
            <span className="flex-1 text-left">Quick search...</span>
            <kbd className="text-[11px] text-slate-400 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 font-mono font-medium">
              Ctrl K
            </kbd>
          </button>
        </div>

        <div className="shrink-0 flex items-center gap-5 sm:hidden ml-auto">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            title="Search"
          >
            <Search size={20} />
          </button>
          <a
            href="https://fintrack-live.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-slate-700 transition-colors"
            title="Live Demo"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <a
            href="https://github.com/Pratham21223/Fintrack"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-slate-700 transition-colors"
            title="GitHub"
          >
            <svg width="21" height="21" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>

        <div className="shrink-0 hidden sm:flex items-center gap-4">
          <a
            href="https://fintrack-live.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-slate-700 transition-colors"
            title="Live Demo"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <a
            href="https://github.com/Pratham21223/Fintrack"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-slate-700 transition-colors"
            title="GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-30 overflow-y-auto transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="px-4 py-6">
          {navSections.map((section) => {
            const isExpanded =
              !section.collapsible || expanded.has(section.title);
            const hasActiveLink = section.links.some(
              (l) => l.to === location.pathname,
            );

            return (
              <div key={section.title} className="mb-4">
                {section.collapsible ? (
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 mb-1 rounded-md text-[11.5px] font-semibold tracking-widest transition-colors cursor-pointer ${
                      hasActiveLink
                        ? "text-indigo-600"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {section.title}
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <div className="px-3 mb-1.5 text-[11.5px] font-semibold text-slate-400 tracking-widest">
                    {section.title}
                  </div>
                )}
                {isExpanded && (
                  <div className="space-y-0.5">
                    {section.links.map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-[14.5px] transition-all ${
                            section.collapsible ? "pl-5" : ""
                          } ${
                            isActive
                              ? "bg-indigo-50 text-indigo-700 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
        />
      )}

      {/* Main content */}
      <main className="lg:pl-64 pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex gap-10 py-10 lg:py-12">
            <div id="doc-content" className="flex-1 min-w-0 max-w-3xl">
              <Outlet />
              <PageNavigation />
            </div>
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-24">
                <TableOfContents key={tocKey} />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={handleSearchClose} />
    </div>
  );
}
