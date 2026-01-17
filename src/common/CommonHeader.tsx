import React from "react";

interface CommonHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

// Make sure the keys are not optional
const sizeClasses: Record<"xs" | "sm" | "md" | "lg" | "xl", string> = {
  xs: "text-xs leading-4",
  sm: "text-sm leading-5",
  md: "text-base leading-6 font-semibold text-[#3C3B3B]",
  lg: "text-lg leading-7",
  xl: "text-xl leading-8",
};

const CommonHeader: React.FC<CommonHeaderProps> = ({
  children,
  className = "",
  size = "lg", // default value
  ...props
}) => {
  return (
    <h2
      className={`font-inter font-medium text-[#313436] ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export default CommonHeader;
