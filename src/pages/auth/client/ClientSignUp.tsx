import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/public/images/authLogo.png";
import { User, Mail, Lock, Eye, EyeOff, X } from "lucide-react";

export default function ClientSignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    licensePlate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const errorInputStyle = "border border-[#FE1B1B] bg-[#FFECE6]";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "required";
    if (!formData.phone.trim()) newErrors.phone = "required";
    if (!formData.licensePlate.trim()) newErrors.licensePlate = "required";
    if (!formData.password) newErrors.password = "required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "required";

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "mismatch";
      setSubmitError("Password and Confirm Password do not match.");
    } else {
      setSubmitError("");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setSubmitError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-[720px] w-full p-14">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" />
        </div>

        <h1 className="text-3xl font-bold text-center text-[#1878B5] my-8">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="col-span-2">
              <p className="font-semibold mb-2">
                Full Name <span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={`pl-10 py-6 ${
                    errors.fullName ? errorInputStyle : ""
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-span-2">
              <p className="font-semibold mb-2">Email Address <span className="text-[#FE1B1B]">*</span></p>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={`pl-10 py-6 ${
                    errors.email ? errorInputStyle : ""
                  }`}
                />
              </div>
            </div>

            {/* License Plate */}
            {/* <div className="col-span-2 md:col-span-1">
              <p className="font-semibold mb-2">
                Car License Plate Number <span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
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
            </div> */}

            {/* Password */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold mb-2">
                Password <span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold mb-2">
                Confirm Password <span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`pl-10 pr-10 py-6 ${
                    errors.confirmPassword ? errorInputStyle : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="flex justify-between bg-[#FFECE6] rounded-md">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">
                  Failed to sign up
                </p>
                <p className="text-[#FE1B1B] text-sm">{submitError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitError("")}
                className="px-[18px] py-[12px]"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          <Button className="w-full bg-[#1878B5] py-5 hover:bg-[#1878D9] cursor-pointer">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-[#90969A] text-sm mt-4">
          I have an account.{" "}
          <button
            onClick={() => navigate("/admin/signin")}
            className="text-[#1878B5] hover:underline font-medium cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
