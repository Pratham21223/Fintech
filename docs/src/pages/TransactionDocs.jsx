import EndpointCard from "../components/EndpointCard";

const queryParams = [
  { name: "type", type: "string", default: "—", desc: "income or expense" },
  {
    name: "category",
    type: "string",
    default: "—",
    desc: "Case-insensitive match",
  },
  {
    name: "startDate",
    type: "ISO date",
    default: "—",
    desc: "Filter from this date",
  },
  {
    name: "endDate",
    type: "ISO date",
    default: "—",
    desc: "Filter until this date",
  },
  {
    name: "search",
    type: "string",
    default: "—",
    desc: "Searches description & category",
  },
  { name: "page", type: "number", default: "1", desc: "Page number" },
  { name: "limit", type: "number", default: "10", desc: "Items per page" },
  {
    name: "sort",
    type: "string",
    default: "-date",
    desc: "Sort field, - = descending",
  },
];

export default function TransactionDocs() {
  const queryParamsTable = (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80">
            <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
              Param
            </th>
            <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
              Default
            </th>
            <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {queryParams.map((p, i) => (
            <tr
              key={p.name}
              className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""} hover:bg-indigo-50/40 transition-colors`}
            >
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                {p.name}
              </td>
              <td className="px-4 py-2.5 text-slate-500 text-[13px]">
                {p.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-slate-400 text-[13px]">
                {p.default}
              </td>
              <td className="px-4 py-2.5 text-slate-600">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <div className="mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Transactions
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          Full CRUD for financial records with filtering, search, and
          pagination. All routes require authentication. Create, update, and
          delete operations are restricted to admin users.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <EndpointCard
        method="GET"
        path="/api/transactions"
        title="List all transactions"
        description="List transactions with filtering, search, and pagination."
        auth="Bearer Token"
        roles="All authenticated"
        queryParams={queryParamsTable}
        response={`{
  "success": true,
  "data": [
    {
      "_id": "664f...",
      "amount": 5000,
      "type": "income",
      "category": "salary",
      "description": "March salary",
      "date": "2025-03-15T00:00:00.000Z",
      "createdBy": {
        "_id": "...",
        "name": "Admin",
        "email": "admin@test.com"
      },
      "isDeleted": false
    }
  ],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}`}
      />

      <EndpointCard
        method="GET"
        path="/api/transactions/:id"
        title="Get transaction by ID"
        description="Get a single transaction by its MongoDB ID."
        auth="Bearer Token"
        roles="All authenticated"
        response={`{
  "success": true,
  "data": {
    "_id": "664f...",
    "amount": 5000,
    "type": "income",
    "category": "salary",
    "description": "March salary",
    "date": "2025-03-15T00:00:00.000Z",
    "createdBy": {
      "_id": "...",
      "name": "Admin",
      "email": "admin@test.com"
    },
    "isDeleted": false
  }
}`}
        errors={[{ status: 404, message: "Transaction not found" }]}
      />

      <EndpointCard
        method="POST"
        path="/api/transactions"
        title="Create a transaction"
        description="Create a new transaction. Validation: amount > 0 (required), type must be 'income' or 'expense' (required), category required, date optional (ISO format)."
        auth="Bearer Token"
        roles="Admin"
        body={`{
  "amount": 3000,
  "type": "income",
  "category": "salary",
  "description": "April salary"
}`}
        response={`{
  "success": true,
  "message": "Transaction created",
  "data": {
    "_id": "664f...",
    "amount": 5000,
    "type": "income",
    "category": "salary",
    "description": "March salary",
    "date": "2025-03-15T00:00:00.000Z",
    "createdBy": "664f...",
    "isDeleted": false
  }
}`}
        errors={[
          { status: 403, message: "Access denied. Required role(s): admin" },
          { status: 422, message: "Validation failed" },
        ]}
      />

      <EndpointCard
        method="PUT"
        path="/api/transactions/:id"
        title="Update a transaction"
        description="Update a transaction. All fields are optional."
        auth="Bearer Token"
        roles="Admin"
        body={`{
  "amount": 3500,
  "type": "income",
  "category": "salary",
  "description": "April salary (updated)"
}`}
        response={`{
  "success": true,
  "message": "Transaction updated",
  "data": {
    "_id": "664f...",
    "amount": 5500,
    "type": "income",
    "category": "salary",
    "description": "March salary (updated)",
    "date": "2025-03-15T00:00:00.000Z"
  }
}`}
        errors={[
          { status: 403, message: "Access denied" },
          { status: 404, message: "Transaction not found" },
          { status: 422, message: "Validation failed" },
        ]}
      />

      <EndpointCard
        method="DELETE"
        path="/api/transactions/:id"
        title="Delete a transaction"
        description="Soft delete — sets isDeleted: true. Record is hidden but not removed from the database."
        auth="Bearer Token"
        roles="Admin"
        response={`{
  "success": true,
  "message": "Transaction deleted"
}`}
        errors={[
          { status: 403, message: "Access denied" },
          { status: 404, message: "Transaction not found" },
        ]}
      />
    </div>
  );
}
