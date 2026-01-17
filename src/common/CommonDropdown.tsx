"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface DropdownItem {
  label: string;
  onClick?: () => void;
}

interface CommonDropdownProps {
  items: DropdownItem[];
  trigger: React.ReactNode; // pass any custom trigger (like your Filter button)
}

const CommonDropdown: React.FC<CommonDropdownProps> = ({ items, trigger }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white border border-border min-w-[160px]"
      >
        {items.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={item.onClick}
            className="cursor-pointer hover:bg-gray-100"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommonDropdown;
