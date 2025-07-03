"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

// import { NavDocuments } from "@web-dashboard/components/nav-documents";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavSecondary } from "../nav-secondary";
import { NavMain } from "../nav-main";
import { NavUser } from "../common/NavUser";
// import { Dumbbell } from "lucide-react";

const data = {
  user: {
    name: "Kebba Waiga",
    email: "kebbawaiga@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Members",
      url: "/members",
      icon: IconUsers,
    },
    {
      title: "Encounters",
      url: "/encounters",
      icon: IconListDetails,
    },
    {
      title: "Referrals",
      url: "/referrals",
      icon: IconFileWord,
    },
    {
      title: "Claims",
      url: "/claims",
      icon: IconFileDescription,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: IconChartBar,
    },
    {
      title: "System Health",
      url: "/system-health",
      icon: IconDatabase,
    },
    {
      title: "Admin Panel",
      url: "/admin",
      icon: IconSettings,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
  documents: [], // Optional: can be filled with downloads or reports
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Health Facility.
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          side="right"
          // user={{
          //   name: "Kebba Waiga",
          //   email: "kebbawaiga@gmail.com",
          //   avatar: "https://example.com/john-doe.jpg",
          // }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
