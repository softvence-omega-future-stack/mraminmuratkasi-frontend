
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/public/images/authLogo.png";
import { Lock, Eye, EyeOff, X, CarFront, Phone } from "lucide-react";

export default function ClientSignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    licensePlate: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.phone.trim()) newErrors.phone = "required";
    if (!formData.licensePlate.trim()) newErrors.licensePlate = "required";
    if (!formData.password) newErrors.password = "required";

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

    // simulate login failure
    setTimeout(() => {
      setSubmitError(true);
      setLoading(false);
    }, 800);
  };

  const errorInputStyle = "border border-[#FE1B1B] bg-[#FFECE6]";

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-[545px] w-full p-14">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" />
        </div>

        <h1 className="text-3xl font-bold text-center text-[#1878B5] my-8">
          Sign In
        </h1>

        {/* Error Section */}
        {submitError && (
          <div className="flex justify-between items-start bg-[#FFECE6] rounded-md mb-6">
            <div className="px-4 py-3">
              <p className="text-[#FE1B1B] font-semibold">Failed to sign in</p>
              <p className="text-[#FE1B1B] text-sm">
                Please check your credential & try again.
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
          {/* Phone */}
          <div>
            <p className="text-gray-900 text-base font-semibold mb-2">
              Phone Number
            </p>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1878B5] w-5 h-5" />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`pl-10 py-6 ${errors.phone ? errorInputStyle : ""}`}
              />
            </div>
          </div>

          {/* License Plate */}
          <div>
            <p className="text-gray-900 text-base font-semibold mb-2">
              Car License Plate Number
            </p>
            <div className="relative">
              <CarFront className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1878B5] w-5 h-5" />
              <Input
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                placeholder="Enter license plate number"
                className={`pl-10 py-6 ${
                  errors.licensePlate ? errorInputStyle : ""
                }`}
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
              className="text-[#1878B5] hover:underline text-sm font-medium -mt-4 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1878B5] py-5 rounded-[6px] hover:bg-[#1878D9] cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-[#90969A] text-sm mt-4">
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
