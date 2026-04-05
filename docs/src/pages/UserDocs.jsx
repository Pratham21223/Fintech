import EndpointCard from "../components/EndpointCard";

export default function UserDocs() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            User Management
          </h1>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[12px] font-bold">
            3 endpoints
          </span>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          Administrative endpoints for managing user accounts. List all users,
          modify roles, and control account activation status. All endpoints
          require admin privileges.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <EndpointCard
        method="GET"
        path="/api/users"
        title="List all users"
        description="Get all users. Passwords are never returned."
        auth="Bearer Token"
        roles="Admin"
        response={`{
  "success": true,
  "data": [
    {
      "_id": "664f...",
      "name": "Analyst User",
      "email": "analyst@test.com",
      "role": "analyst",
      "isActive": true,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}`}
        errors={[
          { status: 403, message: "Access denied. Required role(s): admin" },
        ]}
      />

      <EndpointCard
        method="PATCH"
        path="/api/users/:id/role"
        title="Change user role"
        description="Change a user's role. Admin cannot change their own role. Validation: role must be 'viewer', 'analyst', or 'admin'."
        auth="Bearer Token"
        roles="Admin"
        body={`{
  "role": "analyst"
}`}
        response={`{
  "success": true,
  "message": "Role updated to analyst",
  "data": {
    "_id": "664f...",
    "name": "Analyst User",
    "email": "analyst@test.com",
    "role": "analyst",
    "isActive": true
  }
}`}
        errors={[
          { status: 400, message: "Cannot change your own role" },
          { status: 404, message: "User not found" },
          { status: 422, message: "Validation failed" },
        ]}
      />

      <EndpointCard
        method="PATCH"
        path="/api/users/:id/status"
        title="Toggle user status"
        description="Flip isActive boolean. Deactivated users cannot log in or use any endpoint. Admin cannot deactivate themselves."
        auth="Bearer Token"
        roles="Admin"
        response={`{
  "success": true,
  "message": "User deactivated",
  "data": {
    "id": "664f...",
    "name": "Analyst User",
    "isActive": false
  }
}`}
        errors={[
          { status: 400, message: "Cannot deactivate your own account" },
          { status: 404, message: "User not found" },
        ]}
      />
    </div>
  );
}
