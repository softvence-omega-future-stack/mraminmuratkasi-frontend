import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/public/images/authLogo.png";
import { User, Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { useCreateUserMutation } from "@/redux/api/authApi";

export default function ClientSignUp() {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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

    if (!formData.name.trim()) newErrors.name = "required";
    // if (!formData.phone.trim()) newErrors.phone = "required";
    if (!formData.email.trim()) newErrors.email = "required";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataObj = {
      name: formData.name,
      email: formData.email,
      // phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      agreedToTerms: true,
    };

    const payload = new FormData();
    payload.append("data", JSON.stringify(dataObj));

    try {
      await createUser(payload).unwrap();
      navigate("/client/signin");
    } catch (err: any) {
      setSubmitError(err?.data?.message || "Failed to sign up");
    }
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-[720px] w-full p-10 md:p-14">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </div>

        <h1 className="text-3xl font-bold text-center text-[#1878B5] my-6 md:my-8 text-[32px]">
          Jetzt registrieren
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="col-span-2">
              <p className="font-semibold mb-2">
                Name <span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Gebe deinen Namen ein"
                  className={`pl-10 py-6 ${errors.name ? errorInputStyle : ""}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-span-2">
              <p className="font-semibold mb-2">
                E-Mail Adresse<span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-Mail Adresse eingeben"
                  className={`pl-10 py-6 ${
                    errors.email ? errorInputStyle : ""
                  }`}
                />
              </div>
            </div>

            {/* Phone */}
            {/* <div className="col-span-2">
              <p className="font-semibold mb-2">Phone Number <span className="text-[#FE1B1B]">*</span></p>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`pl-10 py-6 ${
                    errors.phone ? errorInputStyle : ""
                  }`}
                />
              </div>
            </div> */}

            {/* Password */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold mb-2">
                Passwort <span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Passwort eingeben"
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
                Passwort bestätigen <span className="text-[#FE1B1B]">*</span>
              </p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1878B5]" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Passwort bestätigen"
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
            <div className="flex justify-between bg-[#FFECE6] rounded-md transition-all">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">
                  Failed to sign up
                </p>
                <p className="text-[#FE1B1B] text-sm">{submitError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitError("")}
                className="px-4 py-2 cursor-pointer"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          <Button
            disabled={isLoading}
            className="w-full bg-[#1878B5] py-5 hover:bg-[#1878D9] cursor-pointer text-base font-semibold"
          >
            {isLoading ? "Anmelden..." : "Anmelden"}
          </Button>
        </form>

        <p className="text-center text-[#90969A] text-sm mt-6">
          Ich habe ein Konto.{" "}
          <button
            onClick={() => navigate("/admin/signin")}
            className="text-[#1878B5] hover:underline font-medium cursor-pointer"
          >
            Anmelden
          </button>
        </p>
      </div>
    </div>
  );
}
