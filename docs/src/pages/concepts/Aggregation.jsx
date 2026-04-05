import CodeBlock from "../../components/CodeBlock";

export default function Aggregation() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            MongoDB Aggregation
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          The dashboard analytics are powered by MongoDB aggregation pipelines —
          multi-stage data transformations that run entirely on the database
          server for maximum efficiency.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2
        id="why-aggregation"
        className="text-2xl font-bold text-slate-900 mb-4"
      >
        Why aggregation pipelines?
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-5">
        Instead of fetching all transactions and computing summaries in
        JavaScript, the aggregation framework processes data directly in
        MongoDB. This means:
      </p>
      <div className="grid gap-2 mb-8">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
          <span className="shrink-0 w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-[12px] font-bold">
            ✓
          </span>
          <span className="text-[14.5px] text-slate-700">
            Only the computed result is sent over the network, not raw documents
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
          <span className="shrink-0 w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-[12px] font-bold">
            ✓
          </span>
          <span className="text-[14.5px] text-slate-700">
            MongoDB uses indexes during the <code>$match</code> stage
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
          <span className="shrink-0 w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-[12px] font-bold">
            ✓
          </span>
          <span className="text-[14.5px] text-slate-700">
            Scales well as the transaction collection grows
          </span>
        </div>
      </div>

      <h2
        id="pipeline-stages"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Pipeline stages used
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Four aggregation operators power all the dashboard endpoints:
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Stage
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                $match
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Filter documents — exclude soft-deleted records, apply date
                ranges
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                $group
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Group documents by field(s) and compute aggregates like{" "}
                <code>$sum</code>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                $sort
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Order results — highest totals first, chronological months
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                $sum
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Accumulator that totals amounts within each group
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        id="summary-pipeline"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Summary pipeline
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Computes total income, total expenses, and net balance in a single
        database query. Groups all non-deleted transactions by their{" "}
        <code>type</code> field:
      </p>
      <CodeBlock title="dashboardController.js — getSummary">{`const result = await Transaction.aggregate([
  { $match: { isDeleted: false } },
  {
    $group: {
      _id: "$type",           // "income" or "expense"
      total: { $sum: "$amount" },
    },
  },
]);

// Convert to { totalIncome, totalExpenses, netBalance }
let totalIncome = 0, totalExpenses = 0;
result.forEach((item) => {
  if (item._id === "income") totalIncome = item.total;
  if (item._id === "expense") totalExpenses = item.total;
});`}</CodeBlock>

      <h2
        id="other-pipelines"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Other dashboard pipelines
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        The same pattern powers the other two dashboard endpoints:
      </p>
      <div className="grid gap-3">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-mono text-[11px] font-bold">
            CAT
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Category breakdown
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Groups by compound <code>_id</code> (category + type) with{" "}
              <code>$sum</code> for totals and count, sorted by highest amount.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-mono text-[11px] font-bold">
            MTH
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Monthly trend
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Uses <code>$year</code> and <code>$month</code> date operators to
              extract components, limited to last 12 months via{" "}
              <code>$gte</code> in <code>$match</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
