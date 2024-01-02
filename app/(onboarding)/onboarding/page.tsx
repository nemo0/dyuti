import React from "react";
import Illustration from "@/public/images/bg-illustration.svg";
import Image from "next/image";
import QuoteTitle from "@/components/quote-title";
import { ArrowBigRight, MoveRight } from "lucide-react";

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
        <div className="max-w-xl mx-auto">
          <div className="relative w-full mt-4">
            <input
              type="text"
              className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="business_name"
              className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
            >
              Your Business Name
            </label>
          </div>

          <div className="relative w-full mt-4">
            <textarea
              className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="business_address"
              className="absolute text-sm top-[10%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
            >
              Your Business Address
            </label>
          </div>

          <div className="relative w-full mt-4">
            <input
              type="number"
              className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
            >
              Your Business Phone
            </label>
          </div>

          <div className="relative w-full mt-4">
            <input
              type="email"
              className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
            >
              Your Business Email
            </label>
          </div>

          <div className="relative w-full mt-4">
            <input
              type="text"
              className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="website"
              className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
            >
              Your Business Website
            </label>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-md mt-4 w-full transition-all duration-300 inline-flex items-center group justify-center">
            Save
            <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
              <MoveRight color="#fff" size="1em" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
