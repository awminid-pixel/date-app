"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CalendarHeart, Clock, MessageCircleHeart } from "lucide-react";

interface DateFormProps {
  onSubmit: (date: string, time: string, message: string) => void;
}

export default function DateForm({ onSubmit }: DateFormProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    setIsSubmitting(true);
    
    // We only try to send if an access key is provided, otherwise we just proceed
    if (true) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "1a5a11db-ffb0-4bb6-bdd5-88121aeb5ed0",
            subject: "New Date Request Confirmed! ❤️",
            Date: date,
            Time: time,
            Message: message || "No message provided",
          }),
        });
        
        await response.json();
      } catch (error) {
        console.error("Failed to send email", error);
      }
    }

    setIsSubmitting(false);
    onSubmit(date, time, message);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: -20 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="glass-card rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500"></div>
      
      <h2 className="text-3xl font-extrabold text-pink-600 dark:text-pink-400 mb-2 text-center">
        🎉 Yay! I knew you&apos;d say yes! 🎉
      </h2>
      <p className="text-center text-pink-800/70 dark:text-pink-200/70 mb-8 font-medium">
        Let&apos;s plan our perfect date
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-pink-900 dark:text-pink-100">
            <CalendarHeart className="w-4 h-4 text-pink-500" />
            Pick a Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-pink-800 bg-white/50 dark:bg-pink-950/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-pink-900 dark:text-pink-100"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-pink-900 dark:text-pink-100">
            <Clock className="w-4 h-4 text-pink-500" />
            Pick a Time
          </label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-pink-800 bg-white/50 dark:bg-pink-950/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-pink-900 dark:text-pink-100"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-pink-900 dark:text-pink-100">
            <MessageCircleHeart className="w-4 h-4 text-pink-500" />
            Anything you&apos;d like to do? (Optional)
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., Let's get sushi! 🍣"
            className="w-full px-4 py-3 rounded-xl border border-pink-200 dark:border-pink-800 bg-white/50 dark:bg-pink-950/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all resize-none text-pink-900 dark:text-pink-100 placeholder:text-pink-300 dark:placeholder:text-pink-700"
          />
        </div>

        <button
          type="submit"
          disabled={!date || !time || isSubmitting}
          className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-pink-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed mt-4 flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Confirm Date"
          )}
        </button>
      </form>
    </motion.div>
  );
}
