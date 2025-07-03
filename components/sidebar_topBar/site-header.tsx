"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import QuickMemberSearch from "../Members/QuickMemberSearch";
import ThemeToggle from "../common/ThemeToggle";
import { NavUser } from "../common/NavUser";
// import NotificationDropdown from "./notifications/NotificationDropdown";

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between px-4 border-b  shadow-sm transition-all">
      {/* Left Side: Sidebar Trigger */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
      </div>

      {/* Right Side: Tools */}
      <div className="flex items-center gap-3">
        <QuickMemberSearch />

        {/* Optional: Uncomment to add */}
        {/* <NotificationDropdown /> */}

        <ThemeToggle />

        <Link href="/settings">
          <Button
            size="icon"
            variant="outline"
            className="relative border-none"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </Link>

        <NavUser side="bottom" />
      </div>
    </header>
  );
}
