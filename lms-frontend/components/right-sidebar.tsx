"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import useAuth from "@/hooks/UseAuth";
import { ChevronLeft, ChevronRight } from "lucide-react";

const scheduleItems = [
  {
    title: "Storytelling dalam Pemasaran",
    time: "09:00 - 8:00 WIB Pagi",
    color: "bg-primary",
  },
  {
    title: "Pemrograman Frontend Modern",
    time: "10:00 - 14:00 WIB Pagi",
    color: "bg-accent",
  },
  {
    title: "Pengembangan API",
    time: "15:30 - 8:30 WIB Pagi",
    color: "bg-chart-3",
  },
];

export function RightSidebar() {
  const { user } = useAuth();

  console.log("user sidebar", user);
  return (
    <aside className="w-80 p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold">
          SELAMAT DATANG{user?.name ? `, ${user.name.toUpperCase()}` : ""}
        </h2>
        <p className="text-sm text-muted-foreground">01 MIS by Adhivasindo</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">April 2025</CardTitle>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
                className="p-2 font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  i === 14
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">JADWAL PEMATERI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${item.color} mt-1.5`}
              ></div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* <div className="relative">
        <img
          src="/futuristic-tech-background.png"
          alt="Technology background"
          className="w-full h-32 object-cover rounded-lg"
        />
      </div> */}
    </aside>
  );
}
