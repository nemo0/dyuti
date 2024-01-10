"use client";

import React from "react";
import { MoveRight, Loader } from "lucide-react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { CustomInput, CustomTextArea } from "../ui/inputs";

const inputSchema = z.object({
  businessName: z
    .string()
    .min(3, {
      message: "Business name must be at least 3 characters",
    })
    .max(255, {
      message: "Business name must be less than 255 characters",
    }),
  businessAddress: z
    .string()
    .min(3, {
      message: "Business address must be at least 3 characters",
    })
    .max(255, {
      message: "Business address must be less than 255 characters",
    }),
  businessPhone: z
    .string()
    .min(3, {
      message: "Phone must be at least 3 characters",
    })
    .max(255, {
      message: "Phone must be less than 255 characters",
    }),
  businessEmail: z
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
  businessWebsite: z
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
  const methods = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
  });
  const { errors } = methods.formState;

  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/business/create", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) toast.error(json.message);

      toast.success(json.message);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="max-w-xl mx-auto">
          <CustomInput
            name="businessName"
            label="Your Business Name"
            error={errors.businessName}
          />

          <CustomTextArea
            name="businessAddress"
            label="Your Business Address"
            error={errors.businessAddress}
          />

          <CustomInput
            name="businessPhone"
            label="Your Business Phone"
            error={errors.businessPhone}
          />

          <CustomInput
            name="businessEmail"
            label="Your Business Email"
            error={errors.businessEmail}
          />

          <CustomInput
            name="businessWebsite"
            label="Your Business Website"
            error={errors.businessWebsite}
          />

          <button
            className={`bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-md mt-4 w-full transition-all duration-300 inline-flex items-center group justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader
                  size="1em"
                  className="animate-spin duration-300 text-blue-500"
                />
                <span className="tracking-normal text-blue-500 ml-2">
                  Saving...
                </span>
              </>
            ) : (
              <>
                Save
                <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                  <MoveRight color="#fff" size="1em" />
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
