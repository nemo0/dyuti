"use client";

import React from "react";
import { CircleDotDashed, Dot, MoveRight } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const inputSchema = z.object({
  business_name: z
    .string()
    .min(3, {
      message: "Business name must be at least 3 characters",
    })
    .max(255, {
      message: "Business name must be less than 255 characters",
    }),
  business_address: z
    .string()
    .min(3, {
      message: "Business address must be at least 3 characters",
    })
    .max(255, {
      message: "Business address must be less than 255 characters",
    }),
  phone: z
    .string()
    .min(3, {
      message: "Phone must be at least 3 characters",
    })
    .max(255, {
      message: "Phone must be less than 255 characters",
    }),
  email: z
    .string()
    .email({
      message: "Input must be a valid email",
    })
    .min(3, {
      message: "Email must be at least 3 characters",
    })
    .max(255, {
      message: "Email must be less than 255 characters",
    }),
  website: z
    .string()
    .url({
      message: "Input must be a valid URL",
    })
    .min(3, {
      message: "Website must be at least 3 characters",
    })
    .max(255, {
      message: "Website must be less than 255 characters",
    }),
});

type Inputs = z.infer<typeof inputSchema>;

export default function Onboarding() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xl mx-auto">
        <div className="relative w-full mt-4">
          <input
            type="text"
            className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("business_name")}
          />
          <label
            htmlFor="business_name"
            className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
          >
            Your Business Name
          </label>
        </div>
        {errors.business_name && (
          <div className="text-red-500 text-xs mt-2 inline-flex items-center">
            <span className=" animate-ping">
              <Dot color="rgb(239 68 68)" size="1rem" />
            </span>
            {errors.business_name?.message ?? "This field is required"}
          </div>
        )}

        <div className="relative w-full mt-4">
          <textarea
            className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("business_address", { required: true })}
          />
          <label
            htmlFor="business_address"
            className="absolute text-sm top-[10%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
          >
            Your Business Address
          </label>
        </div>
        {errors.business_address && (
          <div className="text-red-500 text-xs mt-2 inline-flex items-center">
            <span className=" animate-ping">
              <Dot color="rgb(239 68 68)" size="1rem" />
            </span>
            {errors.business_address?.message ?? "This field is required"}
          </div>
        )}

        <div className="relative w-full mt-4">
          <input
            type="number"
            className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("phone", { required: true })}
          />
          <label
            htmlFor="phone"
            className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
          >
            Your Business Phone
          </label>
        </div>
        {errors.phone && (
          <div className="text-red-500 text-xs mt-2 inline-flex items-center">
            <span className=" animate-ping">
              <Dot color="rgb(239 68 68)" size="1rem" />
            </span>
            {errors.phone?.message ?? "This field is required"}
          </div>
        )}

        <div className="relative w-full mt-4">
          <input
            type="email"
            className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("email", { required: true })}
          />
          <label
            htmlFor="email"
            className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
          >
            Your Business Email
          </label>
        </div>
        {errors.email && (
          <div className="text-red-500 text-xs mt-2 inline-flex items-center">
            <span className=" animate-ping">
              <Dot color="rgb(239 68 68)" size="1rem" />
            </span>
            {errors.email?.message ?? "This field is required"}
          </div>
        )}

        <div className="relative w-full mt-4">
          <input
            type="text"
            className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("website", { required: true })}
          />
          <label
            htmlFor="website"
            className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
          >
            Your Business Website
          </label>
        </div>
        {errors.website && (
          <div className="text-red-500 text-xs mt-2 inline-flex items-center">
            <span className=" animate-ping">
              <Dot color="rgb(239 68 68)" size="1rem" />
            </span>
            {errors.website?.message ?? "This field is required"}
          </div>
        )}
        <button
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-md mt-4 w-full transition-all duration-300 inline-flex items-center group justify-center"
          type="submit"
        >
          Save
          <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
            <MoveRight color="#fff" size="1em" />
          </span>
        </button>
      </div>
    </form>
  );
}
