"use client";
import { PanelLeftIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

function MobileTopBar() {
  const { isMobile, isSmallMobile, handleRouteToHome } = useAuth();
  const { toggleSidebar } = useSidebar();

  if (!isMobile) {
    return <></>;
  }
  return (
    <div className="w-full p-4 flex flex-row items-center justify-between">
      <PanelLeftIcon
        className="size-6 cursor-pointer"
        onClick={toggleSidebar}
      />
      <div
        className="flex flex-row justify-center items-center xm:gap-2"
        onClick={handleRouteToHome}
      >
        <Image
          src="/logo/white_logo.png"
          width={isSmallMobile ? 40 : 60}
          height={isSmallMobile ? 40 : 60}
          alt="F1ST Logo"
        />
        <span className="truncate xm:text-lg font-medium">
          F1 Standard Time
        </span>
      </div>
    </div>
  );
}

export default MobileTopBar;
