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
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const lastPos = useRef({ x: 0, y: 0 });

  // Track window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;

    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect || !imageRef.current || !bgRef.current || !videoRef.current) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    lastPos.current = { x, y };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      imageRef.current!.style.transform = `perspective(1200px) rotateY(${-15 + lastPos.current.x}deg) rotateX(${lastPos.current.y}deg)`;
      videoRef.current!.style.transform = `perspective(1200px) rotateY(${15 - lastPos.current.x}deg) rotateX(${-lastPos.current.y}deg)`;
      bgRef.current!.style.transform = `translate3d(${-lastPos.current.x * 1.5}px, ${-lastPos.current.y * 1.5}px, 0)`;
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
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

  // Intersection Observer for animation
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

  // Адаптив
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Видео размеры
  const videoWidth = isMobile || isTablet ? "90%" : "400px";
  const videoHeight = isMobile || isTablet ? "200px" : "300px";

  // Image style (правый угол, скрыть на планшете и мобильных)
  const imageStyle: React.CSSProperties = {
    flex: "0 0 auto",
    borderRadius: "30% / 70%",
    overflow: "hidden",
    zIndex: 2,
    display: isDesktop ? "block" : "none",
    width: "500px",
    height: "500px",
    position: "absolute",
    top: "20%",
    right: "3%",
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
        flexWrap: isMobile ? "wrap" : "nowrap",
        background: "linear-gradient(90deg, rgba(10,15,61,1) 0%, rgba(46,13,63,0.95) 100%)",
        padding: "2rem",
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
          background: "linear-gradient(120deg, rgba(255,255,255,0.08), rgba(0,255,204,0.05))",
          mixBlendMode: "overlay",
        }}
      />

      {/* Video (слева) */}
      <div
        ref={videoRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          marginTop: isMobile ? "2rem" : "-8rem",
          marginLeft: isMobile ? 0 : "-19rem",
          marginBottom: isMobile ? "2rem" : 0,
          flex: "0 0 auto", 
          width: videoWidth,
          height: videoHeight,
          borderRadius: "10% / 60%",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <video
          src="/Demo/demo.mp4"
          preload="metadata"
          poster="/Demo/demo-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Text (центр) */}
      <div
        style={{
          flex: "1 1 500px",
          maxWidth: "500px",
          marginLeft: isMobile ? 0 : "2rem",
          marginRight: isMobile ? 0 : "12rem",
          padding: "2rem",
          color: "white",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          transform: visible ? "translateY(60px)" : "translateY(20px)",
          opacity: visible ? 1 : 0,
          transition: "all 900ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
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
              fontSize: isMobile ? "1em" : "1.05em",
            }}
          >
            5× Faster With Zero Effort
          </span>
        </h1>

        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            opacity: 0.9,
            margin: "1.2rem 0 2rem 0",
            lineHeight: "1.5",
          }}
        >
          Write high-quality blog posts, emails and landing pages in just seconds. Boost
          your workflow instantly — powered by advanced AI.
        </p>

        <div
          onClick={handleClick}
          style={{
            display: "inline-block",
            padding: isMobile ? "1.2rem 1.5rem" : "1.85rem 2rem",
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: isMobile ? "0.85rem" : "0.95rem",
            background: "linear-gradient(90deg, #0533eb, #00ffcc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(5,51,235,0.5)",
            transition: "all 0.3s ease",
          }}
        >
          Free trial included →
        </div>
      </div>

      {/* Image (справа) */}
      <div ref={imageRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={imageStyle}>
        <Image
          src="/1.webp"
          alt="Creative inspiration"
          fill
          sizes={isDesktop ? "50vw" : "90vw"}
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
