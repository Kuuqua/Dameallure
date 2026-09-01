"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import PlaceholderPhoto from "@/components/ui/PlaceholderPhoto";

export default function HeroParallaxImage() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6]">
      <motion.div style={{ y }} className="absolute inset-0 h-[112%]">
        <PlaceholderPhoto
          seed="hero"
          width={1000}
          height={1250}
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
        />
      </motion.div>
      <div className="absolute inset-x-8 bottom-8 border-t border-gold/40 pt-4 md:inset-x-10 md:bottom-10">
        <p className="text-[11px] uppercase tracking-[0.15em] text-ivory/70">
          You tell us what you need.
        </p>
        <p className="font-display text-lg italic text-ivory/90">
          We curate the rest.
        </p>
      </div>
    </div>
  );
}
