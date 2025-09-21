"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

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

      // Soft moving gradient blobs in the background (infinite loop)
      if (blob1Ref.current && blob2Ref.current) {
        const b1 = blob1Ref.current;
        const b2 = blob2Ref.current;

        // Loop around a gentle path (no yoyo), creates a continuous drift
        gsap
          .timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
          .to(b1, { x: 80, y: -40, duration: 6 })
          .to(b1, { x: 0, y: -120, duration: 6 })
          .to(b1, { x: -80, y: -20, duration: 6 })
          .to(b1, { x: 0, y: 40, duration: 6 });

        gsap
          .timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
          .to(b2, { x: -60, y: 50, duration: 7 })
          .to(b2, { x: 40, y: 100, duration: 7 })
          .to(b2, { x: 90, y: -20, duration: 7 })
          .to(b2, { x: 0, y: -60, duration: 7 });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative mb-44 flex min-h-[28rem] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 px-6 text-center text-white md:min-h-[40rem]"
    >
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={blob1Ref}
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/30 blur-3xl"
        />
        <div
          ref={blob2Ref}
          className="absolute -right-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-sky-400/25 blur-3xl"
        />
      </div>

      <h1 ref={headingRef} className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
        TCAS69 Portfolio
      </h1>
      <p ref={subRef} className="max-w-2xl text-lg text-gray-200 md:text-xl">
        กรอกแบบฟอร์มเพื่อบันทึกข้อมูล และดูรายชื่อนักศึกษาที่มีการส่งข้อมูลแล้ว
      </p>
    </section>
  );
}
