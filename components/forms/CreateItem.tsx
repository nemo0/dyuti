"use client";

import React from "react";
import { MoveRight, Loader } from "lucide-react";
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
  itemType: z.enum(["Product", "Service"]),
  itemName: z.string().min(3, "Name must be at least 3 characters"),
  itemUnit: z.string(),
  itemSellingPrice: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Name is required",
    })
    .min(1, "Selling price must be at least 1 characters"),
  itemDescription: z.string().optional(),
});

type Inputs = z.infer<typeof inputSchema>;

export default function CreateItemForm() {
  const methods = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
  });
  const { errors } = methods.formState;

  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/item/create", {
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

  interface ICategory {
    value: string;
    label: string;
  }

  const ops: ICategory[] = [
    { value: "USD", label: "USD" },
    { value: "CAD", label: "CAD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "AUD", label: "AUD" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Create Item</h2>
          <div className="relative w-full mt-4 px-4 py-2 rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none">
            <label className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2">
              Item Type
            </label>
            <div className="mt-1 block">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  {...methods.register("itemType")}
                  value="Product"
                  className=" text-slate-600 transition duration-100 ease-in-out"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-white">
                  Product
                </span>
              </label>
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  {...methods.register("itemType")}
                  value="Service"
                  className="h-4 w-4 text-slate-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-white">
                  Service
                </span>
              </label>
            </div>
          </div>

          <CustomInput name="itemName" label="Name" error={errors.itemName} />

          <CustomInput
            name="itemSellingPrice"
            label="Selling Price"
            error={errors.itemSellingPrice}
            type="number"
          />

          <CustomTextArea
            name="itemDescription"
            label="Description"
            error={errors.itemDescription}
          />

          <Controller
            name="itemUnit"
            control={methods.control}
            render={({ field: { onChange, value, ref } }) => (
              <ReactSelect
                name="itemUnit"
                inputRef={ref}
                label="Item Unit"
                defaultValue={ops[0].value}
                value={ops.find((op) => op.value === value)}
                error={errors.itemUnit}
                options={ops}
                onChange={(selectedOption: any) => {
                  return onChange(selectedOption.value);
                }}
              />
            )}
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
