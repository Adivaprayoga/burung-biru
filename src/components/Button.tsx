import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  size?: string;
  border?: boolean;
  buttonType?: string | null | undefined;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  size,
  border,
  buttonType,
  className = "",
  ...props
}: ButtonProps) {
  const handleSize = (param: string | undefined) => {
    switch (param) {
      case "sm":
        return "w-24";
      case "lg":
        return "w-48";
      default:
        return "w-32";
    }
  };

  const handleType = (param: string | null | undefined) => {
    switch (param) {
      case "btn-unfollow":
        return "border border-gray-400 bg-white text-black hover:bg-red-100 hover:border-red-600 hover:text-red-600";
      case "btn-white":
        return "bg-white hover:bg-gray-200 text-black focus-visible:bg-gray-200";
      default:
        return "bg-sky-500 hover:bg-sky-400 text-white focus-visible:bg-sky-100";
    }
  };

  const typeclasses = handleType(buttonType);
  const sizeClasses = handleSize(size);

  return (
    <>
      <button
        className={`rounded-full py-1 font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${className} ${typeclasses} ${sizeClasses}`}
        {...props}
      ></button>
    </>
  );
}
