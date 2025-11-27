"use client";

import { useRef, useState, useEffect } from "react";

export default function SocialProof() {
  const stats = [
    { label: "Users", value: "12k+" },
    { label: "Active Projects", value: "340+" },
    { label: "Rating", value: "4.9/5" }
  ];

  const logos = [
    "/logo1.png",
    "/logo2.webp",
    "/logo3.png",
    "/logo4.png"
  ];

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
      aria-label="Social Proof"
      className={`py-20 px-6 text-white transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ background: "linear-gradient(to bottom, #2e0d3f, #0a0f3d)" }}
    >
      <h2 className="text-4xl font-bold text-center mb-14 drop-shadow-[0_0_20px_#0533eb]">
        Trusted by Thousands
      </h2>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-12 mb-12">
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Company ${i + 1}`}
            className={`h-16 object-contain opacity-80 hover:opacity-100 transition-all duration-700
              ${visible ? "opacity-80 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-90"}
              hover:scale-105 hover:drop-shadow-[0_0_15px_#00ffcc]`}
            style={{ transitionDelay: `${i * 150}ms` }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`transition-all duration-700
              ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
              hover:scale-105 hover:drop-shadow-[0_0_12px_#00ffcc]`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <p className="text-3xl font-bold text-[#00ffcc] mb-2">{stat.value}</p>
            <p className="text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
