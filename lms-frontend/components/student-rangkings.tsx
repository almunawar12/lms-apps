"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getAllScores } from "@/service/score";
import { toast } from "react-hot-toast";

interface Score {
  id: string;
  score: string;
  studentName: string;
  moduleCode: string;
  course: string;
  moduleTitle: string;
  courseTitle?: string;
}

export function StudentRankings() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const res = await getAllScores({ page: 1, limit: 10 });
        console.log("res scores", res);
        setScores(res.data || []);
      } catch (error) {
        toast.error("Gagal memuat ranking");
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  // Sort descending by score (assume numeric)
  const sorted = [...scores].sort(
    (a, b) => parseFloat(b.score) - parseFloat(a.score)
  );

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>NILAI PESERTA</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>MODUL</TableHead>
              <TableHead>Point</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : sorted.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              sorted.map((score, idx) => (
                <TableRow key={score.id}>
                  <TableCell>
                    <Badge variant={idx === 0 ? "default" : "secondary"}>
                      {idx + 1}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {score.studentName}
                  </TableCell>
                  <TableCell>{score.course || "-"}</TableCell>
                  <TableCell>{score.moduleCode}</TableCell>
                  <TableCell className="text-primary font-semibold">
                    {score.score}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
