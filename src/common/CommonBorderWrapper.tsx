import type { ReactNode } from "react";

interface CommonBorderWrapper {
  children: ReactNode;
  className?: string;
}

const CommonBorderWrapper: React.FC<CommonBorderWrapper> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-full  p-6 rounded-2xl bg-white ${className}`}>
      {children}
    </div>
  );
};

export default CommonBorderWrapper;
