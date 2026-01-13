"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ForgotPasswordEmail() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setError(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigate("/forgot-password/verify", { state: { method, value } });
      setLoading(false);
    }, 800);
  };

  console.log(setMethod)
  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#1878B5] mb-2">
          Forget password!
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Please enter your {method} to receive a confirmation code
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div className="flex items-center justify-self-center bg-[#E8F2F8] p-2 rounded-[12px]">
            <ToggleGroup
              type="single"
              value={method}
              onValueChange={(value) => {
                if (value) setMethod(value as "email" | "phone");
              }}
              className="grid grid-cols-2 gap-2"
            >
              <ToggleGroupItem
                value="email"
                className="
        rounded-2xl
        data-[state=on]:bg-[#1878B5]
        data-[state=on]:text-white
        data-[state=off]:bg-transparent
        data-[state=off]:text-[#1878B5]
        cursor-pointer
      "
              >
                Email
              </ToggleGroupItem>

              <ToggleGroupItem
                value="phone"
                className="
        rounded-2xl
        data-[state=on]:bg-[#1878B5]
        data-[state=on]:text-white
        data-[state=off]:bg-transparent
        data-[state=off]:text-[#1878B5]
        cursor-pointer
      "
              >
                Phone
              </ToggleGroupItem>
            </ToggleGroup>
          </div> */}

          <div>
            <p className="text-gray-900 text-base font-semibold mb-2">
              {method === "email" ? "Email" : "Phone Number"}
            </p>
            <div className="relative">
              {method === "email" ? (
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              ) : (
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              )}

              <Input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(false);
                }}
                placeholder={
                  method === "email" ? "Enter your email" : "Enter your phone"
                }
                className={`pl-10 py-6 ${
                  error ? "border border-[#FE1B1B] bg-[#FFECE6]" : ""
                }`}
              />
            </div>
          </div>

          {error && (
            <div className="flex justify-between bg-[#FFECE6] rounded-md">
              <div className="px-4 py-3">
                <p className="text-[#FE1B1B] font-semibold">
                  Failed to continue
                </p>
                <p className="text-[#FE1B1B] text-sm">
                  Please enter a valid {method}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setError(false)}
                className="px-[18px] py-[12px]"
              >
                <X className="w-4 h-4 text-[#FE1B1B]" />
              </button>
            </div>
          )}

          <Button className="w-full bg-[#1878B5] py-5 cursor-pointer hover:bg-[#1878D9]">
            {loading ? "Sending..." : "Send Code"}
          </Button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full text-center text-[#1878B5] hover:underline text-sm font-medium mt-4 cursor-pointer"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
