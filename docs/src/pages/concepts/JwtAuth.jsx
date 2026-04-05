import CodeBlock from "../../components/CodeBlock";

export default function JwtAuth() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            JWT Authentication
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          The API uses JSON Web Tokens for stateless authentication. Tokens are
          issued at login and verified on every protected request through a
          middleware pipeline.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2 id="how-it-works" className="text-2xl font-bold text-slate-900 mb-4">
        How it works
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-5">
        When a user logs in with valid credentials, the server signs a JWT
        containing their <code>userId</code> and returns it. Every subsequent
        request to a protected route must include this token in the{" "}
        <code>Authorization</code> header.
      </p>

      <div className="grid gap-3 mb-8">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[13px] font-bold">
            1
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              User sends credentials
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              POST to <code>/api/auth/login</code> with email and password.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[13px] font-bold">
            2
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Server signs a JWT
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Payload contains <code>userId</code>. Signed with{" "}
              <code>JWT_SECRET</code> from environment. Expires in{" "}
              <strong>7 days</strong>.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[13px] font-bold">
            3
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Client stores and sends token
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Every request includes{" "}
              <code>Authorization: Bearer &lt;token&gt;</code>.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[13px] font-bold">
            4
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Middleware verifies on every request
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Decodes token, checks user still exists and is active, attaches{" "}
              <code>req.user</code> for downstream handlers.
            </p>
          </div>
        </div>
      </div>

      <h2
        id="token-signing"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Token signing
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        At login, after bcrypt password comparison succeeds, a token is created:
      </p>
      <CodeBlock title="authController.js — login">{`const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);`}</CodeBlock>

      <div className="mt-5 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
        <p className="text-[14px] text-blue-900 font-semibold mb-2">
          Design decision
        </p>
        <p className="text-[14px] text-blue-800/80">
          Only <code>userId</code> is stored in the token payload — no role or
          email. The role is fetched from the database on every request, so role
          changes take effect immediately without requiring a new token.
        </p>
      </div>

      <h2
        id="verification-middleware"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Verification middleware
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        The <code>verifyToken</code> middleware runs before every protected
        route. It performs three checks:
      </p>
      <CodeBlock title="authMiddleware.js — verifyToken">{`const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid authorization header" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check user still exists and is active
    const user = await User.findById(decoded.userId).select("isActive role");
    if (!user) return res.status(401).json({ success: false, message: "User no longer exists" });
    if (!user.isActive) return res.status(403).json({ success: false, message: "Account is deactivated" });

    // Attach user info for downstream handlers
    req.user = { userId: decoded.userId, role: user.role };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};`}</CodeBlock>
    </div>
  );
}
