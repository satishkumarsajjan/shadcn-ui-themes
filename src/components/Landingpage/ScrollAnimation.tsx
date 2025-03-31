"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animationType?: "fade-up" | "fade-in" | "scale";
  delay?: 1 | 2 | 3 | 4;
}

export function ScrollAnimation({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "0px",
  animationType = "fade-up",
  delay,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Once the animation has been triggered, we disconnect the observer
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  const animationClass = `scroll-${animationType}`;
  const delayClass = delay ? `scroll-delay-${delay}` : "";

  return (
    <div ref={ref} className={`${animationClass} ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
