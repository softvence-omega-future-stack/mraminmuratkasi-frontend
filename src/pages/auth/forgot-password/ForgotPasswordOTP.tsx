import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import OTPInput from "@/components/ui/OTPInput";
import { useVerifyOTPMutation, useResendOTPMutation } from "@/redux/api/authApi";

export default function ForgotPasswordOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, token } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: isResending }] = useResendOTPMutation();

  useEffect(() => {
    if (!email || !token) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, token, navigate]);

  if (!email || !token) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    try {
      await verifyOTP({ 
        token: token, 
        receivedOTP: Number(otp),
        passwordChange:true
      }).unwrap();
      navigate("/reset-password", { state: { email, token } });
    } catch (err: any) {
      setError(err?.data?.message || "Invalid or expired OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      const resp = await resendOTP({ resendOTPtoken: token }).unwrap();
      // If resend returns a new token, we might need to update it
      const newToken = resp?.data?.approvalToken || resp?.approvalToken;
      if (newToken) {
        navigate(location.pathname, { state: { email, token: newToken }, replace: true });
      }
      setError("");
      alert("OTP Resent successfully!");
    } catch (err: any) {
      setError(err?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#1878B5] mb-1">
          Enter the confirmation code
        </h1>
        <p className="text-center mb-6 md:px-12 text-gray-700">
          Verification code has been sent to your email {email}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <OTPInput value={otp} onChange={setOtp} />

          {error && (
            <div className="flex justify-between bg-[#FFECE6] rounded-md transition-all">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">Error</p>
                <p className="text-[#FE1B1B] text-sm">
                  {error}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setError("")}
                className="px-4 py-2 cursor-pointer"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          <Button 
            disabled={isVerifying}
            className="w-full bg-[#1878B5] hover:bg-[#1878D9] py-5 cursor-pointer font-semibold"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            disabled={isResending}
            onClick={handleResend}
            className="text-[#1878B5] hover:underline text-sm font-medium cursor-pointer disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
}
