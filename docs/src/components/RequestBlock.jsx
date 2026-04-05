import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

const BASE_URL = "http://localhost:3000";

function buildHttpRequest(method, path, auth, body) {
  let lines = [`${method} ${BASE_URL}${path}`];

  if (auth && auth !== "None") {
    lines.push(`Authorization: Bearer <your-token>`);
  }

  if (body) {
    lines.push("Content-Type: application/json");
    lines.push("");
    lines.push(body);
  }

  return lines.join("\n");
}

function buildCurlRequest(method, path, auth, body) {
  const parts = [`curl -X ${method} ${BASE_URL}${path}`];

  if (auth && auth !== "None") {
    parts.push(`  -H "Authorization: Bearer <your-token>"`);
  }

  if (body) {
    parts.push(`  -H "Content-Type: application/json"`);
    parts.push(`  -d '${body}'`);
  }

  return parts.join(" \\\n");
}

export default function RequestBlock({ method, path, auth, body }) {
  const [tab, setTab] = useState("http");
  const [copied, setCopied] = useState(false);

  const httpText = buildHttpRequest(method, path, auth, body);
  const curlText = buildCurlRequest(method, path, auth, body);
  const activeText = tab === "http" ? httpText : curlText;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4">
      <div className="rounded-xl overflow-hidden border border-slate-800">
        <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTab("http")}
              className={`px-2.5 py-1 rounded-md text-[11.5px] font-semibold tracking-wide transition-all cursor-pointer ${
                tab === "http"
                  ? "bg-slate-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              HTTP
            </button>
            <button
              onClick={() => setTab("curl")}
              className={`px-2.5 py-1 rounded-md text-[11.5px] font-semibold tracking-wide transition-all cursor-pointer ${
                tab === "curl"
                  ? "bg-slate-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              cURL
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Clipboard size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-300 px-5 py-4 overflow-x-auto text-[13.5px] leading-relaxed font-mono">
          {activeText}
        </pre>
      </div>
    </div>
  );
}
