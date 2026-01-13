import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

export default function EditProfilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profileImage, setProfileImage] = useState<string>(
    "/images/sidebarProfile.png" // fallback
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
    });
  };

  return (
    <ClientDashboardLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Edit Profile
          </h1>

          {/* Profile Image */}
          <div className="flex items-center gap-6 mb-10">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />

              {/* Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-8 h-8 flex items-center justify-center bg-[#1878B5] rounded-full border-2 border-white hover:bg-[#1878D9]"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6 max-w-3xl">
            {/* Full Name */}
            <div>
              <p className="text-gray-900 text-base font-medium mb-2">
                Full Name
              </p>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="py-6"
              />
            </div>

            {/* Email */}
            <div>
              <p className="text-gray-900 text-base font-medium mb-2">
                Email Address
              </p>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email id"
                className="py-6"
              />
            </div>

            {/* Phone */}
            <div>
              <p className="text-gray-900 text-base font-medium mb-2">
                Phone Number
              </p>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="py-6"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-6">
              <Button
                type="submit"
                className="px-8 py-5 bg-[#1878B5] hover:bg-[#1878D9] rounded-[40px]"
              >
                Save Changes
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-8 py-5 text-[#1878B5] border-gray-300 bg-[#E8F2F8] hover:bg-gray-50 rounded-[40px]"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
