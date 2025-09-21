"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(subRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center text-center h-172 bg-gradient-to-br from-indigo-600 to-purple-600 text-white overflow-hidden mb-44 w-screen"
    >
      <h1
        ref={headingRef}
        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 mx-4"
      >
        ยินดีต้อนรับสู่การสมัคร TCAS69 Portfolio
      </h1>

      <p ref={subRef} className="max-w-2xl text-lg md:text-xl mb-8 text-gray-200">
        กรอกแบบฟอร์มด้านล่างเพื่อสมัครเรียนต่อในระดับมหาวิทยาลัย
      </p>
    </section>
  );
}
