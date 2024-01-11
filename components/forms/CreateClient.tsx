"use client";

import React, { useEffect } from "react";
import { MoveRight, Loader, Recycle } from "lucide-react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
  ReactSelect,
} from "../ui/inputs";

const inputSchema = z.object({
  customerType: z.enum(["Business", "Individual"]),
  primaryContact: z.string().optional(),
  companyName: z.string().optional(),
  customerDisplayName: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters"),
  currency: z.string().optional(),
  customerEmail: z.union([z.string().email(), z.string().optional()]),
  customerPhone: z.string().optional(),
  customerBillingAddress: z.string().optional(),
  customerBillingCity: z.string().optional(),
  customerBillingState: z.string().optional(),
  customerBillingZip: z.string().optional(),
  customerShippingAddress: z.string().optional(),
  customerShippingCity: z.string().optional(),
  customerShippingState: z.string().optional(),
  customerShippingZip: z.string().optional(),
});

type Inputs = z.infer<typeof inputSchema>;

export default function CreateClientForm() {
  const methods = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
  });
  const { errors } = methods.formState;

  const [loading, setLoading] = React.useState(false);
  const [copyBillingAddress, setCopyBillingAddress] = React.useState(false);
  const [billingAddress, setBillingAddress] = React.useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Copy billing address to shipping address
  useEffect(() => {
    if (copyBillingAddress) {
      methods.setValue("customerShippingAddress", billingAddress.address);
      methods.setValue("customerShippingCity", billingAddress.city);
      methods.setValue("customerShippingState", billingAddress.state);
      methods.setValue("customerShippingZip", billingAddress.zip);
    } else {
      methods.setValue("customerShippingAddress", "");
      methods.setValue("customerShippingCity", "");
      methods.setValue("customerShippingState", "");
      methods.setValue("customerShippingZip", "");
    }
  }, [copyBillingAddress]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/client/create", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) toast.error(json.message);

      console.log(data);

      toast.success(json.message);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setLoading(false);
    }
  };

  const ops = [
    { value: "USD", label: "USD" }, // United States Dollar
    { value: "EUR", label: "EUR" }, // Euro
    { value: "JPY", label: "JPY" }, // Japanese Yen
    { value: "GBP", label: "GBP" }, // British Pound Sterling
    { value: "AUD", label: "AUD" }, // Australian Dollar
    { value: "CAD", label: "CAD" }, // Canadian Dollar
    { value: "CHF", label: "CHF" }, // Swiss Franc
    { value: "CNY", label: "CNY" }, // Chinese Yuan
    { value: "HKD", label: "HKD" }, // Hong Kong Dollar
    { value: "INR", label: "INR" }, // Indian Rupee
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Create Client</h2>
          <h5 className="text-md font-semibold text-slate-900 dark:text-white mt-8">
            Customer Information
          </h5>
          <div className="relative w-full mt-4 px-4 py-2 rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none">
            <label className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2">
              Customer Type
            </label>
            <div className="mt-1 block">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  {...methods.register("customerType")}
                  value="Business"
                  className=" text-slate-600 transition duration-100 ease-in-out"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-white">
                  Business
                </span>
              </label>
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  {...methods.register("customerType")}
                  value="Individual"
                  defaultChecked
                  className="h-4 w-4 text-slate-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-white">
                  Individual
                </span>
              </label>
            </div>
          </div>

          <CustomInput
            name="primaryContact"
            label="Primary Contact"
            error={errors.primaryContact}
            // placeholder="Enter Primary Contact"
          />

          <CustomInput
            name="companyName"
            label="Company Name"
            error={errors.companyName}
            // placeholder="Enter Company Name"
          />

          <CustomInput
            name="customerDisplayName"
            label="Customer Display Name"
            error={errors.customerDisplayName}
            // placeholder="Enter Customer Display Name"
          />

          <CustomInput
            name="customerEmail"
            label="Customer Email"
            error={errors.customerEmail}
            type="email"
            // placeholder="Enter Customer Email"
          />

          {/* <CustomSelect
            name="currency"
            label="Currency"
            error={errors.currency}
            options={[
              { value: "USD", label: "USD" },
              { value: "CAD", label: "CAD" },
              { value: "EUR", label: "EUR" },
              { value: "GBP", label: "GBP" },
              { value: "AUD", label: "AUD" },
            ]}
          /> */}

          <Controller
            name="currency"
            control={methods.control}
            render={({ field: { onChange, value, ref } }) => (
              <ReactSelect
                name="itemUnit"
                inputRef={ref}
                label="Item Unit"
                defaultValue={ops[0].value}
                value={ops.find((op) => op.value === value)}
                error={errors.currency}
                options={ops}
                onChange={(selectedOption: any) => {
                  return onChange(selectedOption.value);
                }}
              />
            )}
          />

          <CustomInput
            name="customerPhone"
            label="Customer Phone"
            error={errors.customerPhone}
            type="number"
            // placeholder="Enter Customer Email"
          />

          <h5 className="text-md font-semibold text-slate-900 dark:text-white mt-8">
            Customer Address
          </h5>

          <h6 className="text-base font-normal text-slate-700 dark:text-slate-400 mt-4">
            Billing Address
          </h6>

          <CustomTextArea
            name="customerBillingAddress"
            label="Customer Address"
            error={errors.customerBillingAddress}
            // placeholder="Enter Customer Address"
            onChange={(e) => {
              setBillingAddress({
                ...billingAddress,
                address: e.target.value,
              });
            }}
          />

          <CustomInput
            name="customerBillingCity"
            label="Customer City"
            error={errors.customerBillingCity}
            // placeholder="Enter Customer City"
            onChange={(e) => {
              setBillingAddress({
                ...billingAddress,
                city: e.target.value,
              });
            }}
          />

          <CustomInput
            name="customerBillingState"
            label="Customer State"
            error={errors.customerBillingState}
            // placeholder="Enter Customer State"
            onChange={(e) => {
              setBillingAddress({
                ...billingAddress,
                state: e.target.value,
              });
            }}
          />

          <CustomInput
            name="customerBillingZip"
            label="Customer Zip"
            type="number"
            error={errors.customerBillingZip}
            onChange={(e) => {
              setBillingAddress({
                ...billingAddress,
                zip: e.target.value,
              });
            }}
          />

          <h6 className="text-base font-normal text-slate-700 dark:text-slate-400 mt-4 flex justify-between">
            Shipping Address
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-slate-600 rounded-sm outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                  checked={copyBillingAddress}
                  onChange={() => setCopyBillingAddress(!copyBillingAddress)}
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-white">
                  Copy Billing Address
                </span>
              </label>
            </div>
          </h6>

          <CustomTextArea
            name="customerShippingAddress"
            label="Customer Address"
            error={errors.customerShippingAddress}
            // placeholder="Enter Customer Address"
          />

          <CustomInput
            name="customerShippingCity"
            label="Customer City"
            error={errors.customerShippingCity}
            // placeholder="Enter Customer City"
            defaultValue={copyBillingAddress ? billingAddress.city : ""}
          />

          <CustomInput
            name="customerShippingState"
            label="Customer State"
            error={errors.customerShippingState}
            // placeholder="Enter Customer State"
            defaultValue={copyBillingAddress ? billingAddress.state : ""}
          />

          <CustomInput
            name="customerShippingZip"
            label="Customer Zip"
            type="number"
            error={errors.customerShippingZip}
            defaultValue={copyBillingAddress ? billingAddress.zip : ""}
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
