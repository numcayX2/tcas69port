"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GsapHello() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!boxRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        boxRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={boxRef} className="p-4 rounded-lg border w-full max-w-md">
      <h2 className="text-lg font-semibold">GSAP Animation</h2>
      <p className="text-sm text-gray-600">This box animates in on mount.</p>
    </div>
  );
}

