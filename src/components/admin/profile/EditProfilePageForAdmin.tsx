import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateProfileMutation } from "@/redux/api/authApi";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePageForAdmin = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
      };
      await updateProfile(payload).unwrap();
    } catch (err: any) {}
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <CommonBorderWrapper className="bg-white ">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Edit Profile
      </h1>

      {/* Profile Image Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="relative">
          <img
            src={imagePreview || "/images/sidebarProfile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

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
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <p className="text-gray-900 text-base font-medium mb-2">Full Name</p>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="py-6"
          />
        </div>

        <div>
          <p className="text-gray-900 text-base font-medium mb-2">
            Email Address
          </p>
          <Input
            name="email"
            type="email"
            value={formData.email}
            disabled
            className="py-6 bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="flex space-x-4 pt-6">
          <Button
            type="submit"
            disabled={isUpdating}
            className="px-8 py-5 bg-[#1878B5] hover:bg-[#1878D9] rounded-[40px] cursor-pointer"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-8 py-5 text-[#1878B5] border-gray-300 bg-[#E8F2F8] hover:bg-gray-50 rounded-[40px] cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </CommonBorderWrapper>
  );
};
export default EditProfilePageForAdmin;
