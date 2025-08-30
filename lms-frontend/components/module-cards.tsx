"use client";
import { useEffect, useState } from "react";
import { getAllModules } from "@/service/module";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface Module {
  id: string;
  title: string;
  courseName: string;
  description?: string;
  content?: string; // diasumsikan bisa berupa string dengan beberapa baris
}

export function ModuleCards() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const res = await getAllModules({ page: 1, limit: 12 });
        setModules(res.data || []);
      } catch (error) {
        toast.error("Gagal memuat module");
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const headerColors = [
    "bg-blue-900 text-white",
    "bg-red-300",
    "bg-yellow-300",
  ];

  return (
    <div>
      <h2 className="text-xl pt-3 font-bold">MODUL KOMPETENSI</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-8">Loading...</div>
        ) : modules.length === 0 ? (
          <div className="col-span-3 text-center py-8">
            Tidak ada module ditemukan.
          </div>
        ) : (
          modules.map((module, index) => (
            <Card
              key={module.id}
              className="rounded-2xl overflow-hidden shadow-md border border-gray-200"
            >
              <div className="flex justify-center p-3">
                <div
                  className={`px-6 py-3 w-[80%] h-32 font-bold text-lg rounded-md ${
                    headerColors[index % headerColors.length]
                  }`}
                >
                  {module.courseName}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <h3 className="text-sm font-semibold">MATERI KOMPETENSI</h3>
                {module.content ? (
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {module.content.split("\n").map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Belum ada materi.</p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
