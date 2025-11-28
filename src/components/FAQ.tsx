"use client";

import { useState } from "react";

const faqs = [
  { q: "How does payment work?", a: "You can pay monthly or yearly via credit card or PayPal." },
  { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time." },
  { q: "Do you offer refunds?", a: "We offer a 14-day refund policy for all plans." },
  { q: "Do I need prior experience?", a: "No experience required. Our AI handles everything." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-title"
      className="py-20 px-6 text-white"
      style={{ background: "linear-gradient(to bottom, #2e0d3f, #0a0f3d)" }}
    >
      <h2
        id="faq-title"
        className="text-4xl font-bold text-center mb-14 drop-shadow-[0_0_20px_#0533eb]"
      >
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#1b0b29] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,200,0.2)] hover:scale-105"
            >
            
              <button
                className="w-full text-left font-semibold text-white"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                {faq.q}
              </button>

              {isOpen && (
                <p
                  id={`faq-panel-${i}`}
                  className="mt-2 text-white/80"
                >
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
