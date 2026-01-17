import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminDashboardLayout from "@/Layout/AdminDashboardLayout";
import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
} from "@/redux/api/authApi";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { data: profileData } = useGetProfileQuery(undefined);

  const user = profileData?.data;
  const isAdmin = user?.role === "admin";
  const Layout = isAdmin ? AdminDashboardLayout : ClientDashboardLayout;

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.oldPassword.trim())
      newErrors.oldPassword = "Current password is required";
    if (!formData.newPassword.trim())
      newErrors.newPassword = "New password is required";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password";

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "New passwords do not match";
    }

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitError("");
    setSuccess("");

    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      setSuccess("Password changed successfully!");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setSubmitError(err?.data?.message || "Failed to change password");
    }
  };

  const errorInputStyle = "border border-[#FE1B1B] bg-[#FFECE6]";

  return (
    <Layout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Change Password
          </h1>

          {/* Messages */}
          {submitError && (
            <div className="flex justify-between items-start bg-[#FFECE6] rounded-md mb-6 p-4">
              <div className="">
                <p className="text-[#FE1B1B] font-semibold">
                  Failed to change password
                </p>
                <p className="text-[#FE1B1B] text-sm">{submitError}</p>
              </div>
              <button
                onClick={() => setSubmitError("")}
                className="cursor-pointer"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          {success && (
            <div className="flex justify-between items-start bg-green-50 border border-green-200 rounded-md mb-6 p-4">
              <div className="">
                <p className="text-green-700 font-semibold">Success!</p>
                <p className="text-green-700 text-sm">{success}</p>
              </div>
              <button onClick={() => setSuccess("")} className="cursor-pointer">
                <X className="w-4 h-4 text-green-700" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password */}
            <div>
              <p className="text-gray-900 text-base font-medium mb-2">
                Current Password
              </p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1878B5] w-5 h-5" />
                <Input
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                  className={`pl-10 pr-10 py-6 ${errors.oldPassword ? errorInputStyle : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showOldPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-[#FE1B1B] text-sm mt-1">
                  {errors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <p className="text-gray-900 text-base font-medium mb-2">
                New Password
              </p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1878B5] w-5 h-5" />
                <Input
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className={`pl-10 pr-10 py-6 ${errors.newPassword ? errorInputStyle : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-[#FE1B1B] text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <p className="text-gray-900 text-base font-medium mb-2">
                Confirm Password
              </p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1878B5] w-5 h-5" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className={`pl-10 pr-10 py-6 ${errors.confirmPassword ? errorInputStyle : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[#FE1B1B] text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8 py-5 bg-[#1878B5] hover:bg-[#1878D9] rounded-[40px] cursor-pointer"
              >
                {isLoading ? "Changing..." : "Change Password"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="px-8 py-5 text-[#1878B5] border-gray-300 bg-[#E8F2F8] hover:bg-gray-50 rounded-[40px] cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
