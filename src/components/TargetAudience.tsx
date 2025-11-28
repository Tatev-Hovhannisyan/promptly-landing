"use client";

import { useRef, useState, useEffect } from "react";

export default function TargetAudience() {
  const audiences = ["Freelancers", "Small Businesses", "Agencies", "Marketers"];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Target Audience"
      className="py-20 px-6 text-white"
      style={{ background: "linear-gradient(to bottom, #0a0f3d, #05071f)" }}
    >
      <h2 className="text-4xl font-bold text-center mb-14 drop-shadow-[0_0_20px_#0533eb]">
        Who It's For
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {audiences.map((audience, i) => (
          <div
            key={i}
            aria-label={`Target audience: ${audience}`}
            className="flex flex-col items-center p-8 rounded-2xl bg-[#1b0b29] text-center hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,200,0.2)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: reduceMotion ? "none" : `all 0.5s ease ${i * 150}ms`,
            }}
          >
            <p className="text-xl font-semibold">{audience}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
