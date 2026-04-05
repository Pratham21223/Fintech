import CodeBlock from "../../components/CodeBlock";

export default function DataModels() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Data Models
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          Two Mongoose schemas define the data layer — User for authentication
          and access control, and Transaction for financial records. Both use
          timestamps, indexes, and hooks for data integrity.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2 id="user-schema" className="text-2xl font-bold text-slate-900 mb-4">
        User schema
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Stores authentication credentials, role assignment, and account status.
        Passwords are never stored in plain text.
      </p>
      <CodeBlock title="models/userModel.js">{`const userSchema = new Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["viewer", "analyst", "admin"],
      default: "viewer",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);`}</CodeBlock>

      <div className="mt-6 mb-8">
        <h3 className="text-[15px] font-bold text-slate-800 mb-3">
          Key fields
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                  Field
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                  email
                </td>
                <td className="px-4 py-2.5 text-slate-600">
                  Unique index — prevents duplicate registrations at the
                  database level
                </td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/40">
                <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                  role
                </td>
                <td className="px-4 py-2.5 text-slate-600">
                  Enum restricted to three values. Defaults to{" "}
                  <code>"viewer"</code> for new registrations
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                  isActive
                </td>
                <td className="px-4 py-2.5 text-slate-600">
                  Allows admins to deactivate accounts without deleting them.
                  Checked on every authenticated request
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                  timestamps
                </td>
                <td className="px-4 py-2.5 text-slate-600">
                  Mongoose auto-generates <code>createdAt</code> and{" "}
                  <code>updatedAt</code> fields
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2
        id="password-hashing"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Password hashing with pre-save hook
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        A Mongoose <code>pre("save")</code> hook automatically hashes the
        password using bcrypt before writing to the database. The{" "}
        <code>isModified</code> check ensures hashing only runs when the
        password actually changes:
      </p>
      <CodeBlock title="models/userModel.js — pre-save hook">{`userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          Why pre-save hooks?
        </p>
        <p className="text-[14px] text-blue-800/80">
          By hashing at the model level, every code path that creates or updates
          a user gets automatic password hashing — no risk of forgetting to hash
          in a controller. The <strong>10 salt rounds</strong> provide a good
          balance between security and performance.
        </p>
      </div>

      <h2
        id="transaction-schema"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Transaction schema
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Stores financial records with type classification, category tagging, and
        a soft-delete flag for recoverable deletions.
      </p>
      <CodeBlock title="models/transactionModel.js">{`const transactionSchema = new Schema(
  {
    amount:      { type: Number, required: true, min: 0.01 },
    type:        { type: String, enum: ["income", "expense"], required: true },
    category:    { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    date:        { type: Date, default: Date.now },
    createdBy:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted:   { type: Boolean, default: false },
  },
  { timestamps: true }
);`}</CodeBlock>

      <h2 id="indexes" className="text-2xl font-bold text-slate-900 mt-14 mb-4">
        Compound indexes
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Two compound indexes are defined to optimize the most common query
        patterns — filtering by type/category/date and excluding soft-deleted
        records:
      </p>
      <CodeBlock title="models/transactionModel.js — indexes">{`// Speed up filter queries (type + category + date range)
transactionSchema.index({ type: 1, category: 1, date: -1 });

// Speed up soft-delete exclusion in every query
transactionSchema.index({ isDeleted: 1 });`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          Why these indexes?
        </p>
        <p className="text-[14px] text-blue-800/80">
          The first index covers the three most common filter fields in a single
          compound index — MongoDB can use it for queries filtering by type
          alone, type + category, or type + category + date range. The second
          index ensures the <code>isDeleted: false</code> filter that runs on
          every query is always fast.
        </p>
      </div>

      <h2
        id="soft-deletes"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Soft deletes & relationships
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Transactions use an <code>isDeleted</code> boolean flag instead of
        permanent removal — all queries filter with{" "}
        <code>{"{ isDeleted: false }"}</code> so deleted records are hidden but
        preserved for auditing. The <code>createdBy</code> field is an ObjectId
        ref to User, enabling Mongoose <code>.populate()</code> to join user
        details when listing transactions.
      </p>
    </div>
  );
}
