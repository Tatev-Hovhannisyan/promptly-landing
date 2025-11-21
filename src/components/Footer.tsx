"use client";
import { useState } from "react";

export default function Footer() {
  const [popup, setPopup] = useState<{ label: string; visible: boolean }>({
    label: "",
    visible: false,
  });

  const handleDynamicLink = (label: string) => {
    setPopup({ label, visible: true });
    setTimeout(() => setPopup({ label, visible: false }), 2500); // скрываем через 2.5 сек
  };

  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-[#0a0f3d] text-white flex flex-col md:flex-row justify-between items-center gap-6 relative">
      <div>
        <h3 className="text-xl font-bold mb-2">Promptly</h3>
        <p className="max-w-xs opacity-80 text-sm">
          Instantly generate AI-powered content for blogs, emails, and
          marketing. Fast, secure, and effortless.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleDynamicLink("Terms")}
            className="hover:text-[#00ffcc] text-sm text-left md:text-left"
          >
            Terms
          </button>

          <button
            onClick={() => handleDynamicLink("Privacy")}
            className="hover:text-[#00ffcc] text-sm text-left md:text-left"
          >
            Privacy
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href="mailto:support@promptly.com"
            className="hover:text-[#00ffcc] text-sm"
          >
            support@promptly.com
          </a>

          <div className="flex gap-3">
            <a href="#" className="hover:text-[#00ffcc] text-sm">
              Twitter
            </a>
            <a href="#" className="hover:text-[#00ffcc] text-sm">
              LinkedIn
            </a>
            <a href="#" className="hover:text-[#00ffcc] text-sm">
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Popup notification */}
      {popup.visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 rounded-md bg-[#0533eb] text-white text-sm shadow-lg z-50 transition-all duration-300">
          {popup.label} page is not available.
        </div>
      )}
    </footer>
  );
}
