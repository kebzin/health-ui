// import NotificationDropdown from "./notifications/NotificationDropdown";
import ThemeToggle from "../common/ThemeToggle";
import { Settings } from "lucide-react";
import Link from "next/link";
import { NavUser } from "../common/NavUser";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export function SiteHeader() {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between overflow-hidden">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <div className="flex items-center gap-3">
          {/* <NotificationDropdown /> */}
          <ThemeToggle />
          <Link href={"/settings"} className="cursor-pointer">
            <Button
              size="icon"
              className="relative border-none"
              variant="outline"
            >
              <Settings />
            </Button>
          </Link>
          {/* <ThemeToggle /> */}
          <NavUser
            side="bottom"
            // user={{
            //   name: "Kebba Waiga",
            //   email: "kebbawaiga@gmail.com",
            //   avatar: "https://example.com/john-doe.jpg",
            // }}
          />
        </div>
      </header>
    </div>
  );
}
