import type React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Eye, EyeOff, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { method, value, otp } = location.state || {};

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!method || !value || !otp) navigate("/forgot-password");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.password) newErrors.password = "required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "mismatch";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#1878B5] mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className={`pl-10 pr-10 py-6 ${
                errors.password ? "border border-[#FE1B1B] bg-[#FFECE6]" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Confirm */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className={`pl-10 pr-10 py-6 ${
                errors.confirmPassword
                  ? "border border-[#FE1B1B] bg-[#FFECE6]"
                  : ""
              }`}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {errors.confirmPassword && (
            <div className="flex justify-between bg-[#FFECE6] rounded-md">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">
                  Passwords do not match
                </p>
                <p className="text-[#FE1B1B] text-sm">
                  Please check and try again.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setErrors({})}
                className="px-[18px] py-[12px]"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          <Button className="w-full bg-[#1878B5] py-5">Reset Password</Button>
        </form>
      </div>
    </div>
  );
}
