import { useState, useEffect, useRef } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const content = document.getElementById("doc-content");
      if (!content) return;

      const elements = content.querySelectorAll("h2[id]");
      const items = Array.from(elements).map((el) => ({
        id: el.id,
        text: el.getAttribute("data-toc-title") || el.textContent,
      }));
      setHeadings(items);

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );
          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
      );

      elements.forEach((el) => observerRef.current.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const timer = setTimeout(() => {
        const content = document.getElementById("doc-content");
        if (!content) return;

        const elements = content.querySelectorAll("h2[id]");
        const items = Array.from(elements).map((el) => ({
          id: el.id,
          text: el.getAttribute("data-toc-title") || el.textContent,
        }));
        setHeadings(items);
        setActiveId("");

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort(
                (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
              );
            if (visible.length > 0) {
              setActiveId(visible[0].target.id);
            }
          },
          { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
        );

        elements.forEach((el) => observerRef.current.observe(el));
      }, 150);

      return () => clearTimeout(timer);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav>
      <p className="text-[16px] font-bold text-slate-900 tracking-tight mb-5">
        On this page
      </p>
      <ul className="space-y-1.5 border-l-2 border-slate-100">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(h.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block pl-4 py-2.5 border-l-2 -ml-0.5 transition-all duration-200 ease-out no-underline text-[15px] leading-normal ${
                activeId === h.id
                  ? "border-indigo-500 text-indigo-600 font-semibold bg-indigo-50/50 rounded-r-lg"
                  : "border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50/50 hover:rounded-r-lg"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
