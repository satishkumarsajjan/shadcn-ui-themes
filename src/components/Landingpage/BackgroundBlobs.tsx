'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

// Blob component with animation
interface BlobProps {
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  isDark?: boolean;
}

export function BackgroundBlobs() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <div className='fixed inset-0 -z-50 h-full w-full overflow-hidden'>
      {/* First layer of blobs - deeper in background */}
      <Blob
        className={`absolute left-[10%] top-[15%] h-[400px] w-[400px] rounded-full opacity-10 blur-[100px] ${
          isDark ? 'bg-indigo-600' : 'bg-blue-200'
        }`}
        duration={60}
        x={80}
        y={50}
        delay={0}
        isDark={isDark}
      />
      <Blob
        className={`absolute right-[15%] top-[45%] h-[300px] w-[300px] rounded-full opacity-10 blur-[100px] ${
          isDark ? 'bg-violet-700' : 'bg-violet-200'
        }`}
        duration={55}
        x={-60}
        y={40}
        delay={2}
        isDark={isDark}
      />
      <Blob
        className={`absolute bottom-[15%] left-[25%] h-[350px] w-[350px] rounded-full opacity-10 blur-[120px] ${
          isDark ? 'bg-cyan-600' : 'bg-cyan-200'
        }`}
        duration={65}
        x={60}
        y={-60}
        delay={5}
        isDark={isDark}
      />

      {/* Custom noise texture */}
      <div
        className='absolute inset-0 z-10 opacity-20 mix-blend-overlay'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
        }}
      />
    </div>
  );
}

function Blob({
  className,
  delay = 0,
  duration = 40,
  x = 50,
  y = 50,
  scale = 1,
  isDark,
}: BlobProps) {
  // Random movement animation
  const animate = {
    x: [0, x, 0, -x / 2, 0],
    y: [0, y, -y, y / 2, 0],
    scale: [1, scale, 1, scale * 0.9, 1],
    rotateZ: [0, 10, -5, 15, 0],
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        ...animate,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      style={{
        filter: isDark ? 'hue-rotate(10deg) saturate(1.2)' : 'none',
      }}
    />
  );
}
