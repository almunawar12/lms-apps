"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllStudents,
  updateUser,
  deleteUser,
  createUser,
} from "@/service/user";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { UserTypes } from "@/service/data-types";
import { StudentModal } from "./student-modal";

interface Student {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student" | "instructor";
}

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents({ page, limit, search });
      console.log("res", res);
      setStudents(res.data || []);
    } catch (error) {
      toast.error("Gagal memuat student");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, limit, search]);

  // Single handler untuk create & edit
  const handleSaveStudent = async (data: Partial<UserTypes>) => {
    const isEdit = !!editStudent;
    const loadingSetter = isEdit ? setEditLoading : setCreateLoading;

    const apiCall = isEdit
      ? () =>
          updateUser(editStudent!.id, {
            ...editStudent,
            ...data,
            role: "student",
          })
      : async () => {
          if (!data.email || !data.name) {
            throw new Error("Nama dan email wajib diisi");
          }
          return createUser({
            email: data.email,
            name: data.name,
            role: "student",
          });
        };

    loadingSetter(true);
    try {
      const res = await apiCall();
      if (res.success) {
        toast.success(
          res.message || (isEdit ? "Berhasil diupdate" : "Berhasil ditambah")
        );
        setModalOpen(false);
        if (isEdit) setEditStudent(null);
        await fetchStudents();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Terjadi kesalahan");
    } finally {
      loadingSetter(false);
    }
  };

  // Delete student
  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus student ini?")) return;
    setDeleteLoading(id);
    try {
      const res = await deleteUser(id);
      if (res.success) {
        toast.success(res.message || "Berhasil dihapus");
        await fetchStudents();
      } else {
        toast.error(res.message || "Gagal menghapus student");
      }
    } catch (error: any) {
      toast.error(error?.message || "Gagal menghapus student");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Buka modal create
  const openCreateModal = () => {
    setEditStudent(null);
    setModalOpen(true);
  };

  // Buka modal edit
  const openEditModal = (student: Student) => {
    setEditStudent(student);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h2 className="text-xl font-bold text-foreground">Daftar Student</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Cari student..."
            className="border border-border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={openCreateModal}>Tambah Student</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-border overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-border">
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  Tidak ada student ditemukan.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-foreground">{student.email}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2"
                      title="Edit"
                      onClick={() => openEditModal(student)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="px-2"
                      title="Hapus"
                      onClick={() => handleDelete(student.id)}
                      disabled={deleteLoading === student.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        limit={limit}
        total={students.length}
        totalPages={Math.ceil(students.length / limit)}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <StudentModal
        onSubmit={handleSaveStudent}
        loading={editStudent ? editLoading : createLoading}
        initialValues={editStudent || undefined}
        mode={editStudent ? "edit" : "create"}
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      />
    </div>
  );
}
