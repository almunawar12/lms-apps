"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { getAllInstructors, updateUser, deleteUser } from "@/service/user";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { UserTypes } from "@/service/data-types";
import { InstructorModal } from "./instructor-modal";

interface Instructor {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student" | "instructor";
}

export default function InstructorPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [editInstructor, setEditInstructor] = useState<Instructor | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch instructors
  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const res = await getAllInstructors({ page, limit, search });
      setInstructors(res.data || []);
    } catch (error) {
      toast.error("Gagal memuat instructor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [page, limit, search]);

  // Single handler untuk create & edit
  const handleSaveInstructor = async (data: Partial<UserTypes>) => {
    const isEdit = !!editInstructor;
    const loadingSetter = isEdit ? setEditLoading : setCreateLoading;

    const apiCall = isEdit
      ? () =>
          updateUser(editInstructor!.id, {
            ...editInstructor,
            ...data,
            role: "instructor",
          })
      : async () => {
          // create instructor pakai register endpoint
          const url = `/v1/auth/register`;
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, role: "instructor" }),
          });
          return await res.json();
        };

    loadingSetter(true);
    try {
      const res = await apiCall();
      if (res.success) {
        toast.success(
          res.message || (isEdit ? "Berhasil diupdate" : "Berhasil ditambah")
        );
        setModalOpen(false);
        if (isEdit) setEditInstructor(null);
        await fetchInstructors();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Terjadi kesalahan");
    } finally {
      loadingSetter(false);
    }
  };

  // Delete instructor
  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus instructor ini?")) return;
    setDeleteLoading(id);
    try {
      const res = await deleteUser(id);
      if (res.success) {
        toast.success(res.message || "Berhasil dihapus");
        await fetchInstructors();
      } else {
        toast.error(res.message || "Gagal menghapus instructor");
      }
    } catch (error: any) {
      toast.error(error?.message || "Gagal menghapus instructor");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Buka modal create
  const openCreateModal = () => {
    setEditInstructor(null);
    setModalOpen(true);
  };

  // Buka modal edit
  const openEditModal = (instructor: Instructor) => {
    setEditInstructor(instructor);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h2 className="text-xl font-bold text-foreground">Daftar Instructor</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Cari instructor..."
            className="border border-border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={openCreateModal}>Tambah Instructor</Button>
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
            ) : instructors.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  Tidak ada instructor ditemukan.
                </td>
              </tr>
            ) : (
              instructors.map((instructor) => (
                <tr
                  key={instructor.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {instructor.name}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {instructor.email}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2"
                      title="Edit"
                      onClick={() => openEditModal(instructor)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="px-2"
                      title="Hapus"
                      onClick={() => handleDelete(instructor.id)}
                      disabled={deleteLoading === instructor.id}
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
        total={instructors.length}
        totalPages={Math.ceil(instructors.length / limit)}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <InstructorModal
        onSubmit={handleSaveInstructor}
        loading={editInstructor ? editLoading : createLoading}
        initialValues={editInstructor || undefined}
        mode={editInstructor ? "edit" : "create"}
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      />
    </div>
  );
}
