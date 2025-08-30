import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { FeaturedCourse } from "@/components/featured-course";
import { ModuleCards } from "@/components/module-cards";
import { RightSidebar } from "@/components/right-sidebar";
import { StudentRankings } from "@/components/student-rangkings";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <FeaturedCourse />
      <ModuleCards />
      <StudentRankings />
      {/* <RightSidebar /> */}
    </div>
  );
}
