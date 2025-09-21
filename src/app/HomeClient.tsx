"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/Herosection"), {
  ssr: false,
});
const RegForm = dynamic(() => import("@/components/RegForm"), {
  ssr: false,
});

export default function HomeClient() {
  return (
    <main className="mx-auto w-full max-w-5xl">
      <HeroSection />
      <RegForm />
    </main>
  );
}

