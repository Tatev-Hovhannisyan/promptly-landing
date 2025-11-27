"use client";

export default function HowItWorks() {
  const steps = [
    "Sign Up",
    "Create Your Project",
    "Customize Settings",
    "Get Results Instantly"
  ];

  return (
    <section
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
            className="flex flex-col items-center p-6 rounded-2xl bg-[#1b0b29] text-center hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,200,0.2)]"
          >
            <div className="text-3xl mb-4 font-bold text-[#00ffcc]">{i + 1}</div>
            <p className="text-white font-semibold">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
