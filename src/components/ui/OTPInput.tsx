import type React from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function OTPInput({
  value,
  onChange,
  length = 6,
}: OTPInputProps) {
  const inputs = Array.from({ length });

  const handleChange = (index: number, val: string) => {
    // Only allow digits
    const digit = val.slice(-1);
    if (digit && !/^\d$/.test(digit)) return;

    const newValue = value.split("");
    // If val is empty, it means we are deleting (but backspace is handled in keydown too)
    newValue[index] = digit;
    const finalValue = newValue.join("").slice(0, length);
    onChange(finalValue);

    // Auto-focus next
    if (digit && index < length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(data)) {
      onChange(data);
      // Focus last filled or next
      const nextIndex = Math.min(data.length, length - 1);
      document.getElementById(`otp-${nextIndex}`)?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {inputs.map((_, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-12 text-center text-xl font-bold rounded-md border border-gray-300 focus:outline-none focus:border-[#1878B5] bg-gray-50 focus:bg-white transition-all shadow-sm"
          )}
        />
      ))}
    </div>
  );
}
