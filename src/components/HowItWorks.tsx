"use client";

import { useEffect, useRef, useState } from "react";

export default function HowItWorks() {
  const steps = [
    "Sign Up",
    "Create Your Project",
    "Customize Settings",
    "Get Results Instantly",
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

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
      aria-label="How it works"
      className="py-20 px-6 text-white"
      style={{ background: "linear-gradient(to bottom, #2e0d3f, #0a0f3d)" }}
    >
      <h2 className="text-4xl font-bold text-center mb-14 drop-shadow-[0_0_20px_#0533eb]">
        How It Works
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <div
            key={i}
            aria-label={`Step ${i + 1}: ${step}`}
            className={`flex flex-col items-center p-6 rounded-2xl bg-[#1b0b29] text-center
              shadow-[0_0_15px_rgba(0,255,200,0.2)]
              hover:scale-105 transition-all duration-300
            `}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: reduceMotion
                ? "none"
                : `all 0.6s cubic-bezier(.2,.9,.2,1) ${i * 100}ms`,
            }}
          >
            <div className="text-3xl mb-4 font-bold text-[#00ffcc]">{i + 1}</div>
            <p className="text-white font-semibold">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
