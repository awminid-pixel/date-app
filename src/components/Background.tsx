"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; delay: number; duration: number; animX: number; animRotate: number }[]>([]);

  useEffect(() => {
    // Generate hearts on client side to avoid hydration mismatch
    const generatedHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      size: Math.random() * 20 + 10, // 10 to 30px
      delay: Math.random() * 5, // 0 to 5s delay
      duration: Math.random() * 10 + 10, // 10 to 20s duration
      animX: Math.random() * 50 - 25,
      animRotate: Math.random() * 360,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore - Ignoring custom react compiler rule for now
    setHearts(generatedHearts);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 transition-colors duration-1000"></div>
      
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px] text-pink-300/50 dark:text-pink-600/30"
          style={{ 
            left: `${heart.left}%`,
            fontSize: heart.size 
          }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, heart.animX, 0],
            rotate: [0, heart.animRotate],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
