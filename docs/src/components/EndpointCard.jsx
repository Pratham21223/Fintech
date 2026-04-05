import CodeBlock from "./CodeBlock";

const methodConfig = {
  GET: {
    badge: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/25",
    accent: "border-emerald-500",
  },
  POST: {
    badge: "bg-blue-500/15 text-blue-700 ring-blue-500/25",
    accent: "border-blue-500",
  },
  PUT: {
    badge: "bg-amber-500/15 text-amber-700 ring-amber-500/25",
    accent: "border-amber-500",
  },
  PATCH: {
    badge: "bg-orange-500/15 text-orange-700 ring-orange-500/25",
    accent: "border-orange-500",
  },
  DELETE: {
    badge: "bg-rose-500/15 text-rose-700 ring-rose-500/25",
    accent: "border-rose-500",
  },
};

export default function EndpointCard({
  method,
  path,
  title,
  description,
  auth,
  roles,
  body,
  queryParams,
  response,
  errors,
}) {
  const headingId = `${method.toLowerCase()}-${path
    .replace(/[/:]/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")}`;

  const config = methodConfig[method] || {
    badge: "bg-slate-100 text-slate-600 ring-slate-200",
    accent: "border-slate-400",
  };

  return (
    <div
      className={`mb-14 rounded-xl border border-slate-200/80 bg-linear-to-b from-slate-50/60 to-white overflow-hidden`}
    >
      <div className={`border-l-4 ${config.accent} px-6 py-6 sm:px-8 sm:py-7`}>
        <h2
          id={headingId}
          data-toc-title={title || `${method} ${path}`}
          className="flex items-center gap-3 flex-wrap mb-4 text-base font-normal"
        >
          <span
            className={`inline-block px-3 py-1 rounded-md text-[12.5px] font-extrabold font-mono tracking-wide ring-1 ring-inset ${config.badge}`}
          >
            {method}
          </span>
          <code className="font-mono text-[16px] text-slate-900 font-bold tracking-tight">
            {path}
          </code>
        </h2>

        <p className="text-[16px] font-medium text-slate-700 leading-relaxed mb-5">
          {description}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                className="opacity-60"
              >
                <path
                  d="M6 1v4l2.5 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              Auth
            </span>
            <span className="font-semibold text-slate-800">{auth}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                className="opacity-60"
              >
                <path
                  d="M6 7a2 2 0 100-4 2 2 0 000 4z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M2 10.5c0-2.2 1.8-4 4-4s4 1.8 4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              Roles
            </span>
            <span className="font-semibold text-slate-800">{roles}</span>
          </div>
        </div>

        {queryParams && (
          <div className="mb-6">
            <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Query Parameters
            </h4>
            {queryParams}
          </div>
        )}

        {body && <CodeBlock title="Request Body">{body}</CodeBlock>}

        <CodeBlock title="Response">{response}</CodeBlock>

        {errors && errors.length > 0 && (
          <div className="mt-6">
            <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Error Responses
            </h4>
            <div className="grid gap-2">
              {errors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg bg-rose-50/60 border border-rose-100 text-[13.5px]"
                >
                  <code className="shrink-0 font-mono text-[12px] font-extrabold text-rose-600">
                    {error.status}
                  </code>
                  <span className="text-slate-700">{error.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
