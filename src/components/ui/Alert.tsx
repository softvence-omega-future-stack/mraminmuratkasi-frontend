interface AlertProps {
  type: "success" | "error" | "info";
  message: string;
  className?: string;
}

export default function Alert({ type, message, className = "" }: AlertProps) {
  const styles = {
    success: "bg-green-50 text-green-800 border-green-300",
    error: "bg-red-50 text-red-800 border-red-300",
    info: "bg-blue-50 text-blue-800 border-blue-300",
  };

  return (
    <div
      className={`border rounded-lg p-3 text-sm ${styles[type]} ${className}`}
    >
      {message}
    </div>
  );
}
