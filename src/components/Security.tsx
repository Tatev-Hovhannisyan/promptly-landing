"use client";

import { useRef, useState, useEffect } from "react";

export default function Security() {
  const items = ["Data Encryption", "Secure Cloud Storage", "24/7 Monitoring", "GDPR Compliant"];
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
      aria-label="Security and Data Safety"
      className="py-20 px-6 text-white"
      style={{ background: "linear-gradient(to bottom, #0a0f3d, #05071f)" }}
    >
      <h2 className="text-4xl font-bold text-center mb-14 drop-shadow-[0_0_20px_#0533eb]">Security & Data Safety</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((item, i) => (
          <div
            key={i}
            aria-label={item}
            className="p-8 rounded-2xl bg-[#1b0b29] hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,200,0.2)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: reduceMotion ? "none" : `all 0.5s ease ${i * 100}ms`,
            }}
          >
            <p className="font-semibold text-white">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
