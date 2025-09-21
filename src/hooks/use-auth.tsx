"use client";
import React, { createContext, useContext } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  isMobile: boolean;
  isSmallMobile: boolean;
  pathname: string;
  handleRouteToHome: () => void;
}
const AuthContext = createContext<AuthContextType>({
  isMobile: false,
  isSmallMobile: false,
  pathname: "/",
  handleRouteToHome: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallMobile = useMediaQuery("(max-width: 375px)");
  const pathname = usePathname() || "/";

  const handleRouteToHome = () => {
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const value = {
    isMobile,
    isSmallMobile,
    pathname,
    handleRouteToHome,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
