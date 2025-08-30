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
import { AppSelect } from "@/components/ui/app-select";
import { getAllInstructors } from "@/service/user";
import { FormEvent, useEffect, useState } from "react";

interface CourseFormValues {
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  startDate: string;
}

interface CreateCourseModalProps {
  onSubmit: (data: CourseFormValues) => void;
  loading?: boolean;
  initialValues?: Partial<CourseFormValues>;
  mode?: "create" | "edit";
  triggerLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CourseModal({
  onSubmit,
  loading,
  initialValues = {},
  mode = "create",
  triggerLabel,
  open: controlledOpen,
  onOpenChange,
}: CreateCourseModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = onOpenChange || setUncontrolledOpen;
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [instructorId, setInstructorId] = useState(
    initialValues.instructorId || ""
  );
  const [instructorName, setInstructorName] = useState(
    initialValues.instructorName || ""
  );
  const [instructors, setInstructors] = useState<
    { id: string; name: string }[]
  >([]);
  const [startDate, setStartDate] = useState(initialValues.startDate || "");

  useEffect(() => {
    if (open) {
      getAllInstructors({ page: 1, limit: 100 }).then((res) => {
        setInstructors(res?.data || []);
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && mode === "edit" && initialValues) {
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setInstructorId(initialValues.instructorId || "");
      setInstructorName(initialValues.instructorName || "");
      setStartDate(initialValues.startDate || "");
    }
  }, [open, mode, initialValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selectedInstructor = instructors.find((i) => i.id === instructorId);
    onSubmit({
      title,
      description,
      instructorId,
      instructorName: selectedInstructor?.name || instructorName,
      startDate,
    });
    setOpen(false);
    if (mode === "create") {
      setTitle("");
      setDescription("");
      setInstructorId("");
      setInstructorName("");
      setStartDate("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Course" : "Buat Course Baru"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Ubah data course di bawah ini."
              : "Isi data course di bawah ini."}
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
          <AppSelect
            value={instructorId}
            onChange={setInstructorId}
            options={instructors.map((ins) => ({
              value: ins.id,
              label: ins.name,
            }))}
            placeholder="Pilih Instruktur"
            label="Instruktur"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              className="w-full border border-border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Mulai
            </label>
            <input
              type="date"
              className="w-full border border-border rounded px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
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
