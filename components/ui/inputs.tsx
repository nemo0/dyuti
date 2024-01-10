import { Dot } from "lucide-react";
import { FieldError, useFormContext } from "react-hook-form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: FieldError | undefined;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  error,
  ...props
}) => {
  const { register } = useFormContext();

  return (
    <div className="relative w-full mt-4">
      <input
        id={name}
        {...register(name)}
        className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        {...props}
      />
      <label
        htmlFor={name}
        className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
      >
        {label}
      </label>
      {error && (
        <div className="text-red-500 text-xs mt-2 inline-flex items-center">
          <span className="animate-ping">
            <Dot color="rgb(239 68 68)" size="1rem" />
          </span>
          {error.message ?? "This field is required"}
        </div>
      )}
    </div>
  );
};

interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  error?: FieldError | undefined;
}

export const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  name,
  label,
  error,
  ...props
}) => {
  const { register } = useFormContext();

  return (
    <>
      <div className="relative w-full mt-4">
        <textarea
          {...register(name, { required: true })}
          id={name}
          className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          {...props}
        />
        <label
          htmlFor={name}
          className="absolute text-sm top-[10%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
        >
          {label}
        </label>
      </div>
      {error && (
        <div className="text-red-500 text-xs mt-2 inline-flex items-center">
          <span className="animate-ping">
            {/* Here, replace <Dot> with your error icon component */}
            <Dot color="rgb(239 68 68)" size="1rem" />
          </span>
          {error.message ?? "This field is required"}
        </div>
      )}
    </>
  );
};

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: FieldError | undefined;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  label,
  options,
  error,
  ...props
}) => {
  const { register } = useFormContext();

  return (
    <div className="relative w-full mt-4">
      <select
        id={name}
        {...register(name)}
        className="block px-2.5 py-2.5 w-full dark:bg-slate-950 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        {...props}
      >
        <option value="" disabled hidden selected>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="absolute text-sm top-[15%] scale-95 -translate-y-4 start-1 bg-white dark:bg-slate-950 px-2"
      >
        {label}
      </label>
      {error && (
        <div className="text-red-500 text-xs mt-2 inline-flex items-center">
          <span className="animate-ping">
            {/* Replace <Dot> with your error icon component */}
            <Dot color="rgb(239 68 68)" size="1rem" />
          </span>
          {error.message ?? "This field is required"}
        </div>
      )}
    </div>
  );
};
