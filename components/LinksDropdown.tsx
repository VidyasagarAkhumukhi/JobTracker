import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import links from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LinksDropdown = () => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="border-border/50 hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Navigation Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 lg:hidden shadow-lg border border-border/50"
        align="start"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold">JobTrackAI</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <DropdownMenuItem key={link.href} className="p-0">
              <Link
                href={link.href}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <span
                  className={
                    isActive ? "text-primary" : "text-muted-foreground"
                  }
                >
                  {link.icon}
                </span>
                <div className="flex-1">
                  <span className="capitalize font-medium">{link.label}</span>
                  {link.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {link.description}
                    </p>
                  )}
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>AI Features Active</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
