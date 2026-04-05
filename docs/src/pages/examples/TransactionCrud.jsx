import CodeBlock from "../../components/CodeBlock";
import RequestBlock from "../../components/RequestBlock";

export default function TransactionCrud() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Transaction CRUD Example
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          End-to-end walkthrough of creating, listing with filters, updating,
          and soft-deleting a financial transaction. Requires an admin token.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 mb-10">
        <p className="text-[14px] text-amber-900 font-semibold mb-2">
          Prerequisites
        </p>
        <p className="text-[14px] text-amber-800/80">
          These examples require an <strong>admin</strong> token. Login as{" "}
          <code>admin@test.com</code> / <code>admin123</code> first and use the
          returned token in the Authorization header.
        </p>
      </div>

      <h2 id="step-1-create" className="text-2xl font-bold text-slate-900 mb-4">
        Step 1 — Create a transaction
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Create a new income transaction. All fields are validated before saving.
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

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          Validation rules
        </p>
        <ul className="space-y-1.5 text-[14px] text-blue-800/80">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            <code>amount</code> — required, must be &gt; 0
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            <code>type</code> — required, must be "income" or "expense"
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            <code>category</code> — required, free-text
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            <code>date</code> — optional, ISO 8601 format, defaults to now
          </li>
        </ul>
      </div>

      <h2
        id="step-2-list"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Step 2 — List with filters
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Fetch transactions with query parameters for filtering, searching, and
        pagination. Any authenticated user can list transactions.
      </p>
      <RequestBlock
        method="GET"
        path="/api/transactions?type=income&category=salary&page=1&limit=5"
        auth="Bearer Token"
      />
      <CodeBlock title="Response — 200 OK">{`{
  "success": true,
  "data": [
    {
      "_id": "664f...",
      "amount": 3000,
      "type": "income",
      "category": "salary",
      "description": "April salary",
      "date": "2025-04-05T00:00:00.000Z",
      "createdBy": { "_id": "...", "name": "Admin", "email": "admin@test.com" },
      "isDeleted": false
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}`}</CodeBlock>

      <p className="text-[15px] text-slate-600 leading-relaxed mt-5 mb-4">
        Other useful filter combinations:
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Query
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                ?type=expense
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Only expense transactions
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                ?search=salary
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Search in description and category fields
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                ?startDate=2025-01-01&endDate=2025-03-31
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Transactions within Q1 2025
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                ?sort=-amount&limit=3
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Top 3 highest amounts
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        id="step-3-update"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Step 3 — Update a transaction
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Update any fields on an existing transaction. All fields are optional in
        the request body. Admin only.
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
      <CodeBlock title="Response — 200 OK">{`{
  "success": true,
  "message": "Transaction updated",
  "data": {
    "_id": "664f...",
    "amount": 3500,
    "type": "income",
    "category": "salary",
    "description": "April salary (updated)",
    "date": "2025-04-05T00:00:00.000Z"
  }
}`}</CodeBlock>

      <h2
        id="step-4-delete"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Step 4 — Soft delete
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Delete sets <code>isDeleted: true</code> rather than removing the
        record. The transaction is hidden from all queries but preserved in the
        database for auditing.
      </p>
      <RequestBlock
        method="DELETE"
        path="/api/transactions/:id"
        auth="Bearer Token"
      />
      <CodeBlock title="Response — 200 OK">{`{
  "success": true,
  "message": "Transaction deleted"
}`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
        <p className="text-[14px] text-emerald-900 font-semibold mb-2">
          Why soft delete?
        </p>
        <ul className="space-y-1.5 text-[14px] text-emerald-800/80">
          <li className="flex gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">&#x2022;</span>
            Financial records should never be permanently lost
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">&#x2022;</span>
            Accidental deletions can be recovered by setting{" "}
            <code>isDeleted: false</code>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">&#x2022;</span>
            All queries and aggregation pipelines filter with{" "}
            <code>{"{ isDeleted: false }"}</code>
          </li>
        </ul>
      </div>

      <h2
        id="permission-summary"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Permission summary
      </h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Operation
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Required Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 text-slate-700 font-medium">
                List / Get by ID
              </td>
              <td className="px-4 py-2.5">
                <code className="font-mono text-[13px] text-slate-700 font-medium">
                  any authenticated
                </code>
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 text-slate-700 font-medium">Create</td>
              <td className="px-4 py-2.5">
                <code className="font-mono text-[13px] text-slate-700 font-medium">
                  admin
                </code>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 text-slate-700 font-medium">Update</td>
              <td className="px-4 py-2.5">
                <code className="font-mono text-[13px] text-slate-700 font-medium">
                  admin
                </code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-slate-700 font-medium">
                Delete (soft)
              </td>
              <td className="px-4 py-2.5">
                <code className="font-mono text-[13px] text-slate-700 font-medium">
                  admin
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
