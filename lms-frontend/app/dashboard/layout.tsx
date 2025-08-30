import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { RightSidebar } from "@/components/right-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30">
        <DashboardHeader />
      </div>
      <div className="flex">
        <div className="h-screen sticky top-0 overflow-y-auto">
          <DashboardSidebar />
        </div>
        <main className="flex-1 p-6 space-y-6 overflow-y-auto min-h-screen">
          {children}
        </main>
        <div className="h-screen sticky top-0 overflow-y-auto">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
