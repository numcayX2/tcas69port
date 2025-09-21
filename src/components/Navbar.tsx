"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scope everything to this component (prevents double-init in React StrictMode)
    const ctx = gsap.context(() => {
      // Avoid flicker: set initial transform/opacity instantly
      gsap.set(el, { y: -64, opacity: 0 });

      // Entrance animation
      if (!prefersReduced) {
        gsap.to(el, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
      } else {
        gsap.set(el, { y: 0, opacity: 1 });
      }

      // Quick animators for super smooth updates (avoid creating new tweens each tick)
      const qY = gsap.quickTo(el, "y", { duration: 0.25, ease: "power2.out" });
      const qBg = (val: string) => {
        gsap.to(el, { backgroundColor: val, duration: 0.25, ease: "power2.out" });
      };
      const qShadow = (val: string) => {
        gsap.to(el, { boxShadow: val, duration: 0.25, ease: "power2.out" });
      };
      const qBorder = (val: string) => {
        gsap.to(el, { borderColor: val, duration: 0.25, ease: "power2.out" });
      };
      const qBackdrop = (val: string) => {
        // GSAP can set CSS variables, but backdrop-filter is fine directly.
        // quickTo doesn't support every prop, so we use gsap.set.
        gsap.set(el, { backdropFilter: val });
      };

      let lastY = window.scrollY;

      ScrollTrigger.create({
        start: 0,
        end: 99999, // acts like a global scroll listener
        onUpdate: () => {
          const curr = window.scrollY;

          // Top area: soft background, no shadow
          if (curr <= 8) {
            qBg("rgba(255,255,255,0.65)");
            qShadow("0 0 0 rgba(0,0,0,0)");
            qBorder("rgba(0,0,0,0.05)");
            qBackdrop("saturate(160%) blur(8px)");
            qY(0);
            lastY = curr;
            return;
          }

          // Direction-based hide/show
          if (!prefersReduced) {
            if (curr > lastY + 4) qY(-80); // scrolling down -> hide
            else if (curr < lastY - 4) qY(0); // scrolling up -> show
          } else {
            qY(0);
          }
          lastY = curr;

          // Elevation after small scroll
          const elevated = curr > 24;
          qBg(elevated ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)");
          qShadow(
            elevated ? "0 8px 24px rgba(0,0,0,0.08)" : "0 0 0 rgba(0,0,0,0)"
          );
          qBorder(elevated ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.05)");
          qBackdrop(
            elevated ? "saturate(160%) blur(12px)" : "saturate(160%) blur(8px)"
          );
        },
      });
    }, barRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={barRef}
      className="sticky top-0 z-40 w-full border-b border-gray-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-emerald-600" />
          <span className="text-sm font-semibold tracking-wide text-gray-900">
            MyTCAS69
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/students"
            className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-500"
          >
            เปิดตาราง
          </Link>
        </div>
      </div>
    </header>
  );
}
