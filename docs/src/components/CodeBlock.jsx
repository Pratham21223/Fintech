import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

export default function CodeBlock({ title, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 group">
      <div className="rounded-xl overflow-hidden border border-slate-800">
        {title && (
          <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
            <span className="text-[11.5px] font-semibold text-slate-400 uppercase tracking-widest">
              {title}
            </span>
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
        )}
        <div className="relative">
          <pre className="bg-slate-900 text-slate-300 px-5 py-4 overflow-x-auto text-[13.5px] leading-relaxed font-mono">
            {children}
          </pre>
          {!title && (
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-1.5 rounded-md bg-slate-700/60 hover:bg-slate-600 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <Clipboard size={14} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
