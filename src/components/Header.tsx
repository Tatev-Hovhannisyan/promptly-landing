"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [open, setOpen] = useState(false);

  const scrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="navigation"
        aria-label="Main Navigation"
        className="
          w-full fixed top-0 z-50 
          bg-gradient-to-r from-[#0a0f3d] to-[#2e0d3f]/90 
          backdrop-blur-md py-4 px-6 
          flex justify-between items-center
          border-b border-white/20 shadow-lg
        "
      >
        <Link
          href="/"
          prefetch={false}
          aria-label="Go to homepage"
          className="font-bold text-2xl text-white 
          drop-shadow-[0_0_6px_#0533eb] tracking-wide"
        >
          Promptly
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-white hover:text-[#53a7ff] transition duration-300 text-sm"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-white hover:text-[#53a7ff] transition duration-300 text-sm"
          >
            Contact
          </Link>

          <button
            onClick={scrollToPricing}
            aria-label="Scroll to pricing"
            className="
              px-4 py-2 rounded-full font-semibold text-sm
              bg-gradient-to-r from-[#0533eb] to-[#00ffcc] 
              text-white shadow-[0_0_15px_rgba(5,51,235,0.4)]
              hover:scale-105 active:scale-95 
              transition-all duration-300
            "
          >
            Try Now
          </button>
        </nav>

    
        <button
          aria-label="Open mobile menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              aria-label="Mobile Navigation Menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="
                absolute top-full left-0 w-full
                bg-gradient-to-b from-[#0a0f3d] to-[#2e0d3f]
                border-b border-white/20 
                flex flex-col items-center py-6 gap-4 shadow-xl
                md:hidden
              "
            >
              <Link
                href="/about"
                className="text-white text-lg hover:text-[#53a7ff] transition"
                onClick={() => setOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-white text-lg hover:text-[#53a7ff] transition"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>

              <button
                onClick={() => {
                  scrollToPricing();
                  setOpen(false);
                }}
                aria-label="Scroll to pricing from mobile"
                className="
                  mt-3 px-6 py-3 rounded-full font-semibold
                  bg-gradient-to-r from-[#0533eb] to-[#00ffcc] 
                  text-white shadow-[0_0_15px_rgba(5,51,235,0.4)]
                  hover:scale-105 transition-all duration-300
                "
              >
                Try Now
              </button>

              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white text-sm mt-2"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <button
        onClick={scrollToPricing}
        className="
          fixed bottom-6 right-6 z-[60] md:hidden
          px-5 py-3 rounded-full font-semibold
          bg-gradient-to-r from-[#0533eb] to-[#00ffcc]
          text-white shadow-[0_0_18px_rgba(5,51,235,0.45)]
          hover:scale-105 active:scale-95
          transition-all duration-300
        "
        style={{ backdropFilter: "blur(6px)" }}
      >
        Start Now
      </button>
    </>
  );
};

export default Header;
