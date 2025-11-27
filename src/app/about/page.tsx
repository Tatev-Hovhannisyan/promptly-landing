"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen w-full p-10 transition-all duration-1000 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{
        background: "linear-gradient(to bottom right, #0a0f3d, #2e0d3f)",
        color: "white",
      }}
    >
      <div className="max-w-4xl mx-auto mt-28 flex flex-col gap-8">
        <button
          onClick={() => router.push("/")}
          className="mb-4 px-4 py-2 rounded-lg text-white bg-white/10 hover:bg-white/20 transition border border-white/20 self-start"
        >
          ← Back to Home
        </button>

        <h1 className="text-5xl font-bold drop-shadow-[0_0_15px_#0533eb]">
          About Promptly
        </h1>

        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-xl">
            <p className="text-lg text-white/90 leading-relaxed">
              <span className="text-[#53a7ff] font-semibold">Promptly</span> is
              a modern AI-powered tool designed to help you create clean,
              accurate, and highly effective prompts for any AI model.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-xl">
            <p className="text-lg text-white/90 leading-relaxed">
              It analyzes your text, improves structure, suggests better
              formulations, and enhances clarity to help you achieve
              higher-quality results.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-xl">
            <h2 className="text-3xl font-semibold text-[#53a7ff] mb-4 drop-shadow-[0_0_10px_#0533eb]">
              How Promptly Works
            </h2>
            <ul className="space-y-3 text-white/90">
              <li>• Paste your prompt or idea</li>
              <li>• The AI analyzes its structure</li>
              <li>• You receive improved versions and suggestions</li>
              <li>• Export or copy the final result</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
