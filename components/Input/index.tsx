import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...otherProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className={`px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded text-gray-800 border h-8 outline-none ${className}`}
      {...otherProps}
    />
  );
}
