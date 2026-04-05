import CodeBlock from "../components/CodeBlock";

const errorCodes = [
  {
    code: "400",
    meaning: "Bad request — invalid input or business rule violation",
    example: "Cannot change your own role",
    color: "text-amber-600 bg-amber-50",
  },
  {
    code: "401",
    meaning: "Authentication failed — missing or invalid token",
    example: "No token provided / Invalid or expired token",
    color: "text-orange-600 bg-orange-50",
  },
  {
    code: "403",
    meaning: "Forbidden — insufficient role or deactivated account",
    example: "Access denied. Required role(s): admin",
    color: "text-rose-600 bg-rose-50",
  },
  {
    code: "404",
    meaning: "Resource not found",
    example: "Transaction not found / User not found",
    color: "text-slate-600 bg-slate-50",
  },
  {
    code: "422",
    meaning: "Validation failed — field-level errors returned",
    example: "Amount must be greater than 0",
    color: "text-purple-600 bg-purple-50",
  },
  {
    code: "429",
    meaning: "Too many requests — rate limit exceeded",
    example: "Rate limit: 100 requests per 15 minutes",
    color: "text-blue-600 bg-blue-50",
  },
  {
    code: "500",
    meaning: "Internal server error — unexpected failure",
    example: "Database connection lost",
    color: "text-red-700 bg-red-50",
  },
];

export default function ErrorHandling() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Error Handling
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          The API uses a consistent error response envelope, field-level
          validation errors, and a global error handler to ensure every failure
          returns a predictable JSON response.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2
        id="response-envelope"
        className="text-2xl font-bold text-slate-900 mb-4"
      >
        Consistent response envelope
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Every API response — success or failure — follows the same JSON
        structure. This makes error handling predictable for clients:
      </p>
      <div className="space-y-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[14px] font-bold text-slate-800">
              Success
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
            <span className="text-[14px] font-bold text-slate-800">Error</span>
          </div>
          <CodeBlock title="4xx / 5xx">{`{
  "success": false,
  "message": "Error description"
}`}</CodeBlock>
        </div>
      </div>

      <h2
        id="validation-errors"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Input validation
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Routes use <code>express-validator</code> to define field-level rules
        directly in the route definition. A shared <code>validate</code>{" "}
        middleware collects errors and returns them in a structured format:
      </p>
      <CodeBlock title="middlewares/validate.js">{`const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};`}</CodeBlock>

      <p className="text-[15px] text-slate-600 leading-relaxed mt-5 mb-4">
        Example validation rules on the create transaction route:
      </p>
      <CodeBlock title="routes/transactionRoute.js — validators">{`router.post(
  "/",
  authorize("admin"),
  [
    body("amount").isFloat({ min: 0.01 }).withMessage("Amount must be greater than 0"),
    body("type").isIn(["income", "expense"]).withMessage("Type must be income or expense"),
    body("category").notEmpty().withMessage("Category is required"),
    body("date").optional().isISO8601().withMessage("Date must be a valid ISO date"),
  ],
  validate,
  createTransaction
);`}</CodeBlock>

      <p className="text-[15px] text-slate-600 leading-relaxed mt-5 mb-4">
        When validation fails, the client receives a <strong>422</strong>{" "}
        response with each field error listed:
      </p>
      <CodeBlock title="422 Validation Error Response">{`{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "amount", "message": "Amount must be greater than 0" },
    { "field": "type", "message": "Type must be income or expense" }
  ]
}`}</CodeBlock>

      <h2
        id="global-error-handler"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Global error handler
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        A catch-all error middleware at the bottom of the Express stack handles
        any error forwarded with <code>next(err)</code>:
      </p>
      <CodeBlock title="index.js — global error handler">{`app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});`}</CodeBlock>

      <h2
        id="api-error-class"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Custom ApiError class
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        A lightweight error class extends <code>Error</code> with a{" "}
        <code>statusCode</code> property. Controllers can throw typed errors
        that the global handler converts to proper HTTP responses:
      </p>
      <CodeBlock title="utils/apiError.js">{`class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          Error flow pattern
        </p>
        <p className="text-[14px] text-blue-800/80">
          Controllers wrap logic in <code>try/catch</code> and call{" "}
          <code>next(err)</code> on failure. This ensures no error crashes the
          server — every exception is caught by the global handler and returned
          as a clean JSON response with the appropriate status code.
        </p>
      </div>

      <h2
        id="status-codes"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        HTTP status codes
      </h2>
      <p className="text-[15px] text-slate-600 mb-5">
        Complete list of status codes used across the API:
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Meaning
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Example
              </th>
            </tr>
          </thead>
          <tbody>
            {errorCodes.map((e, i) => (
              <tr
                key={e.code}
                className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""} hover:bg-indigo-50/40 transition-colors`}
              >
                <td className="px-4 py-2.5">
                  <code
                    className={`font-mono text-[13px] font-extrabold px-2.5 py-1 rounded-md ${e.color}`}
                  >
                    {e.code}
                  </code>
                </td>
                <td className="px-4 py-2.5 text-slate-700">{e.meaning}</td>
                <td className="px-4 py-2.5 text-slate-500 text-[13px]">
                  {e.example}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2
        id="error-scenarios"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Common error scenarios
      </h2>
      <div className="grid gap-3">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-mono text-[11px] font-bold">
            AUTH
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Expired or missing token
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              The JWT middleware returns 401 if the Authorization header is
              absent, or 403 if the token is invalid or expired.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-mono text-[11px] font-bold">
            RBAC
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Insufficient permissions
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              A viewer trying to create a transaction gets 403 with a message
              listing the required role(s).
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-mono text-[11px] font-bold">
            VAL
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Invalid request body
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Submitting a negative amount or missing required fields returns
              422 with field-level error details.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-mono text-[11px] font-bold">
            404
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Resource not found
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Requesting a transaction with an invalid or non-existent ID
              returns 404 with a descriptive message.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[11px] font-bold">
            429
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Rate limit exceeded
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              More than 100 requests in a 15-minute window from the same IP
              triggers a 429 response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
