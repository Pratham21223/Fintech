import CodeBlock from "../../components/CodeBlock";
import RequestBlock from "../../components/RequestBlock";

export default function AuthFlow() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Auth Flow Example
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          A complete walkthrough of the authentication lifecycle — from
          registering a new user to using the JWT token for protected routes.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2
        id="step-1-register"
        className="text-2xl font-bold text-slate-900 mb-4"
      >
        Step 1 — Register a new user
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Create a new account. No authentication required. The user is
        automatically assigned the <code>"viewer"</code> role.
      </p>
      <RequestBlock
        method="POST"
        path="/api/auth/register"
        auth="None"
        body={`{
  "name": "New User",
  "email": "new@test.com",
  "password": "test123"
}`}
      />
      <CodeBlock title="Response — 201 Created">{`{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "664f...",
    "name": "New User",
    "email": "new@test.com",
    "role": "viewer"
  }
}`}</CodeBlock>

      <h2
        id="step-2-login"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Step 2 — Login and get a token
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Authenticate with the registered credentials. The response includes a
        JWT token valid for <strong>7 days</strong>.
      </p>
      <RequestBlock
        method="POST"
        path="/api/auth/login"
        auth="None"
        body={`{
  "email": "new@test.com",
  "password": "test123"
}`}
      />
      <CodeBlock title="Response — 200 OK">{`{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "664f...",
      "name": "New User",
      "email": "new@test.com",
      "role": "viewer"
    }
  }
}`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
        <p className="text-[14px] text-emerald-900 font-semibold mb-2">
          Save the token
        </p>
        <p className="text-[14px] text-emerald-800/80">
          Copy the <code>token</code> from the response. You'll need it for
          every subsequent authenticated request.
        </p>
      </div>

      <h2
        id="step-3-profile"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Step 3 — Access a protected route
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Use the token to fetch the current user's profile. This verifies the
        token is valid and the account is active.
      </p>
      <RequestBlock
        method="GET"
        path="/api/auth/profile"
        auth="Bearer Token"
      />
      <CodeBlock title="Response — 200 OK">{`{
  "success": true,
  "data": {
    "_id": "664f...",
    "name": "New User",
    "email": "new@test.com",
    "role": "viewer",
    "isActive": true,
    "createdAt": "2025-04-05T00:00:00.000Z"
  }
}`}</CodeBlock>

      <h2
        id="step-4-errors"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Step 4 — Common auth errors
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Here's what happens when authentication fails at different stages:
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <code className="font-mono text-[13px] font-extrabold px-2.5 py-1 rounded-md text-orange-600 bg-orange-50">
              401
            </code>
            <span className="text-[14px] font-bold text-slate-800">
              No token provided
            </span>
          </div>
          <CodeBlock title="Request without Authorization header">{`{
  "message": "No token provided"
}`}</CodeBlock>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <code className="font-mono text-[13px] font-extrabold px-2.5 py-1 rounded-md text-rose-600 bg-rose-50">
              403
            </code>
            <span className="text-[14px] font-bold text-slate-800">
              Invalid or expired token
            </span>
          </div>
          <CodeBlock title="Request with bad token">{`{
  "message": "Invalid or expired token"
}`}</CodeBlock>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <code className="font-mono text-[13px] font-extrabold px-2.5 py-1 rounded-md text-rose-600 bg-rose-50">
              403
            </code>
            <span className="text-[14px] font-bold text-slate-800">
              Deactivated account
            </span>
          </div>
          <CodeBlock title="Token valid but account disabled">{`{
  "success": false,
  "message": "Account is deactivated"
}`}</CodeBlock>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          What's happening behind the scenes
        </p>
        <ul className="space-y-1.5 text-[14px] text-blue-800/80">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            The <code>verifyToken</code> middleware decodes the JWT and queries
            the database for the user
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            It checks both existence and <code>isActive</code> status
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            The role is fetched fresh from DB — role changes take effect
            immediately
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold mt-0.5">&#x2022;</span>
            <code>req.user</code> is populated with <code>userId</code> and{" "}
            <code>role</code> for downstream handlers
          </li>
        </ul>
      </div>
    </div>
  );
}
