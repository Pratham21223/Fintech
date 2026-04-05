import CodeBlock from "../../components/CodeBlock";

export default function ProjectStructure() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Project Structure
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          The backend follows a layered architecture with clear separation of
          concerns — routes, controllers, middlewares, models, and utilities
          each have a dedicated directory.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2 id="folder-layout" className="text-2xl font-bold text-slate-900 mb-4">
        Folder layout
      </h2>
      <CodeBlock title="backend/">{`backend/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   ├── authController.js     # Register, login, profile logic
│   ├── transactionController.js  # CRUD for financial records
│   ├── dashboardController.js    # Aggregation pipelines
│   └── userController.js     # User management (admin)
├── middlewares/
│   ├── authMiddleware.js     # JWT verification
│   ├── rbac.js               # Role-based access control
│   └── validate.js           # Express-validator error handler
├── models/
│   ├── userModel.js          # User schema + bcrypt hooks
│   └── transactionModel.js   # Transaction schema + indexes
├── routes/
│   ├── authRoute.js          # /api/auth/*
│   ├── transactionRoute.js   # /api/transactions/*
│   ├── dashboardRoute.js     # /api/dashboard/*
│   └── userRoutes.js         # /api/users/*
├── seeds/
│   └── seed.js               # Database seeding script
├── utils/
│   └── apiError.js           # Custom error class
├── index.js                  # App entry point
└── package.json`}</CodeBlock>

      <h2
        id="separation-of-concerns"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Separation of concerns
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-5">
        Each layer has a single responsibility:
      </p>
      <div className="grid gap-3 mb-8">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-mono text-[11px] font-bold">
            RTR
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Routes
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Define HTTP method + path, chain middlewares and validators, then
              delegate to controllers. No business logic here.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono text-[11px] font-bold">
            CTR
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Controllers
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Contain all business logic — query the database, process data,
              return JSON responses. Errors are forwarded with{" "}
              <code>next(err)</code>.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-mono text-[11px] font-bold">
            MDW
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Middlewares
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Cross-cutting concerns — authentication (JWT), authorization
              (RBAC), and input validation. Reusable across all routes.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-mono text-[11px] font-bold">
            MDL
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Models
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Mongoose schemas with validation rules, hooks (bcrypt hashing),
              indexes, and instance methods. The single source of truth for data
              shape.
            </p>
          </div>
        </div>
      </div>

      <h2
        id="middleware-stack"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Global middleware stack
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        The entry point (<code>index.js</code>) registers global middlewares
        that apply to every incoming request before routing:
      </p>
      <CodeBlock title="index.js — middleware registration">{`app.use(cors());                                         // Cross-origin requests
app.use(helmet());                                       // Secure HTTP headers
app.use(morgan("dev"));                                  // Request logging
app.use(express.json());                                 // Parse JSON bodies
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 req/15min`}</CodeBlock>

      <div className="overflow-x-auto rounded-xl border border-slate-200 mt-6 mb-8">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Middleware
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                cors
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Enables cross-origin requests so the frontend can call the API
                from a different port/domain
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                helmet
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Sets security headers (CSP, X-Frame-Options, etc.) to protect
                against common web vulnerabilities
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                morgan
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Logs every request with method, path, status code, and response
                time for debugging
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                express.json
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Parses incoming JSON request bodies and makes them available on{" "}
                <code>req.body</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                express-rate-limit
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Limits each IP to 100 requests per 15-minute window to prevent
                abuse
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        id="route-mounting"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Route mounting
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Each route module is mounted under a specific path prefix, keeping the
        main entry point clean:
      </p>
      <CodeBlock title="index.js — route registration">{`app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);`}</CodeBlock>

      <h2
        id="global-error-handler"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Global error handler
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        A catch-all error middleware at the bottom of the middleware stack
        handles any error forwarded with <code>next(err)</code>. It uses the
        custom <code>ApiError</code> class for structured status codes:
      </p>
      <CodeBlock title="index.js — error handler">{`app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});`}</CodeBlock>
      <CodeBlock title="utils/apiError.js">{`class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          Error flow
        </p>
        <p className="text-[14px] text-blue-800/80">
          Controllers wrap their logic in try/catch and call{" "}
          <code>next(err)</code> on failure. The global handler catches
          everything — both <code>ApiError</code> instances with custom status
          codes and unexpected errors that default to 500.
        </p>
      </div>
    </div>
  );
}
