"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Background from "@/components/Background";
import ProposalCard from "@/components/ProposalCard";
import DateForm from "@/components/DateForm";
import SuccessCard from "@/components/SuccessCard";

export default function Home() {
  const [step, setStep] = useState<"proposal" | "form" | "success">("proposal");
  const [dateDetails, setDateDetails] = useState({ date: "", time: "", message: "" });

  const handleYes = () => {
    setStep("form");
  };

  const handleFormSubmit = (date: string, time: string, message: string) => {
    setDateDetails({ date, time, message });
    setStep("success");
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      <Background />
      
      <AnimatePresence mode="wait">
        {step === "proposal" && (
          <ProposalCard key="proposal" onYes={handleYes} />
        )}
        
        {step === "form" && (
          <DateForm key="form" onSubmit={handleFormSubmit} />
        )}
        
        {step === "success" && (
          <SuccessCard 
            key="success" 
            date={dateDetails.date} 
            time={dateDetails.time} 
            message={dateDetails.message} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
