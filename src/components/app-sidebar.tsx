"use client";
import { Trophy, Home, CalendarCheck, PanelLeftIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: CalendarCheck,
  },
  {
    title: "Standings",
    url: "/standings",
    icon: Trophy,
  },
];

export function AppSidebar() {
  const { pathname, isMobile } = useAuth();

  const router = useRouter();

  const { toggleSidebar, open, setOpenMobile } = useSidebar();

  const handleSidebarHeaderClick = () => {
    if (open && pathname !== "/") {
      if (isMobile) setOpenMobile(false);
      router.push("/");
    } else {
      toggleSidebar();
    }
  };
  const handleSidebarMenuItemClick = (url: string) => {
    if (pathname !== url) {
      if (isMobile) setOpenMobile(false);
      router.push(url);
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer group-data-[collapsible=icon]:size-10!"
              onClick={handleSidebarHeaderClick}
              tooltip="Expand"
            >
              <Image
                src="/logo/white_logo.png"
                width={60}
                height={60}
                alt="F1ST Logo"
              />
              <span className="truncate text-lg font-medium">
                F1 Standard Time
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="py-6"
                    tooltip={item.title}
                  >
                    <div
                      onClick={() => handleSidebarMenuItemClick(item.url)}
                      className="cursor-pointer"
                    >
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleSidebar}
              asChild
              className="py-6"
              tooltip="Expand"
            >
              <div className="cursor-pointer">
                <PanelLeftIcon className="size-6" />
                <span className="truncate text-lg">Collapse</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
