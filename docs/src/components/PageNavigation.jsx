import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const pages = [
  { path: "/", label: "Introduction" },
  { path: "/auth", label: "Authentication" },
  { path: "/transactions", label: "Transactions" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/users", label: "User Management" },
];

export default function PageNavigation() {
  const { pathname } = useLocation();
  const currentIndex = pages.findIndex((p) => p.path === pathname);
  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 flex items-stretch gap-4">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex-1 flex items-center gap-3 px-5 py-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all no-underline"
        >
          <ChevronLeft
            size={18}
            className="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0"
          />
          <div className="text-right flex-1">
            <div className="text-[12px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
              Previous
            </div>
            <div className="text-[15px] font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
              {prev.label}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex-1 flex items-center gap-3 px-5 py-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all no-underline"
        >
          <div className="flex-1">
            <div className="text-[12px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
              Next
            </div>
            <div className="text-[15px] font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
              {next.label}
            </div>
          </div>
          <ChevronRight
            size={18}
            className="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0"
          />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
