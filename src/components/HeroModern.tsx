"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect || !imageRef.current || !bgRef.current) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    lastPos.current = { x, y };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      imageRef.current!.style.transform = `perspective(1200px) rotateY(${-15 + lastPos.current.x}deg) rotateX(${lastPos.current.y}deg)`;
      bgRef.current!.style.transform = `translate3d(${-lastPos.current.x * 1.5}px, ${-lastPos.current.y * 1.5}px, 0)`;
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current || !bgRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    imageRef.current.style.transition = "transform 400ms cubic-bezier(.2,.9,.2,1)";
    imageRef.current.style.transform = "perspective(1200px) rotateY(-15deg) rotateX(0deg)";

    bgRef.current.style.transition = "transform 500ms ease-out";
    bgRef.current.style.transform = "translate3d(0,0,0)";

    setTimeout(() => {
      if (imageRef.current) imageRef.current.style.transition = "";
      if (bgRef.current) bgRef.current.style.transition = "";
    }, 420);
  };

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

  const handleClick = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) pricingSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-label="Hero"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
        perspective: "1200px",
        overflow: "hidden",
        flexWrap: "wrap",
        background:
          "linear-gradient(90deg, rgba(10,15,61,1) 0%, rgba(46,13,63,0.95) 100%)",
      }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.08), rgba(0,255,204,0.05))",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: "1 1 400px",
          maxWidth: "520px",
          padding: "2rem",
          color: "white",
          position: "relative",
          zIndex: 2,
          transform: visible ? "translateX(0)" : "translateX(-60px)",
          opacity: visible ? 1 : 0,
          transition: "all 900ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        <h1
          style={{
            fontSize: "3.4rem",
            marginBottom: "0.6rem",
            background: "linear-gradient(90deg, #0533eb, #00ffcc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 15px rgba(5,51,235,0.6)",
            lineHeight: "1.1",
          }}
        >
          Create AI-Powered Content
          <br />
          <span
            style={{
              color: "#00ffcc",
              textShadow: "0 0 25px #00ffcc",
              fontSize: "1.05em",
            }}
          >
            5× Faster With Zero Effort
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.9,
            margin: "1.2rem 0 2rem 0",
            maxWidth: 420,
            lineHeight: "1.5",
          }}
        >
          Write high-quality blog posts, emails and landing pages in just seconds.  
          Boost your workflow instantly — powered by advanced AI.
        </p>

        {/* Текст-«кнопка» вместо Start Now */}
        <div
          onClick={handleClick}
          style={{
            display: "inline-block",
            padding: "0.85rem 2rem",
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: "0.95rem",
            background: "linear-gradient(90deg, #0533eb, #00ffcc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(5,51,235,0.5)",
            transition: "all 0.3s ease",
            transform: visible ? "translateY(0)" : "translateY(20px)",
            opacity: visible ? 1 : 0,
  
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-2px) scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0) scale(1)")
          }
        >
          Free trial included →
        </div>

        {/* NEW CLIENT LOGOS */}
        <div
          style={{
            marginTop: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 900ms ease",
          }}
        >
          <p style={{ opacity: 0.7, marginBottom: "0.6rem", fontSize: "0.9rem" }}>
            Trusted by creators and teams at:
          </p>

          <div style={{ display: "flex", gap: "1.8rem", opacity: 0.85 }}>
            <span>• Notion</span>
            <span>• Figma</span>
            <span>• Webflow</span>
            <span>• Intercom</span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          flex: "1 1 300px",
          width: "720px",
          height: "620px",
          marginLeft: "80px",
          marginTop: "30px",
          zIndex: 1,
          transformStyle: "preserve-3d",
          transform: "perspective(1200px) rotateY(-15deg) rotateX(0deg)",
          transition: "transform 120ms ease-out",
          overflow: "hidden",
          borderRadius: "30% / 70%",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.6), 0 10px 40px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.06) inset",
          clipPath: "polygon(5% 10%, 100% -70%, 100% 100%, 5% 100%)",
          position: "relative",
        }}
      >
        <Image
          src="/1.webp"
          alt="Creative inspiration"
          fill
          sizes="(max-width: 768px) 90vw, 50vw"
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
