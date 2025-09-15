"use client";
import React from "react";
import LinksDropdown from "./LinksDropdown";
import QuickLinksDropdown from "./QuickLinksDropdown";
import AIFeaturesModal from "./AIFeaturesModal";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { Briefcase, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  // Create breadcrumb navigation
  const getBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      { name: "Dashboard", href: "/", icon: <Home className="h-4 w-4" /> },
    ];

    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      let name = segment.replace("-", " ");

      // Capitalize first letter of each word
      name = name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Special cases for specific routes
      if (segment === "add-job") name = "Add Job";
      if (segment === "jobs") name = "All Jobs";
      if (segment === "stats") name = "Analytics";

      breadcrumbs.push({ name, href, icon: <Briefcase className="h-4 w-4" /> });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 py-4 sm:px-16 lg:px-24 px-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left section - Mobile menu and breadcrumbs */}
        <div className="flex items-center gap-4">
          <LinksDropdown />

          {/* Breadcrumb Navigation - Hidden on small screens */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <Link
                  href={crumb.href}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                    index === breadcrumbs.length - 1
                      ? "text-foreground font-medium bg-muted/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {index === 0 && crumb.icon}
                  <span>{crumb.name}</span>
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Page title for mobile */}
          <div className="sm:hidden flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">
              {breadcrumbs[breadcrumbs.length - 1]?.name || "JobTrackAI"}
            </span>
          </div>
        </div>

        {/* Right section - Theme toggle and user */}
        <div className="flex items-center gap-3">
          <AIFeaturesModal>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border border-primary/20 hover:from-primary/20 hover:to-purple-500/20 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <span className="text-xs font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                ✨ AI Magic Mode
              </span>
            </button>
          </AIFeaturesModal>

          <QuickLinksDropdown />

          <div className="h-6 w-px bg-border hidden sm:block"></div>

          <ThemeToggle />

          <div className="relative">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "h-9 w-9 border-2 border-border hover:border-primary transition-colors",
                  userButtonPopoverCard: "shadow-lg border border-border",
                  userButtonPopoverActionButton: "hover:bg-muted",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
