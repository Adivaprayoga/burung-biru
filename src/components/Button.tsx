import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
  tweet?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ small, gray, className = "", ...props }: ButtonProps) {
  const sizeClasses = small ? "py-1" : "py-2 font-bold";
  const colorClasses = gray
    ? "border-gray-400 bg-white text-black border hover:bg-red-100 hover:border-red-600 hover:text-red-600 font-bold"
    : "bg-sky-500 hover:bg-sky-400 focus-visible:bg-sky-100 font-bold";

  return (
    <>
      <button
        className={`w-32 rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
        {...props}
      ></button>
    </>
  );
}
