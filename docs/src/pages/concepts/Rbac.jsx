import CodeBlock from "../../components/CodeBlock";

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

export default function Rbac() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Role-Based Access Control
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          Access control is enforced at the middleware level using a flexible
          role-based system. Three distinct roles define what each user can do
          across the entire API.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2 id="three-roles" className="text-2xl font-bold text-slate-900 mb-4">
        Three roles
      </h2>
      <div className="grid gap-3 mb-8">
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
              Read-only access to transactions and own profile. Automatically
              assigned to new users on registration.
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
              Everything a viewer can do, plus access to all dashboard analytics
              endpoints (summary, category breakdown, monthly trends, recent
              activity).
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
              Full access — create/update/delete transactions, manage users, and
              all dashboard analytics.
            </p>
          </div>
        </div>
      </div>

      <h2
        id="authorize-middleware"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        The authorize() middleware
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Role enforcement happens through a higher-order middleware function. It
        accepts a list of allowed roles and returns an Express middleware that
        checks <code>req.user.role</code> against them:
      </p>
      <CodeBlock title="middlewares/rbac.js">{`const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`Access denied. Required role(s): \${allowedRoles.join(", ")}\`,
      });
    }
    next();
  };
};`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          Design decision
        </p>
        <p className="text-[14px] text-blue-800/80">
          Using a variadic function (<code>...allowedRoles</code>) means any
          combination of roles can be specified per route. For example,
          dashboard routes use <code>authorize("analyst", "admin")</code> while
          user management uses <code>authorize("admin")</code>.
        </p>
      </div>

      <h2
        id="permission-matrix"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Permission matrix
      </h2>
      <p className="text-[15px] text-slate-600 mb-5">
        Complete breakdown of which role can perform which action across the
        API.
      </p>
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
    </div>
  );
}
