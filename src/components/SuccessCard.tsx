"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CalendarHeart, Clock, Heart, MessageCircleHeart } from "lucide-react";

interface SuccessCardProps {
  date: string;
  time: string;
  message: string;
}

export default function SuccessCard({ date, time, message }: SuccessCardProps) {
  useEffect(() => {
    // Fire confetti on mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffc0cb', '#ff69b4']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffc0cb', '#ff69b4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  // Format date nicely
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      className="glass-card rounded-3xl p-8 max-w-md w-full mx-4 relative overflow-hidden text-center"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-300/20 to-rose-300/20 pointer-events-none"></div>
      
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex justify-center mb-6"
      >
        <Heart className="w-20 h-20 text-rose-500 fill-rose-500" />
      </motion.div>

      <h2 className="text-4xl font-extrabold text-pink-600 dark:text-pink-400 mb-8">
        ❤️ Date Confirmed ❤️
      </h2>

      <div className="space-y-4 text-left bg-white/40 dark:bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-pink-100 dark:border-pink-900/50">
        <div className="flex items-start gap-3">
          <CalendarHeart className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
          <div>
            <p className="text-sm text-pink-700 dark:text-pink-300 font-semibold uppercase tracking-wider">Date</p>
            <p className="text-lg text-pink-950 dark:text-pink-50 font-medium">{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
          <div>
            <p className="text-sm text-pink-700 dark:text-pink-300 font-semibold uppercase tracking-wider">Time</p>
            <p className="text-lg text-pink-950 dark:text-pink-50 font-medium">{time}</p>
          </div>
        </div>

        {message && (
          <div className="flex items-start gap-3">
            <MessageCircleHeart className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
            <div>
              <p className="text-sm text-pink-700 dark:text-pink-300 font-semibold uppercase tracking-wider">Message</p>
              <p className="text-lg text-pink-950 dark:text-pink-50 font-medium italic">&quot;{message}&quot;</p>
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-8 text-pink-800 dark:text-pink-200 font-medium animate-pulse">
        Can&apos;t wait to see you! 🥰
      </p>
    </motion.div>
  );
}
