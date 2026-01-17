import { useNavigate } from "react-router-dom";
import { useGetProfileQuery, useUpdateProfileMutation, useUploadImageMutation } from "@/redux/api/authApi";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, X } from "lucide-react";
import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
import AdminDashboardLayout from "@/Layout/AdminDashboardLayout";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: profileData } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const user = profileData?.data;
  const isAdmin = user?.role === "admin";
  const Layout = isAdmin ? AdminDashboardLayout : ClientDashboardLayout;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUpdateImage = async () => {
    if (!selectedFile) return;

    const data = new FormData();
    data.append("files", selectedFile);

    try {
      await uploadImage(data).unwrap();
      setSuccessMessage("Profile image updated successfully!");
      setSelectedFile(null);
      setImagePreview(null);
    } catch (err: any) {
      setErrorMessage(err?.data?.message || "Failed to update image");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name,
      };
      await updateProfile(payload).unwrap();
      setSuccessMessage("Profile updated successfully!");
    } catch (err: any) {
      setErrorMessage(err?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Edit Profile
          </h1>

          {/* Messages */}
          {successMessage && (
            <div className="flex justify-between items-start bg-green-50 border border-green-200 rounded-md mb-6 p-4">
              <p className="text-green-700">{successMessage}</p>
              <button onClick={() => setSuccessMessage("")} className="text-green-700"><X className="w-4 h-4" /></button>
            </div>
          )}
          {errorMessage && (
            <div className="flex justify-between items-start bg-red-50 border border-red-200 rounded-md mb-6 p-4">
              <p className="text-red-700">{errorMessage}</p>
              <button onClick={() => setErrorMessage("")} className="text-red-700"><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* Profile Image Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            <div className="relative">
              <img
                src={imagePreview || user?.img || "/images/sidebarProfile.png"}
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
            
            <Button
              type="button"
              disabled={!selectedFile || isUploading}
              onClick={handleUpdateImage}
              className="bg-[#1878B5] hover:bg-[#1878D9] rounded-[40px] px-6 py-2 h-auto text-sm"
            >
              {isUploading ? "Uploading..." : "Update Profile Image"}
            </Button>
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
              <p className="text-gray-900 text-base font-medium mb-2">Email Address</p>
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
        </div>
      </div>
    </Layout>
  );
}
