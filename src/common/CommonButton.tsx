import React, { type ReactNode } from "react";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}) => {
  // Set background color based on variant
  const variantClasses =
    variant === "primary"
      ? "bg-[#1878B5] text-white"
      : "bg-[#F1F2F2] text-black";

  return (
    <button
      type={type}
      className={` px-4 sm:px-6 py-2 flex-shrink-0 rounded-full font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
