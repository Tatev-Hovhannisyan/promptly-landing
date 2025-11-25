"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect || !imageRef.current || !bgRef.current || !videoRef.current) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    lastPos.current = { x, y };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      imageRef.current!.style.transform = `perspective(1200px) rotateY(${-15 + lastPos.current.x}deg) rotateX(${lastPos.current.y}deg)`;
     if (videoRef.current) {
  (videoRef.current.style as CSSStyleDeclaration).transform = 
    `perspective(1200px) rotateY(${15 - lastPos.current.x}deg) rotateX(${-lastPos.current.y}deg)`;
}

      bgRef.current!.style.transform = `translate3d(${-lastPos.current.x * 1.5}px, ${-lastPos.current.y * 1.5}px, 0)`;
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current || !bgRef.current || !videoRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    imageRef.current.style.transition = "transform 400ms cubic-bezier(.2,.9,.2,1)";
    imageRef.current.style.transform = "perspective(1200px) rotateY(-15deg) rotateX(0deg)";

    videoRef.current.style.transition = "transform 500ms ease-out";
    videoRef.current.style.transform = "perspective(1200px) rotateY(15deg) rotateX(0deg)";

    bgRef.current.style.transition = "transform 500ms ease-out";
    bgRef.current.style.transform = "translate3d(0,0,0)";

    setTimeout(() => {
      imageRef.current!.style.transition = "";
      videoRef.current!.style.transition = "";
      bgRef.current!.style.transition = "";
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
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexWrap: "wrap",
        background: "linear-gradient(90deg, rgba(10,15,61,1) 0%, rgba(46,13,63,0.95) 100%)",
      }}
    >
      {/* Background overlay */}
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

      {/* Video */}
      <div
        ref={videoRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "2rem",
          width: "400px",
          height: "300px",
          borderRadius: "40% / 60%", 
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <video
          src="/demo/demo.mp4"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Text*/}
      <div
        style={{
          flex: "1 1 500px",
          maxWidth: "600px",
          padding: "2rem",
          color: "white",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          transform: visible ? "translateY(60px)" : "translateY(20px)",
          opacity: visible ? 1 : 0,
           marginLeft: "15rem",
          transition: "all 900ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
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
          <span style={{ color: "#00ffcc", textShadow: "0 0 25px #00ffcc", fontSize: "1.05em" }}>
            5× Faster With Zero Effort
          </span>
        </h1>

        <p style={{ fontSize: "1.2rem", opacity: 0.9, margin: "1.2rem 0 2rem 0", lineHeight: "1.5" }}>
          Write high-quality blog posts, emails and landing pages in just seconds.
          Boost your workflow instantly — powered by advanced AI.
        </p>

        <div
          onClick={handleClick}
          style={{
            display: "inline-block",
            padding: "1.85rem 2rem",
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
          }}
        >
          Free trial included →
        </div>
      </div>

      {/* Image */}
      <div
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          flex: "0 0 580px",
          width: "500px",
          height: "500px",
          borderRadius: "30% / 70%",
          overflow: "hidden",
          zIndex: 2,
          marginLeft: "7rem",
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
