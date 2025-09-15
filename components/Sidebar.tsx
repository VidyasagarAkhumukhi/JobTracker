"use client";
import React from "react";
import links from "@/utils/links";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Sparkles, Briefcase, User } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="py-6 px-6 bg-gradient-to-b from-sidebar/95 to-sidebar border-r border-sidebar-border h-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="p-3 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl border border-primary/20">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <div className="absolute -top-1 -right-1">
            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-primary-foreground" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
          JobTrackAI
        </h1>
        <p className="text-xs text-muted-foreground mt-1 text-center">
          AI-Powered Job Tracking
        </p>
        <Badge variant="secondary" className="mt-2 text-xs">
          Professional
        </Badge>
      </div>

      {/* User Info Section */}
      {user && (
        <div className="mb-6 p-4 bg-sidebar-accent/30 rounded-lg border border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-primary font-semibold text-sm">
                  {getInitials(user.fullName)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.fullName || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      )}

      <Separator className="mb-6" />

      {/* Navigation Section */}
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            Navigation
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                asChild
                key={link.href}
                variant={isActive ? "default" : "ghost"}
                className={`
                  justify-start h-11 px-4 w-full transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm border-0"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                  }
                `}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-3 w-full"
                >
                  <span
                    className={`${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span className="font-medium capitalize">{link.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-6 pt-4 border-t border-sidebar-border/50">
        <div className="p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-sidebar-foreground">
              AI Features
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Auto-fill job details from descriptions using our advanced AI
            technology
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
