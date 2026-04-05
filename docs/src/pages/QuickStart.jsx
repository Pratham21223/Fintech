import CodeBlock from "../components/CodeBlock";
import RequestBlock from "../components/RequestBlock";

export default function QuickStart() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Quick Start
        </h1>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          Get up and running in minutes — login, create a transaction, list with
          filters, and explore the API.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2
        id="test-credentials"
        className="text-2xl font-bold text-slate-900 mb-4"
      >
        Test Credentials
      </h2>
      <p className="text-[15px] text-slate-600 mb-4">
        Use these seeded accounts to test different roles:
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 mb-10">
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
                <code className="font-mono text-[13px] text-slate-700 font-medium">
                  Admin
                </code>
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
                <code className="font-mono text-[13px] text-slate-700 font-medium">
                  Analyst
                </code>
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
                <code className="font-mono text-[13px] text-slate-700 font-medium">
                  Viewer
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 mb-10">
        <p className="text-[14px] text-amber-900 font-semibold mb-2">
          Prerequisites
        </p>
        <p className="text-[14px] text-amber-800/80">
          Make sure the backend is running (<code>npm run dev</code>) and the
          database is seeded (<code>npm run seed</code>). See{" "}
          <a
            href="/architecture/environment"
            className="text-amber-700 underline"
          >
            Environment & Setup
          </a>{" "}
          for details.
        </p>
      </div>

      <h2 id="login" className="text-2xl font-bold text-slate-900 mb-4">
        1. Login
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Authenticate as an admin to get a JWT token. Use one of the seeded test
        accounts.
      </p>
      <RequestBlock
        method="POST"
        path="/api/auth/login"
        auth="None"
        body={`{
  "email": "admin@test.com",
  "password": "admin123"
}`}
      />
      <CodeBlock title="Response — 200 OK">{`{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "664f...",
      "name": "Admin",
      "email": "admin@test.com",
      "role": "admin"
    }
  }
}`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
        <p className="text-[14px] text-emerald-900 font-semibold mb-1">
          Save the token
        </p>
        <p className="text-[14px] text-emerald-800/80">
          Copy the <code>token</code> value — you'll pass it as{" "}
          <code>Authorization: Bearer &lt;token&gt;</code> in all subsequent
          requests.
        </p>
      </div>

      <h2
        id="create-transaction"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        2. Create a transaction
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Create a new income record. Requires <strong>admin</strong> role.
      </p>
      <RequestBlock
        method="POST"
        path="/api/transactions"
        auth="Bearer Token"
        body={`{
  "amount": 3000,
  "type": "income",
  "category": "salary",
  "description": "April salary"
}`}
      />
      <CodeBlock title="Response — 201 Created">{`{
  "success": true,
  "message": "Transaction created",
  "data": {
    "_id": "664f...",
    "amount": 3000,
    "type": "income",
    "category": "salary",
    "description": "April salary",
    "date": "2025-04-05T00:00:00.000Z",
    "createdBy": "664f...",
    "isDeleted": false
  }
}`}</CodeBlock>

      <h2
        id="list-transactions"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        3. List with filters
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Fetch transactions with query parameters. Any authenticated user can
        list.
      </p>
      <RequestBlock
        method="GET"
        path="/api/transactions?type=income&page=1&limit=5"
        auth="Bearer Token"
      />
      <CodeBlock title="Response — 200 OK">{`{
  "success": true,
  "data": [ { "amount": 3000, "type": "income", "category": "salary", ... } ],
  "pagination": { "total": 1, "page": 1, "limit": 5, "totalPages": 1 }
}`}</CodeBlock>

      <div className="overflow-x-auto rounded-xl border border-slate-200 mt-5 mb-8">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Query param
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Example
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                type
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                <code>?type=expense</code>
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                category
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                <code>?category=salary</code>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                search
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                <code>?search=rent</code> — searches description & category
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                startDate / endDate
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                <code>?startDate=2025-01-01&endDate=2025-03-31</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        id="update-transaction"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        4. Update a transaction
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Partial updates — only send the fields you want to change. Admin only.
      </p>
      <RequestBlock
        method="PUT"
        path="/api/transactions/:id"
        auth="Bearer Token"
        body={`{
  "amount": 3500,
  "description": "April salary (updated)"
}`}
      />

      <h2
        id="delete-transaction"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        5. Soft delete
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Records are soft-deleted (<code>isDeleted: true</code>) — hidden from
        queries but preserved in the database.
      </p>
      <RequestBlock
        method="DELETE"
        path="/api/transactions/:id"
        auth="Bearer Token"
      />

      <h2
        id="whats-next"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        What's next?
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        <a
          href="/auth"
          className="group flex gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50 transition-all no-underline bg-white"
        >
          <div>
            <div className="text-[14.5px] font-bold text-slate-800 group-hover:text-indigo-700 transition-colors mb-0.5">
              API Reference
            </div>
            <div className="text-[13px] text-slate-500">
              Full endpoint docs for auth, transactions, dashboard, and users
            </div>
          </div>
        </a>
        <a
          href="/concepts/jwt"
          className="group flex gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50 transition-all no-underline bg-white"
        >
          <div>
            <div className="text-[14.5px] font-bold text-slate-800 group-hover:text-indigo-700 transition-colors mb-0.5">
              Concepts
            </div>
            <div className="text-[13px] text-slate-500">
              JWT, RBAC, data models, and aggregation pipelines explained
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
