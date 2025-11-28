"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen w-full p-10 transition-all duration-1000 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{
        background: "linear-gradient(to bottom right, #0a0f3d, #2e0d3f)",
        color: "white",
      }}
    >
      <div className="max-w-4xl mx-auto mt-28 flex flex-col gap-10">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-lg text-white bg-white/10 hover:bg-white/20 transition border border-white/20 self-start"
        >
          ← Back to Home
        </button>

        <h1 className="text-5xl font-bold drop-shadow-[0_0_15px_#0533eb]">Contact Us</h1>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-xl">
          <ul className="space-y-4 text-lg">
            <li>
              📧 Email: <span className="text-[#53a7ff]">support@promptly.ai</span>
            </li>
            <li>
              💬 Telegram: <span className="text-[#53a7ff]">@promptly_support</span>
            </li>
            <li>
              🌐 Website: <span className="text-[#53a7ff]">promptly.ai</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-xl">
          {submitted ? (
            <p className="text-green-400 font-semibold text-center">
              Thank you! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ffcc] text-white placeholder-white/70 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ffcc] text-white placeholder-white/70 transition"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ffcc] text-white placeholder-white/70 transition"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-3 mt-2 rounded-xl font-semibold text-white text-lg bg-[#0533eb] hover:scale-105 transition shadow-lg self-center"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
