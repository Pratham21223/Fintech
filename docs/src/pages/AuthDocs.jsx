import EndpointCard from "../components/EndpointCard";

export default function AuthDocs() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Authentication
          </h1>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[12px] font-bold">
            3 endpoints
          </span>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          Register new accounts, authenticate users with JWT tokens, and
          retrieve profile information. Public routes for registration and
          login, protected route for profile access.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <EndpointCard
        method="POST"
        path="/api/auth/register"
        title="Register a new user"
        description="Create a new user account. New users get the 'viewer' role by default."
        auth="None"
        roles="Public"
        body={`{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}`}
        response={`{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "664f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "viewer"
  }
}`}
        errors={[
          { status: 400, message: "Email already registered" },
          {
            status: 422,
            message:
              "Validation failed (name required, valid email, password min 6 chars)",
          },
        ]}
      />

      <EndpointCard
        method="POST"
        path="/api/auth/login"
        title="Login & get token"
        description="Authenticate and receive a JWT token. Token expires in 7 days."
        auth="None"
        roles="Public"
        body={`{
  "email": "admin@test.com",
  "password": "admin123"
}`}
        response={`{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "664f...",
      "name": "Admin User",
      "email": "admin@test.com",
      "role": "admin"
    }
  }
}`}
        errors={[
          { status: 400, message: "Invalid email or password" },
          { status: 403, message: "Account is deactivated" },
          { status: 422, message: "Validation failed" },
        ]}
      />

      <EndpointCard
        method="GET"
        path="/api/auth/profile"
        title="Get current profile"
        description="Get the currently logged-in user's info."
        auth="Bearer Token"
        roles="All authenticated"
        response={`{
  "success": true,
  "data": {
    "_id": "664f...",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}`}
        errors={[
          { status: 401, message: "No token provided" },
          { status: 401, message: "Invalid or expired token" },
          { status: 404, message: "User not found" },
        ]}
      />
    </div>
  );
}
