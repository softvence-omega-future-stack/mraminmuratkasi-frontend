
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "/public/images/authLogo.png";
import { Lock, Mail, Eye, EyeOff, X } from "lucide-react";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    setSubmitError(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulate login failure for demonstration
    setTimeout(() => {
      setSubmitError(true);
      setLoading(false);
    }, 800);
  };

  const errorInputStyle = "border border-[#FE1B1B] bg-[#FFECE6]";

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" />
        </div>

        <h1 className="text-3xl font-bold text-center text-[#1878B5] mb-8">
          Sign In
        </h1>

        {/* Submit Error */}
        {submitError && (
          <div className="flex justify-between items-start bg-[#FFECE6] rounded-md mb-6">
            <div className="px-4 py-3">
              <p className="text-[#FE1B1B] font-semibold">Failed to sign in</p>
              <p className="text-[#FE1B1B] text-sm">
                Please check your credentials & try again.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitError(false)}
              className="px-[18px] py-[12px] cursor-pointer"
            >
              <X className="w-4 h-4 text-[#FE1B1B]" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <p className="text-gray-900 text-base font-semibold mb-2">Email</p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1878B5] w-5 h-5" />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`pl-10 py-6 ${errors.email ? errorInputStyle : ""}`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <p className="text-gray-900 text-base font-semibold mb-2">
              Password
            </p>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1878B5] w-5 h-5" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`pl-10 pr-10 py-6 ${
                  errors.password ? errorInputStyle : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[#1878B5] hover:underline text-sm font-medium cursor-pointer -mt-4"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1878B5] py-5 rounded-[6px] hover:bg-[#1878D9] cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Sign up */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/client/signup")}
            className="text-[#1878B5] hover:underline font-medium cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
