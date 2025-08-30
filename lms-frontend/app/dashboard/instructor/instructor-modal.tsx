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
import { UserTypes } from "@/service/data-types";

interface InstructorModalProps {
  onSubmit: (data: Partial<UserTypes>) => void;
  loading?: boolean;
  initialValues?: Partial<UserTypes>;
  mode?: "create" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function InstructorModal({
  onSubmit,
  loading,
  initialValues = {},
  mode = "create",
  open: controlledOpen,
  onOpenChange,
}: InstructorModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = onOpenChange || setUncontrolledOpen;

  const [name, setName] = useState(initialValues.name || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (open && mode === "edit" && initialValues) {
      setName(initialValues.name || "");
      setEmail(initialValues.email || "");
    }
  }, [open, mode, initialValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      ...(mode === "create" ? { password } : {}),
      role: "instructor",
    });
    setOpen(false);
    if (mode === "create") {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Instructor" : "Buat Instructor Baru"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Ubah data instructor di bawah ini."
              : "Isi data instructor di bawah ini."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              className="w-full border border-border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {mode === "create" && (
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-border rounded px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
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
