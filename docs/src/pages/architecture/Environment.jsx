import CodeBlock from "../../components/CodeBlock";

export default function Environment() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Environment & Setup
          </h1>
        </div>
        <p className="text-[17px] font-medium text-slate-600 leading-relaxed max-w-2xl">
          How to configure the environment, install dependencies, seed the
          database with test data, and run the development server.
        </p>
      </div>
      <hr className="border-slate-200 mb-10" />

      <h2
        id="prerequisites"
        className="text-2xl font-bold text-slate-900 mb-4"
      >
        Prerequisites
      </h2>
      <div className="grid gap-2 mb-8">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
          <span className="shrink-0 w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-[12px] font-bold">
            ✓
          </span>
          <span className="text-[14.5px] text-slate-700">
            <strong>Node.js</strong> v18 or later
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
          <span className="shrink-0 w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-[12px] font-bold">
            ✓
          </span>
          <span className="text-[14.5px] text-slate-700">
            <strong>MongoDB</strong> running locally or a cloud URI (e.g. MongoDB
            Atlas)
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
          <span className="shrink-0 w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-[12px] font-bold">
            ✓
          </span>
          <span className="text-[14.5px] text-slate-700">
            <strong>npm</strong> or <strong>yarn</strong> for package management
          </span>
        </div>
      </div>

      <h2
        id="env-variables"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Environment variables
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        Create a <code>.env</code> file in the <code>backend/</code> directory
        with the following variables:
      </p>
      <CodeBlock title=".env">{`MONGO_URL=mongodb://localhost:27017/fintech
JWT_SECRET=your-secret-key-here
PORT=3000`}</CodeBlock>

      <div className="overflow-x-auto rounded-xl border border-slate-200 mt-6 mb-8">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Variable
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Default
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                MONGO_URL
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                MongoDB connection string
              </td>
              <td className="px-4 py-2.5 font-mono text-slate-400 text-[13px]">
                —
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                JWT_SECRET
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Secret key for signing JWTs
              </td>
              <td className="px-4 py-2.5 font-mono text-slate-400 text-[13px]">
                "supersecretkey"
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                PORT
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Server port
              </td>
              <td className="px-4 py-2.5 font-mono text-slate-400 text-[13px]">
                3000
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        id="installation"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Installation
      </h2>
      <CodeBlock title="Terminal">{`cd backend
npm install`}</CodeBlock>

      <h2
        id="dependencies"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Dependencies
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        The backend relies on these production dependencies:
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                express
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Web framework for routing and middleware
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                mongoose
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                MongoDB ODM with schema validation and hooks
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                jsonwebtoken
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                JWT signing and verification
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                bcryptjs
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Password hashing with salt rounds
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                express-validator
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Input validation and sanitization
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                helmet
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Security headers (CSP, HSTS, X-Frame-Options)
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                cors
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Cross-origin resource sharing
              </td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/40">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                morgan
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                HTTP request logger for development
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                express-rate-limit
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Rate limiting to prevent abuse
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-[13px] text-indigo-600 font-medium">
                dotenv
              </td>
              <td className="px-4 py-2.5 text-slate-600">
                Load environment variables from .env file
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        id="database-seeding"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Database seeding
      </h2>
      <p className="text-[15.5px] text-slate-600 leading-relaxed mb-4">
        The seed script creates three test users (one per role) and 20 sample
        transactions spread over the last 6 months. Run it once before starting
        development:
      </p>
      <CodeBlock title="Terminal">{`npm run seed`}</CodeBlock>

      <p className="text-[15px] text-slate-600 leading-relaxed mt-5 mb-4">
        The script performs these steps:
      </p>
      <div className="grid gap-3 mb-8">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[13px] font-bold">
            1
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Clears existing data
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Deletes all users and transactions for a fresh start.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[13px] font-bold">
            2
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Creates three users
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Admin, analyst, and viewer — passwords are automatically hashed
              by the pre-save hook.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[13px] font-bold">
            3
          </span>
          <div>
            <span className="text-[14.5px] font-bold text-slate-800">
              Generates 20 transactions
            </span>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Random amounts, categories (salary, food, rent, etc.), and dates
              across the last 6 months. ~1/3 income, ~2/3 expense.
            </p>
          </div>
        </div>
      </div>

      <h2
        id="test-accounts"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Test accounts
      </h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 hover:bg-indigo-50/40 transition-colors">
              <td className="px-4 py-3 font-mono text-[13px] text-indigo-600 font-medium">
                admin@test.com
              </td>
              <td className="px-4 py-3 font-mono text-[13px] text-slate-700">
                admin123
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[12px] font-bold">
                  admin
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-indigo-50/40 transition-colors">
              <td className="px-4 py-3 font-mono text-[13px] text-indigo-600 font-medium">
                analyst@test.com
              </td>
              <td className="px-4 py-3 font-mono text-[13px] text-slate-700">
                analyst123
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[12px] font-bold">
                  analyst
                </span>
              </td>
            </tr>
            <tr className="hover:bg-indigo-50/40 transition-colors">
              <td className="px-4 py-3 font-mono text-[13px] text-indigo-600 font-medium">
                viewer@test.com
              </td>
              <td className="px-4 py-3 font-mono text-[13px] text-slate-700">
                viewer123
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[12px] font-bold">
                  viewer
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        id="running-the-server"
        className="text-2xl font-bold text-slate-900 mt-14 mb-4"
      >
        Running the server
      </h2>
      <CodeBlock title="Development (with auto-reload)">{`npm run dev`}</CodeBlock>
      <CodeBlock title="Production">{`npm start`}</CodeBlock>
      <p className="text-[15px] text-slate-600 leading-relaxed mt-4">
        The server starts on <code>http://localhost:3000</code> (or the port
        specified in <code>.env</code>). All API endpoints are available under{" "}
        <code>/api</code>.
      </p>
    </div>
  );
}
