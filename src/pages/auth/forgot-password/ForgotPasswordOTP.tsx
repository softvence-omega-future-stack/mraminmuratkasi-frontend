import type React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import OTPInput from "@/components/ui/OTPInput";

export default function ForgotPasswordOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { method, value } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!method || !value) navigate("/forgot-password");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigate("/reset-password", { state: { method, value, otp } });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#1878B5] mb-1">
          Enter the confirmation code
        </h1>
        <p className="text-center mb-6 md:px-12 text-gray-700">
          Verification code has been sent to your email ***abcd@gmai.com
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <OTPInput value={otp} onChange={setOtp} />

          {error && (
            <div className="flex justify-between bg-[#FFECE6] rounded-md">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">Invalid code</p>
                <p className="text-[#FE1B1B] text-sm">
                  Please enter the 6-digit code.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setError(false)}
                className="px-[18px] py-[12px] cursor-pointer"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          <Button className="w-full bg-[#1878B5] hover:bg-[#1878D9] py-5 cursor-pointer">
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-[#1878B5] hover:underline text-sm font-medium cursor-pointer"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}
