import React from "react";
import Onboarding from "@/components/forms/Onboarding";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div>
        <h2 className="text-xl font-bold mb-2 text-center mt-16">
          Welcome Abroad, Hero!
        </h2>
        <div className="text-slate-500 dark:text-slate-400 space-y-2 text-center">
          <p>Let's get you started with by setting up your business details</p>
        </div>
        <Onboarding />
      </div>
    </div>
  );
}
