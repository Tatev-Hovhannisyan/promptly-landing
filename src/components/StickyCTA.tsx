import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const handleScroll = () => {
      if (!footer) return;
      const rect = footer.getBoundingClientRect();
      setShow(rect.top > window.innerHeight); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToPricing}
      aria-label="Start Now"
      className="fixed bottom-8 right-8 px-6 py-4 rounded-full font-bold text-white text-lg
        bg-gradient-to-r from-[#0533eb] to-[#00ffcc]
        shadow-[0_0_25px_rgba(5,51,235,0.5)]
        hover:scale-105 transition-all duration-300 z-50"
    >
      Start Now
    </button>
  );
}
