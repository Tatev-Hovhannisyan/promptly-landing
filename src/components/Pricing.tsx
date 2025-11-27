"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Basic",
    price: "$9/mo",
    features: ["Generate content", "Save drafts"],
    formUrl: "https://forms.gle/your-basic-plan-form",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29/mo",
    features: [
      "All Basic features",
      "Unlimited generations",
      "Priority support",
    ],
    formUrl: "https://forms.gle/your-pro-plan-form",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom solutions", "Dedicated support", "Team management"],
    formUrl: "https://forms.gle/your-enterprise-plan-form",
    popular: false,
  },
];

export default function Pricing() {
  const blueGlow = "#0533eb";
  const bgGlow = "rgba(0,255,200,0.5)";
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

  const handleChoose = (url: string) => window.open(url, "_blank");

  return (
    <section
      id="pricing"
      aria-label="Pricing plans"
      ref={sectionRef}
      className={`relative py-24 px-6 text-white transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        background: "linear-gradient(to bottom, #2e0d3f, #0a0f3d)",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{
          background: "rgba(255,255,255,0.35)",
          boxShadow: "0 0 18px rgba(255,255,255,0.8)",
        }}
      ></div>

      <h2 className="text-4xl font-bold text-center mb-14 drop-shadow-[0_0_25px_#0533eb]">
        Pricing
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col p-8 rounded-3xl h-full
              transition-transform duration-500 ease-out
              ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }
              hover:scale-[1.06] hover:shadow-[0_0_35px_#00ffcc80] hover:-translate-y-2 hover:rotate-[1deg]
            `}
            style={{
              background: "rgba(15, 10, 60, 0.55)",
              border: "2px solid rgba(255,255,255,0.15)",
              boxShadow:
                "0 0 40px rgba(5, 51, 235, 0.25), inset 0 0 25px rgba(5, 51, 235, 0.15)",
            }}
          >
            {plan.popular && (
              <div
                className="absolute top-4 right-4 px-3 py-1 text-sm font-bold rounded-full"
                style={{
                  background: bgGlow,
                  color: "#001a1a",
                  boxShadow: "0 0 10px rgba(0,255,200,0.9)",
                }}
              >
                MOST POPULAR
              </div>
            )}

            <h3
              className="text-2xl font-semibold mb-4 text-center"
              style={{ textShadow: "0 0 12px rgba(5,51,235,0.5)" }}
            >
              {plan.name}
            </h3>

            <p
              className="text-4xl font-bold mb-8 text-center"
              style={{ textShadow: "0 0 15px rgba(5,51,235,0.8)" }}
            >
              {plan.price}
            </p>

            <ul className="flex-1 mb-8 space-y-3 text-center text-blue-200 opacity-90">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="tracking-wide">
                  • {feature}
                </li>
              ))}
            </ul>

            <button
              aria-label={`Choose ${plan.name} plan`}
              onClick={() => handleChoose(plan.formUrl)}
              className="mt-auto px-8 py-4 rounded-xl font-semibold text-white text-lg
                transition-all duration-300 hover:scale-110 
                hover:shadow-[0_0_25px_#0533eb] self-center"
              style={{
                backgroundColor: blueGlow,
                boxShadow: "0 0 18px #0533eb90",
              }}
            >
              Choose Plan
            </button>

            {/* Small hints under button */}
            <div className="mt-2 text-center text-sm text-white/70 space-y-1">
              <p>No credit card required</p>
              <p>Cancel anytime</p>
              {plan.popular && (
                <p className="text-[#00ffcc] font-semibold">Save 20% yearly</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
