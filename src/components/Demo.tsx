"use client";
import { useState, useEffect, useRef } from "react";

export default function Demo({ onVisible }: { onVisible?: () => void }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const sampleTexts = [
    "Unlock the full potential of AI for your content.",
    "Generate engaging posts, emails, and articles instantly.",
    "Boost productivity and save hours of writing.",
    "Transform ideas into polished content in seconds.",
    "Get smart suggestions to improve your text effortlessly.",
  ];

  // Typewriter effect
  useEffect(() => {
    if (!isGenerating || !result) return;
    setDisplayedText("");

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + result[i]);
      i++;
      if (i >= result.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isGenerating, result]);

  // Intersection Observer (fade-in Demo section)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (onVisible) onVisible();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [onVisible]);

  const handleGenerate = () => {
    if (!input.trim()) return;
    const randomText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setResult(randomText);
    setIsGenerating(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleGenerate();
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setDisplayedText("");
    setIsGenerating(false);
  };

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [displayedText]);

  const glowBlue = "#0533eb";
  const cardBg = "rgba(15, 20, 60, 0.6)";
  const innerBg = "rgba(20, 25, 70, 0.7)";
  const emerald = "#084E40";

  return (
    <div
      ref={sectionRef}
      className={`relative w-full py-36 flex justify-center transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-white/20"></div>

      <section
        className="w-full max-w-4xl relative rounded-3xl p-10 flex flex-col gap-8 backdrop-blur-xl transition-all duration-500"
        style={{
          background: cardBg,
          border: `2px solid ${glowBlue}`,
          boxShadow: "0 0 30px rgba(5,51,235,0.4), 0 0 90px rgba(5,51,235,0.2)",
        }}
      >
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-[0_0_10px_#0533eb]">
          Instant Creativity
        </h2>

        <h3 className="text-lg text-center text-white/90">
          Type your idea — watch it transform instantly
        </h3>

        {/* Input area */}
        <div
          className="w-full max-w-3xl mx-auto rounded-2xl p-6 flex flex-col gap-6 transition-all duration-500 shadow-lg"
          style={{
            background: innerBg,
            border: `2px solid rgba(255,255,255,0.1)`,
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.4), inset 0 0 20px rgba(5,51,235,0.15)",
          }}
        >
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              aria-label="Enter content topic"
              placeholder="Enter a topic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-4 py-3 rounded-xl text-white bg-[#0a0f3d]/70 focus:outline-none focus:ring-2 placeholder-white/60"
              style={{
                border: `2px solid ${glowBlue}`,
                boxShadow: `0 0 12px rgba(5,51,235,0.4)`,
              }}
            />

            <button
              aria-label="Generate AI content"
              onClick={handleGenerate}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#0533eb]"
              style={{ backgroundColor: glowBlue }}
            >
              Generate
            </button>
          </div>

          {/* Result box */}
          <div
            ref={resultRef}
            className="rounded-xl p-4 max-h-[400px] overflow-y-auto relative text-white whitespace-pre-wrap"
            style={{
              background: "#0a0f3d",
              border: `2px solid ${glowBlue}`,
              boxShadow:
                "inset 0 0 20px rgba(5,51,235,0.25), 0 0 40px rgba(5,51,235,0.15)",
            }}
          >
            {displayedText && (
              <>
                <button
                  aria-label="Clear result"
                  onClick={handleClear}
                  className="absolute top-3 right-3 text-white text-lg hover:text-[#53a7ff] transition"
                >
                  ✕
                </button>

                <pre>{displayedText}</pre>
              </>
            )}
          </div>

          {/* Buttons: Try now + Copy */}
          {displayedText && !isGenerating && (
            <div className="text-center mt-4 flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn">
              <a
                aria-label="Try now"
                href="mailto:contact@promptly.ai"
                className="px-6 py-3 bg-[#0533eb] rounded-xl font-semibold text-white hover:scale-105 hover:shadow-[0_0_20px_#0533eb] transition-all duration-300"
              >
                Try Now
              </a>

              <button
                aria-label="Copy generated result"
                onClick={() => navigator.clipboard.writeText(displayedText)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: emerald,
                  boxShadow: "0 0 14px rgba(0,255,204,0.18)",
                }}
              >
                Copy Result
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }

        @media (max-width: 768px) {
          .flex-wrap {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
