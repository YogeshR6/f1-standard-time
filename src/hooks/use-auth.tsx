"use client";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname, useRouter } from "next/navigation";
import { ThemeType } from "@/types/auth-context";

interface AuthContextType {
  isMobile: boolean;
  isSmallMobile: boolean;
  pathname: string;
  handleRouteToHome: () => void;
  theme: ThemeType;
  updateTheme: (newTheme: ThemeType) => void;
}
const AuthContext = React.createContext<AuthContextType>({
  isMobile: false,
  isSmallMobile: false,
  pathname: "/",
  handleRouteToHome: () => {},
  theme: "light",
  updateTheme: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallMobile = useMediaQuery("(max-width: 375px)");
  const pathname = usePathname() || "/";

  const [theme, setTheme] = React.useState<ThemeType>("light");

  React.useEffect(() => {
    const existingThemeSetting = localStorage.getItem("theme");
    if (existingThemeSetting) {
      setTheme(existingThemeSetting as ThemeType);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const handleRouteToHome = () => {
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const updateTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  const value = {
    isMobile,
    isSmallMobile,
    pathname,
    handleRouteToHome,
    theme,
    updateTheme,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
