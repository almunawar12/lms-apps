"use client";
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getAllModules } from "@/service/module";
import { toast } from "react-hot-toast";

interface Module {
  id: string;
  title: string;
  courseName: string;
  description?: string;
  createdAt?: string;
  instructor?: string;
}

export function FeaturedCourse() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const res = await getAllModules({ page: 1, limit: 10 });
        setModules(res.data || []);
      } catch (error) {
        toast.error("Gagal memuat module");
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  if (loading) {
    return <Card className="p-8 text-center">Loading...</Card>;
  }

  if (modules.length === 0) {
    return <Card className="p-8 text-center">Tidak ada module ditemukan.</Card>;
  }

  const module = modules[0];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8">
      <div className="relative z-10">
        <div className="inline-block bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
          {module.courseName}
        </div>

        <h2 className="text-3xl font-bold mb-4 text-balance">{module.title}</h2>

        <p className="text-primary-foreground/90 mb-6 max-w-2xl text-pretty">
          {module.description}
        </p>

        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="text-sm">Pemateri By {module.instructor}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {module.createdAt
                ? new Date(module.createdAt).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>

        <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          MULAI LEARNING
        </Button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
    </Card>
  );
}
