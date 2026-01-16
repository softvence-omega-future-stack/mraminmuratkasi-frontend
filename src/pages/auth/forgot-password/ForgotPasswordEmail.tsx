import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/api/authApi";

export default function ForgotPasswordEmail() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const response = await forgotPassword({ email }).unwrap();
      // Supporting multiple possible token field names from backend
      // Added response?.body?.token based on provided API response structure
      const token = response?.body?.token || response?.token || response?.data?.token || response?.data?.approvalToken || response?.approvalToken;
      navigate("/forgot-password/verify", { state: { email, token } });
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#1878B5] mb-2">
          Forget password!
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Please enter your email to receive a confirmation code
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-gray-900 text-base font-semibold mb-2">
              Email
            </p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                className={`pl-10 py-6 ${
                  error ? "border border-[#FE1B1B] bg-[#FFECE6]" : ""
                }`}
              />
            </div>
          </div>

          {error && (
            <div className="flex justify-between bg-[#FFECE6] rounded-md transition-all">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">
                  Error
                </p>
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
            disabled={isLoading}
            className="w-full bg-[#1878B5] py-5 cursor-pointer hover:bg-[#1878D9] font-semibold"
          >
            {isLoading ? "Sending..." : "Send Code"}
          </Button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="w-full text-center text-[#1878B5] hover:underline text-sm font-medium mt-4 cursor-pointer"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
