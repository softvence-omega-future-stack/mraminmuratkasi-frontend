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
    if (!/^\d?$/.test(val)) return;

    const newValue = value.split("");
    newValue[index] = val;
    const finalValue = newValue.join("").slice(0, length);

    onChange(finalValue);

    if (val && index < length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
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
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          className={cn(
            "w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-300 focus:outline-none focus:border-[#1878B5]"
          )}
        />
      ))}
    </div>
  );
}
