import EndpointCard from "../components/EndpointCard";

export default function DashboardDocs() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[12px] font-bold">
            4 endpoints
          </span>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          Analytics and aggregation endpoints powered by MongoDB pipelines. Get
          financial summaries, category breakdowns, monthly trends, and recent
          activity. Restricted to analyst and admin roles.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <EndpointCard
        method="GET"
        path="/api/dashboard/summary"
        title="Financial summary"
        description="Get total income, total expenses, and net balance."
        auth="Bearer Token"
        roles="Analyst, Admin"
        response={`{
  "success": true,
  "data": {
    "totalIncome": 45000,
    "totalExpenses": 28000,
    "netBalance": 17000
  }
}`}
        errors={[
          {
            status: 403,
            message: "Access denied. Required role(s): analyst, admin",
          },
        ]}
      />

      <EndpointCard
        method="GET"
        path="/api/dashboard/category-breakdown"
        title="Category breakdown"
        description="Totals grouped by category and type, sorted by highest amount."
        auth="Bearer Token"
        roles="Analyst, Admin"
        response={`{
  "success": true,
  "data": [
    {
      "_id": {
        "category": "salary",
        "type": "income"
      },
      "total": 30000,
      "count": 6
    },
    {
      "_id": {
        "category": "food",
        "type": "expense"
      },
      "total": 8500,
      "count": 12
    }
  ]
}`}
        errors={[
          {
            status: 403,
            message: "Access denied. Required role(s): analyst, admin",
          },
        ]}
      />

      <EndpointCard
        method="GET"
        path="/api/dashboard/monthly-trend"
        title="Monthly trends"
        description="Income and expense totals per month for the last 12 months."
        auth="Bearer Token"
        roles="Analyst, Admin"
        response={`{
  "success": true,
  "data": [
    {
      "_id": {
        "year": 2025,
        "month": 1,
        "type": "income"
      },
      "total": 15000
    },
    {
      "_id": {
        "year": 2025,
        "month": 1,
        "type": "expense"
      },
      "total": 8000
    }
  ]
}`}
        errors={[
          {
            status: 403,
            message: "Access denied. Required role(s): analyst, admin",
          },
        ]}
      />

      <EndpointCard
        method="GET"
        path="/api/dashboard/recent"
        title="Recent transactions"
        description="Last 5 transactions, sorted by date descending."
        auth="Bearer Token"
        roles="Analyst, Admin"
        response={`{
  "success": true,
  "data": [
    {
      "_id": "664f...",
      "amount": 3000,
      "type": "expense",
      "category": "rent",
      "date": "2025-03-01T00:00:00.000Z",
      "createdBy": {
        "_id": "...",
        "name": "Admin",
        "email": "admin@test.com"
      }
    }
  ]
}`}
        errors={[
          {
            status: 403,
            message: "Access denied. Required role(s): analyst, admin",
          },
        ]}
      />
    </div>
  );
}
