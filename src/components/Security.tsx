"use client";

export default function Security() {
  const items = [
    "Data Encryption",
    "Secure Cloud Storage",
    "24/7 Monitoring",
    "GDPR Compliant"
  ];

  return (
    <section
      aria-label="Security and Data Safety"
      className="py-20 px-6 text-white"
      style={{ background: "linear-gradient(to bottom, #0a0f3d, #05071f)" }}
    >
      <h2 className="text-4xl font-bold text-center mb-14 drop-shadow-[0_0_20px_#0533eb]">
        Security & Data Safety
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-[#1b0b29] hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,200,0.2)]"
          >
            <p className="font-semibold text-white">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
