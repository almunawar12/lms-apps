"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState(page.toString());

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      setInputPage(newPage.toString());
    }
  };

  const handleLimitChange = (value: string) => {
    onLimitChange(Number(value));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
      {/* Info */}
      <p className="text-sm text-muted-foreground">
        Menampilkan <span className="font-semibold">{limit}</span> dari{" "}
        <span className="font-semibold">{total}</span> data
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </Button>

        <input
          type="number"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onBlur={() => handlePageChange(Number(inputPage))}
          className="w-16 text-center border rounded-md text-sm p-1"
          min={1}
          max={totalPages}
        />
        <span className="text-sm text-muted-foreground">/ {totalPages}</span>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>

        {/* Limit Selector */}
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50, 100].map((opt) => (
              <SelectItem key={opt} value={opt.toString()}>
                {opt} / halaman
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
