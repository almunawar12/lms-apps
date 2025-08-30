"use client";
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  User,
  Settings,
  Calendar,
  LogOut,
  Notebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useAuth from "@/hooks/UseAuth";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Notebook, label: "Course", href: "/dashboard/course" },
  { icon: BookOpen, label: "Modul", href: "/dashboard/module" },
  { icon: Users, label: "Peserta", href: "/dashboard/student" },
  { icon: MessageSquare, label: "Group Chat", href: "/dashboard/group-chat" },
  { icon: User, label: "Pemateri", href: "/dashboard/instructor" },
];

const profileItems = [
  { icon: Settings, label: "Settings" },
  { icon: Calendar, label: "Kalender" },
];

export function DashboardSidebar() {
  const { logout } = useAuth();
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              asChild
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Link href={item.href} className="flex items-center w-full">
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="mt-12">
          <h3 className="text-sm font-medium text-sidebar-foreground/70 mb-4">
            PROFILE
          </h3>
          <nav className="space-y-2">
            {profileItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          <Button
            variant="ghost"
            className="w-full justify-start text-accent hover:bg-accent/10"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
