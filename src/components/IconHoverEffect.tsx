import type { ReactNode } from "react";

type IconHoverEffectProps = {
  children: ReactNode;
  red?: boolean;
  className?: string;
};

export function IconHoverEffect({
  children,
  red = false,
  className = "",
}: IconHoverEffectProps) {
  const colorClasses = red
    ? "outline-red-400 hover:bg-red-200 group-hover-bg-red-200 group-focus-visible:bg-red-200 focus-visible:bg-red-200"
    : "outline-gray-400 hover:bg-gray-100 group-hover-bg-gray-100 group-focus-visible:bg-gray-100 focus-visible:bg-gray-100";

  return (
    <div
      className={`rounded-full ${className} transition-colors duration-200 ${colorClasses}`}
    >
      {children}
    </div>
  );
}
