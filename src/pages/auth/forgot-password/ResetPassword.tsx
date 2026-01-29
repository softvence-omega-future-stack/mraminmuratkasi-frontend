import type React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Eye, EyeOff, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/api/authApi";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, token } = location.state || {};
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, token, navigate]);

  if (!email || !token) {
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.password) newErrors.password = "required";
    if (formData.password.length < 6) newErrors.password = "too short";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "mismatch";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await resetPassword({
        token: token,
        newPassword: formData.password
      }).unwrap();
      toast.success("Password reset successfully! Please login with your new password.");
      navigate("/client/signin");
    } catch (err: any) {
      setSubmitError(err?.data?.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#1878B5] mb-6">
          Passwort zurücksetzen
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email (Readonly) */}
          <div className="relative opacity-70">
            <Input
              value={email}
              disabled
              className="py-6 bg-gray-50 border-gray-200"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Neues Passwort"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          {/* Confirm */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Passwort bestätigen"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirm ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          {(errors.confirmPassword || submitError) && (
            <div className="flex justify-between bg-[#FFECE6] rounded-md transition-all">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">
                  Error
                </p>
                <p className="text-[#FE1B1B] text-sm">
                  {errors.confirmPassword === "mismatch" ? "Passwords do not match." : submitError}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setSubmitError("");
                }}
                className="px-4 py-2 cursor-pointer"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          <Button 
            disabled={isLoading}
            className="w-full bg-[#1878B5] py-6 hover:bg-[#1878D9] font-semibold cursor-pointer"
          >
            {isLoading ? "Zurücksetzen..." : "Passwort zurücksetzen"}
          </Button>
        </form>
      </div>
    </div>
  );
}
