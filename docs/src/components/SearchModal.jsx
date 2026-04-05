import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const searchIndex = [
  {
    title: "Overview",
    desc: "API overview, base URL, roles, error codes",
    path: "/",
  },
  {
    title: "Authentication",
    desc: "Register, login, profile endpoints",
    path: "/auth",
  },
  {
    title: "POST /api/auth/register",
    desc: "Create a new user account",
    path: "/auth",
  },
  {
    title: "POST /api/auth/login",
    desc: "Authenticate and receive JWT token",
    path: "/auth",
  },
  {
    title: "GET /api/auth/profile",
    desc: "Get current user's profile",
    path: "/auth",
  },
  {
    title: "Transactions",
    desc: "CRUD operations for financial records",
    path: "/transactions",
  },
  {
    title: "GET /api/transactions",
    desc: "List transactions with filtering and pagination",
    path: "/transactions",
  },
  {
    title: "GET /api/transactions/:id",
    desc: "Get a single transaction by ID",
    path: "/transactions",
  },
  {
    title: "POST /api/transactions",
    desc: "Create a new transaction",
    path: "/transactions",
  },
  {
    title: "PUT /api/transactions/:id",
    desc: "Update a transaction",
    path: "/transactions",
  },
  {
    title: "DELETE /api/transactions/:id",
    desc: "Soft delete a transaction",
    path: "/transactions",
  },
  {
    title: "Dashboard",
    desc: "Analytics and aggregation endpoints",
    path: "/dashboard",
  },
  {
    title: "GET /api/dashboard/summary",
    desc: "Total income, expenses, net balance",
    path: "/dashboard",
  },
  {
    title: "GET /api/dashboard/category-breakdown",
    desc: "Totals grouped by category",
    path: "/dashboard",
  },
  {
    title: "GET /api/dashboard/monthly-trend",
    desc: "Income and expense per month",
    path: "/dashboard",
  },
  {
    title: "GET /api/dashboard/recent",
    desc: "Last 5 transactions",
    path: "/dashboard",
  },
  {
    title: "User Management",
    desc: "Admin-only user management endpoints",
    path: "/users",
  },
  { title: "GET /api/users", desc: "List all users", path: "/users" },
  {
    title: "PATCH /api/users/:id/role",
    desc: "Change a user's role",
    path: "/users",
  },
  {
    title: "PATCH /api/users/:id/status",
    desc: "Toggle user active status",
    path: "/users",
  },
  { title: "Base URL", desc: "http://localhost:3000/api", path: "/" },
  {
    title: "Roles",
    desc: "viewer, analyst, admin role definitions",
    path: "/",
  },
  {
    title: "Permission Matrix",
    desc: "Role-based access control table",
    path: "/",
  },
  {
    title: "Error Codes",
    desc: "400, 401, 403, 404, 422, 500 status codes",
    path: "/",
  },
  {
    title: "Test Credentials",
    desc: "Seeded test accounts for development",
    path: "/",
  },
];

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results =
    query.length > 0
      ? searchIndex.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        navigate(results[selectedIndex].path);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, results, selectedIndex, navigate, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 px-5 border-b border-slate-200">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full py-3.5 text-[15px] text-slate-900 placeholder-slate-400 bg-transparent outline-none"
          />
          <kbd className="shrink-0 text-[11px] text-slate-400 bg-slate-100 border border-slate-200 rounded-md px-1.5 py-0.5 font-mono">
            ESC
          </kbd>
        </div>

        {query.length > 0 && (
          <div className="max-h-80 overflow-y-auto py-2">
            {results.length === 0 ? (
              <div className="px-5 py-10 text-center text-[14px] text-slate-400">
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              results.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className={`w-full text-left px-5 py-3 flex flex-col cursor-pointer transition-colors ${
                    i === selectedIndex ? "bg-indigo-50" : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`text-[14px] font-medium ${i === selectedIndex ? "text-indigo-700" : "text-slate-800"}`}
                  >
                    {item.title}
                  </span>
                  <span className="text-[12.5px] text-slate-400 mt-0.5">
                    {item.desc}
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        {query.length === 0 && (
          <div className="px-5 py-10 text-center text-[14px] text-slate-400">
            Type to search endpoints, pages, and topics
          </div>
        )}
      </div>
    </div>
  );
}
