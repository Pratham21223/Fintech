import CodeBlock from "../components/CodeBlock";
import { Link } from "react-router-dom";

const permissions = [
  ["Register / Login", true, true, true],
  ["View own profile", true, true, true],
  ["View transactions", true, true, true],
  ["Search & filter transactions", true, true, true],
  ["View dashboard analytics", false, true, true],
  ["Create transactions", false, false, true],
  ["Update transactions", false, false, true],
  ["Delete transactions", false, false, true],
  ["List all users", false, false, true],
  ["Change user roles", false, false, true],
  ["Toggle user status", false, false, true],
];

const features = [
  {
    title: "Authentication & JWT",
    desc: "Register, login, and profile endpoints with 7-day token expiry.",
    href: "/auth",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: "Transaction CRUD",
    desc: "Full create, read, update, and soft-delete with filtering and pagination.",
    href: "/transactions",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Dashboard Analytics",
    desc: "Aggregated summaries, category breakdowns, and monthly trends.",
    href: "/dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    title: "User Management",
    desc: "Admin controls for listing users, changing roles, and toggling status.",
    href: "/users",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const errorCodes = [
  {
    code: "400",
    meaning: "Bad request or validation error",
    color: "text-amber-600 bg-amber-50",
  },
  {
    code: "401",
    meaning: "Missing or invalid token",
    color: "text-orange-600 bg-orange-50",
  },
  {
    code: "403",
    meaning: "Insufficient role or deactivated account",
    color: "text-rose-600 bg-rose-50",
  },
  {
    code: "404",
    meaning: "Resource not found",
    color: "text-slate-600 bg-slate-50",
  },
  {
    code: "422",
    meaning: "Validation failed (field-level errors)",
    color: "text-purple-600 bg-purple-50",
  },
  {
    code: "500",
    meaning: "Internal server error",
    color: "text-red-700 bg-red-50",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative mb-12">
        <div className="absolute -inset-x-6 -top-10 bottom-0 bg-linear-to-b from-indigo-50/70 via-indigo-50/30 to-transparent rounded-3xl -z-10" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[12px] font-bold tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          v1.0 — REST API
        </span>
        <h1 className="text-[2.75rem] leading-[1.15] font-extrabold text-slate-900 tracking-tight mb-4">
          FinTrack API
          <br />
          <span className="text-indigo-600">Documentation</span>
        </h1>
        <p className="text-[17px] text-slate-500 leading-relaxed max-w-xl">
          Everything you need to integrate financial record management, user
          access control, and dashboard analytics into your application.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        {features.map((f) => (
          <Link
            key={f.href}
            to={f.href}
            className="group flex gap-4 p-5 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50 transition-all no-underline bg-white"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              {f.icon}
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-800 group-hover:text-indigo-700 transition-colors mb-1">
                {f.title}
              </h3>
              <p className="text-[13.5px] text-slate-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <h2 id="base-url" className="text-2xl font-bold text-slate-900 mb-4">
        Base URL
      </h2>
      <p className="text-[15px] text-slate-600 mb-3">
        All endpoints are relative to this base:
      </p>
      <CodeBlock>http://localhost:3000/api</CodeBlock>

      <h2
        id="authentication"
        className="text-2xl font-bold text-slate-900 mt-16 mb-4"
      >
        Authentication
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        All protected routes require a Bearer token in the{" "}
        <code>Authorization</code> header. Obtain a token by calling{" "}
        <code>POST /api/auth/login</code> with valid credentials.
      </p>
      <CodeBlock>Authorization: Bearer &lt;token&gt;</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          How it works
        </p>
        <ul className="space-y-1.5 text-[14px] text-blue-800/80">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            Tokens expire after <strong>7 days</strong>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            Format: JSON Web Token (JWT)
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            Every request verifies user exists and is active
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>Role
            changes take effect immediately
          </li>
        </ul>
      </div>

      <h2 id="roles" className="text-2xl font-bold text-slate-900 mt-16 mb-4">
        Roles
      </h2>
      <p className="text-[15px] text-slate-600 mb-5">
        Three roles control what each user can access.
      </p>
      <div className="grid gap-3">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-mono text-[12px] font-bold">
            V
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              viewer
            </span>
            <span className="text-[11px] ml-2 px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 font-medium">
              default
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              View transactions and own profile. Assigned to new users
              automatically.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-mono text-[12px] font-bold">
            A
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              analyst
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Everything viewer can do, plus full dashboard analytics access.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-mono text-[12px] font-bold">
            S
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              admin
            </span>
            <span className="text-[11px] ml-2 px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-medium">
              superuser
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Full access — CRUD transactions, manage users, and dashboard.
            </p>
          </div>
        </div>
      </div>

      <h2
        id="permission-matrix"
        className="text-2xl font-bold text-slate-900 mt-16 mb-4"
      >
        Permission matrix
      </h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-4 py-3 text-center text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Viewer
              </th>
              <th className="px-4 py-3 text-center text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Analyst
              </th>
              <th className="px-4 py-3 text-center text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Admin
              </th>
            </tr>
          </thead>
          <tbody>
            {permissions.map(([action, v, a, ad], i) => (
              <tr
                key={action}
                className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""} hover:bg-indigo-50/40 transition-colors`}
              >
                <td className="px-4 py-2.5 text-slate-700 font-medium">
                  {action}
                </td>
                <td className="px-4 py-2.5 text-center">
                  {v ? (
                    <span className="inline-flex w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center text-[11px] font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-center">
                  {a ? (
                    <span className="inline-flex w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center text-[11px] font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-center">
                  {ad ? (
                    <span className="inline-flex w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center text-[11px] font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2
        id="response-format"
        className="text-2xl font-bold text-slate-900 mt-16 mb-4"
      >
        Response format
      </h2>
      <p className="text-[15.5px] text-slate-600 mb-5">
        Every endpoint returns JSON with a consistent envelope. Here are the
        three shapes you'll encounter:
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[14px] font-bold text-slate-800">
              Success response
            </span>
          </div>
          <CodeBlock title="200 OK">{`{
  "success": true,
  "message": "Operation completed",
  "data": { ... }
}`}</CodeBlock>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[14px] font-bold text-slate-800">
              Error response
            </span>
          </div>
          <CodeBlock title="4xx / 5xx">{`{
  "success": false,
  "message": "Error description"
}`}</CodeBlock>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[14px] font-bold text-slate-800">
              Paginated list
            </span>
          </div>
          <CodeBlock title="200 OK">{`{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}`}</CodeBlock>
        </div>
      </div>

      <h2
        id="error-codes"
        className="text-2xl font-bold text-slate-900 mt-16 mb-4"
      >
        Error codes
      </h2>
      <p className="text-[15px] text-slate-600 mb-5">
        HTTP status codes returned by the API and what they mean.
      </p>
      <div className="grid gap-2">
        {errorCodes.map((e) => (
          <div
            key={e.code}
            className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <code
              className={`shrink-0 font-mono text-[13px] font-extrabold px-2.5 py-1 rounded-md ${e.color}`}
            >
              {e.code}
            </code>
            <span className="text-[14.5px] text-slate-700">{e.meaning}</span>
          </div>
        ))}
      </div>

      <h2
        id="test-credentials"
        className="text-2xl font-bold text-slate-900 mt-16 mb-4"
      >
        Test credentials
      </h2>
      <p className="text-[15px] text-slate-600 mb-5">
        Seeded accounts for development. Run the seed script to create them.
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 hover:bg-indigo-50/40 transition-colors">
              <td className="px-4 py-3 font-mono text-[13px] text-indigo-600 font-medium">
                admin@test.com
              </td>
              <td className="px-4 py-3 font-mono text-[13px] text-slate-700">
                admin123
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[12px] font-bold">
                  admin
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-indigo-50/40 transition-colors">
              <td className="px-4 py-3 font-mono text-[13px] text-indigo-600 font-medium">
                analyst@test.com
              </td>
              <td className="px-4 py-3 font-mono text-[13px] text-slate-700">
                analyst123
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[12px] font-bold">
                  analyst
                </span>
              </td>
            </tr>
            <tr className="hover:bg-indigo-50/40 transition-colors">
              <td className="px-4 py-3 font-mono text-[13px] text-indigo-600 font-medium">
                viewer@test.com
              </td>
              <td className="px-4 py-3 font-mono text-[13px] text-slate-700">
                viewer123
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[12px] font-bold">
                  viewer
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
