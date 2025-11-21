"use client";
import { FaBolt, FaSearch, FaClock } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: <FaBolt />, title: "Fast Generation", desc: "Get AI content in seconds." },
  { icon: <FaSearch />, title: "Smart Suggestions", desc: "Relevant suggestions for your text." },
  { icon: <FaClock />, title: "Save Time", desc: "Spend less time writing and editing." }
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Features section"
      className={`relative py-20 px-6 transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ background: "linear-gradient(to bottom, #0a0f3d, #2e0d3f)" }}
    >
      {/* Top glowing line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[1px] bg-white/20"></div>

      <h2
        className="text-4xl font-bold mb-14 text-center text-white
        drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
      >
        Features
      </h2>

      <div
        className="
          max-w-6xl mx-auto 
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          gap-10 md:gap-12
        "
      >
        {features.map((feature, i) => (
          <div
            key={i}
            className={`
              flex flex-col items-center p-8 rounded-2xl
              transition-all duration-700 ease-out text-center
              ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
              hover:-translate-y-3
              hover:shadow-[0_0_25px_rgba(0,255,200,0.35)]
            `}
            style={{
              background: "#1b0b29",
              boxShadow: "0 0 15px rgba(0,0,0,0.4)"
            }}
          >
            {/* Feature icon */}
            <div className="text-5xl mb-5 text-[#7d5cff] drop-shadow-[0_0_6px_#7d5cff70]">
              {feature.icon}
            </div>

            {/* Feature title */}
            <h3 className="text-2xl font-semibold mb-3 text-white">
              {feature.title}
            </h3>

            {/* Feature description */}
            <p className="text-gray-300 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
