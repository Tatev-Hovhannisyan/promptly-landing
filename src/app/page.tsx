"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroModern from "../components/HeroModern";
import Demo from "../components/Demo";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import ComparisonTable from "@/components/ComparisonTable";
import HowItWorks from "../components/HowItWorks";
import TargetAudience from "../components/TargetAudience";
import SocialProof from "../components/SocialProof";
import Security from "../components/Security";
import FAQ from "../components/FAQ";
import StickyCTA from "../components/StickyCTA";

export default function Page() {
  const [demoVisible, setDemoVisible] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    if (demoVisible) {
      const timer = setTimeout(() => {
        setShowFeatures(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [demoVisible]);

  return (
    <div
      className="w-full text-white"
      style={{
        background: "radial-gradient(circle at 30% 30%, #1e0c2e, #2e0d3f 80%)", // общий фон
      }}
    >
      <Header />
      <HeroModern />

      <Demo onVisible={() => setDemoVisible(true)} />
      {showFeatures && <Features />}

      <HowItWorks />
      <TargetAudience />
      <SocialProof />
      <Security />
      <FAQ />
      <Pricing />
      <ComparisonTable />
      <Footer />

    </div>
  );
}
