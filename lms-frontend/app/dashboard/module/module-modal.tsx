import { useEffect, useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/service/course";

interface ModuleFormValues {
  title: string;
  courseId: string;
  courseName?: string;
  code?: string;
  content?: string;
}

interface ModuleModalProps {
  onSubmit: (data: ModuleFormValues) => void;
  loading?: boolean;
  initialValues?: Partial<ModuleFormValues>;
  mode?: "create" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ModuleModal({
  onSubmit,
  loading,
  initialValues = {},
  mode = "create",
  open: controlledOpen,
  onOpenChange,
}: ModuleModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = onOpenChange || setUncontrolledOpen;

  const [title, setTitle] = useState(initialValues.title || "");
  const [courseId, setCourseId] = useState(initialValues.courseId || "");
  const [code, setCode] = useState(initialValues.code || "");
  const [content, setContent] = useState(initialValues.content || "");
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    if (open) {
      getAllCourses({ page: 1, limit: 100 }).then((res) => {
        setCourses(res?.data || []);
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && mode === "edit" && initialValues) {
      setTitle(initialValues.title || "");
      setCourseId(initialValues.courseId || "");
      setCode(initialValues.code || "");
      setContent(initialValues.content || "");
    }
  }, [open, mode, initialValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selectedCourse = courses.find((c) => c.id === courseId);
    onSubmit({
      title,
      courseId,
      courseName: selectedCourse?.title || initialValues.courseName || "",
    });
    setOpen(false);
    if (mode === "create") {
      setTitle("");
      setCourseId("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Module" : "Buat Module Baru"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Ubah data module di bawah ini."
              : "Isi data module di bawah ini."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              className="w-full border border-border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kode</label>
            <input
              className="w-full border border-border rounded px-3 py-2"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Konten</label>
            <textarea
              className="w-full border border-border rounded px-3 py-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              className="w-full border border-border rounded px-3 py-2"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Pilih Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" variant="outline" disabled={loading}>
              {loading
                ? mode === "edit"
                  ? "Menyimpan..."
                  : "Membuat..."
                : mode === "edit"
                ? "Simpan Perubahan"
                : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
