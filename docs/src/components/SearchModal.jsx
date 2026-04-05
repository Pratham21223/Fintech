import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const searchIndex = [
  // Getting Started
  {
    title: "Introduction",
    desc: "API overview, base URL, roles, error codes",
    path: "/",
    section: "Getting Started",
    keywords: "home overview start",
  },
  {
    title: "Quick Start",
    desc: "Login, create transaction, list, update, delete walkthrough",
    path: "/quick-start",
    section: "Getting Started",
    keywords: "tutorial guide example test credentials",
  },
  {
    title: "Test Credentials",
    desc: "admin@test.com, analyst@test.com, viewer@test.com",
    path: "/quick-start",
    section: "Getting Started",
    keywords: "login password seed accounts",
  },
  // API Reference
  {
    title: "Authentication",
    desc: "Register, login, profile endpoints",
    path: "/auth",
    section: "API Reference",
    keywords: "auth register login profile token",
  },
  {
    title: "POST /api/auth/register",
    desc: "Create a new user account",
    path: "/auth",
    section: "API Reference",
    keywords: "signup create user",
  },
  {
    title: "POST /api/auth/login",
    desc: "Authenticate and receive JWT token",
    path: "/auth",
    section: "API Reference",
    keywords: "signin authenticate",
  },
  {
    title: "GET /api/auth/profile",
    desc: "Get current user's profile",
    path: "/auth",
    section: "API Reference",
    keywords: "me whoami",
  },
  {
    title: "Transactions",
    desc: "CRUD operations for financial records",
    path: "/transactions",
    section: "API Reference",
    keywords: "income expense money payment",
  },
  {
    title: "GET /api/transactions",
    desc: "List transactions with filtering and pagination",
    path: "/transactions",
    section: "API Reference",
    keywords: "list filter search sort paginate",
  },
  {
    title: "POST /api/transactions",
    desc: "Create a new transaction (admin)",
    path: "/transactions",
    section: "API Reference",
    keywords: "create add new record",
  },
  {
    title: "PUT /api/transactions/:id",
    desc: "Update a transaction (admin)",
    path: "/transactions",
    section: "API Reference",
    keywords: "edit modify change",
  },
  {
    title: "DELETE /api/transactions/:id",
    desc: "Soft delete a transaction (admin)",
    path: "/transactions",
    section: "API Reference",
    keywords: "remove soft delete",
  },
  {
    title: "Dashboard",
    desc: "Analytics and aggregation endpoints",
    path: "/dashboard",
    section: "API Reference",
    keywords: "summary analytics stats charts",
  },
  {
    title: "GET /api/dashboard/summary",
    desc: "Total income, expenses, net balance",
    path: "/dashboard",
    section: "API Reference",
    keywords: "totals balance overview",
  },
  {
    title: "GET /api/dashboard/category-breakdown",
    desc: "Totals grouped by category",
    path: "/dashboard",
    section: "API Reference",
    keywords: "group category breakdown",
  },
  {
    title: "GET /api/dashboard/monthly-trend",
    desc: "Income and expense per month",
    path: "/dashboard",
    section: "API Reference",
    keywords: "trend monthly chart time",
  },
  {
    title: "User Management",
    desc: "Admin-only user management endpoints",
    path: "/users",
    section: "API Reference",
    keywords: "users admin manage",
  },
  {
    title: "GET /api/users",
    desc: "List all users (admin)",
    path: "/users",
    section: "API Reference",
    keywords: "list users all",
  },
  {
    title: "PATCH /api/users/:id/role",
    desc: "Change a user's role (admin)",
    path: "/users",
    section: "API Reference",
    keywords: "role change promote demote viewer analyst admin",
  },
  {
    title: "PATCH /api/users/:id/status",
    desc: "Toggle user active status (admin)",
    path: "/users",
    section: "API Reference",
    keywords: "activate deactivate disable enable ban",
  },
  // Concepts
  {
    title: "JWT Authentication",
    desc: "Token signing, verification middleware, Bearer header",
    path: "/concepts/jwt",
    section: "Concepts",
    keywords: "jwt jsonwebtoken token auth middleware verify",
  },
  {
    title: "Role-Based Access Control",
    desc: "authorize() middleware, three roles, permission matrix",
    path: "/concepts/rbac",
    section: "Concepts",
    keywords: "rbac roles permissions access control authorize",
  },
  {
    title: "Data Models",
    desc: "User and Transaction Mongoose schemas, indexes, bcrypt",
    path: "/concepts/data-models",
    section: "Concepts",
    keywords: "schema model mongoose database mongodb user transaction",
  },
  {
    title: "MongoDB Aggregation",
    desc: "$match, $group, $sort pipelines for dashboard analytics",
    path: "/concepts/aggregation",
    section: "Concepts",
    keywords: "aggregate pipeline sum group match sort",
  },
  {
    title: "Soft Deletes",
    desc: "isDeleted flag preserves financial records",
    path: "/concepts/data-models",
    section: "Concepts",
    keywords: "soft delete isDeleted recoverable",
  },
  {
    title: "Password Hashing",
    desc: "bcrypt pre-save hook with 10 salt rounds",
    path: "/concepts/data-models",
    section: "Concepts",
    keywords: "bcrypt hash password salt security",
  },
  // Architecture
  {
    title: "Project Structure",
    desc: "Folder layout, middleware stack, separation of concerns",
    path: "/architecture/project-structure",
    section: "Architecture",
    keywords: "folders structure routes controllers models middlewares",
  },
  {
    title: "Environment & Setup",
    desc: "env vars, dependencies, seeding, npm commands",
    path: "/architecture/environment",
    section: "Architecture",
    keywords: "install setup env dotenv mongodb seed npm",
  },
  {
    title: "Global Middleware",
    desc: "cors, helmet, morgan, rate-limit, express.json",
    path: "/architecture/project-structure",
    section: "Architecture",
    keywords: "cors helmet morgan rate limit security headers",
  },
  {
    title: "Database Seeding",
    desc: "npm run seed — test users and sample transactions",
    path: "/architecture/environment",
    section: "Architecture",
    keywords: "seed data populate test",
  },
  // Error Handling
  {
    title: "Error Handling",
    desc: "Global error handler, ApiError class, validation, status codes",
    path: "/error-handling",
    section: "Error Handling",
    keywords: "error handler catch middleware",
  },
  {
    title: "Validation Errors",
    desc: "express-validator, field-level 422 responses",
    path: "/error-handling",
    section: "Error Handling",
    keywords: "validate input body 422 unprocessable",
  },
  {
    title: "HTTP Status Codes",
    desc: "400, 401, 403, 404, 422, 429, 500",
    path: "/error-handling",
    section: "Error Handling",
    keywords: "status code http error response",
  },
  // Homepage topics
  {
    title: "Base URL",
    desc: "https://fintrack-be.vercel.app/api",
    path: "/",
    section: "Getting Started",
    keywords: "url endpoint base host port",
  },
  {
    title: "Roles",
    desc: "viewer, analyst, admin role definitions",
    path: "/",
    section: "Getting Started",
    keywords: "roles viewer analyst admin permissions",
  },
  {
    title: "Permission Matrix",
    desc: "Which role can do what",
    path: "/",
    section: "Getting Started",
    keywords: "permissions access matrix table",
  },
];

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results =
    query.length > 0
      ? searchIndex
          .map((item) => {
            const q = query.toLowerCase();
            const titleMatch = item.title.toLowerCase().includes(q);
            const descMatch = item.desc.toLowerCase().includes(q);
            const keywordMatch = (item.keywords || "")
              .toLowerCase()
              .includes(q);
            if (!titleMatch && !descMatch && !keywordMatch) return null;
            const score = titleMatch ? 3 : descMatch ? 2 : 1;
            return { ...item, score };
          })
          .filter(Boolean)
          .sort((a, b) => b.score - a.score)
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
                  className={`w-full text-left px-5 py-3 flex items-start gap-3 cursor-pointer transition-colors ${
                    i === selectedIndex ? "bg-indigo-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[14px] font-medium ${i === selectedIndex ? "text-indigo-700" : "text-slate-800"}`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[12.5px] text-slate-400 mt-0.5 block truncate">
                      {item.desc}
                    </span>
                  </div>
                  {item.section && (
                    <span className="shrink-0 mt-0.5 text-[10.5px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-400">
                      {item.section}
                    </span>
                  )}
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
