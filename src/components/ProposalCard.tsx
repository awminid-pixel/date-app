"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ProposalCardProps {
  onYes: () => void;
}

export default function ProposalCard({ onYes }: ProposalCardProps) {
  const [noPosition, setNoPosition] = useState<{ top?: number; left?: number; fixed: boolean }>({ fixed: false });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize button position measurements
  useEffect(() => {
    // We don't want it fixed initially so it sits nicely next to the YES button
  }, []);

  const moveNoButton = (e: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation();

    // Calculate a random position that keeps the button within the viewport
    const buttonWidth = noButtonRef.current?.offsetWidth || 100;
    const buttonHeight = noButtonRef.current?.offsetHeight || 50;

    // Use a safe margin from the edges
    const margin = 20;
    
    // Ensure the random position is strictly within the visible area
    const maxX = window.innerWidth - buttonWidth - margin;
    const maxY = window.innerHeight - buttonHeight - margin;

    const randomX = Math.max(margin, Math.floor(Math.random() * maxX));
    const randomY = Math.max(margin, Math.floor(Math.random() * maxY));

    setNoPosition({
      top: randomY,
      left: randomX,
      fixed: true,
    });
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="glass-card rounded-3xl p-8 max-w-md w-full mx-4 flex flex-col items-center text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-6 relative w-48 h-48"
      >
        <Image
          src="/bear-love.svg"
          alt="Cute Bear"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 dark:text-pink-400 mb-4 tracking-tight text-balance">
        Will you go on a date with me?
      </h1>
      
      <p className="text-lg text-pink-800/70 dark:text-pink-200/70 mb-8 font-medium">
        Please choose carefully ❤️
      </p>

      <div className="flex flex-row items-center justify-center gap-4 w-full relative min-h-[60px]">
        <button
          onClick={onYes}
          className="px-8 py-3 rounded-full text-white font-bold text-lg bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:scale-110 active:scale-95"
        >
          YES
        </button>

        <button
          ref={noButtonRef}
          onPointerDown={moveNoButton}
          onMouseEnter={(e) => {
             // For desktop users, moving the mouse over the button can also trigger the move
             // To make it extra elusive!
             if (window.matchMedia("(pointer: fine)").matches) {
               moveNoButton(e);
             }
          }}
          className={`px-8 py-3 rounded-full text-pink-900 dark:text-pink-100 font-bold text-lg bg-pink-100 dark:bg-pink-900 border-2 border-pink-200 dark:border-pink-700 shadow-md transition-all ${noPosition.fixed ? 'fixed z-50' : 'relative'}`}
          style={
            noPosition.fixed
              ? {
                  top: `${noPosition.top}px`,
                  left: `${noPosition.left}px`,
                  transition: 'top 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }
              : {}
          }
        >
          NO
        </button>
      </div>
    </motion.div>
  );
}
