"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
} from "@/service/module";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ModuleTypes } from "@/service/data-types";
import { ModuleModal } from "./module-modal";

interface Module {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  code?: string;
  content?: string;
}

export default function ModulePage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModule, setEditModule] = useState<Module | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch modules
  const fetchModules = async () => {
    setLoading(true);
    try {
      const res = await getAllModules({ page, limit, search });
      setModules(res.data || []);
    } catch (error) {
      toast.error("Gagal memuat module");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [page, limit, search]);

  // Single handler untuk create & edit
  const handleSaveModule = async (data: Partial<ModuleTypes>) => {
    const isEdit = !!editModule;
    const loadingSetter = isEdit ? setEditLoading : setCreateLoading;

    const apiCall = isEdit
      ? () => updateModule(editModule!.id, { ...editModule, ...data })
      : () => createModule(data as ModuleTypes);

    loadingSetter(true);
    try {
      const res = await apiCall();
      if (res.success) {
        toast.success(res.message);
        setModalOpen(false);
        if (isEdit) setEditModule(null);
        await fetchModules();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Terjadi kesalahan");
    } finally {
      loadingSetter(false);
    }
  };

  // Delete module
  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus module ini?")) return;
    setDeleteLoading(id);
    try {
      const res = await deleteModule(id);
      if (res.success) {
        toast.success(res.message || "Berhasil dihapus");
        await fetchModules();
      } else {
        toast.error(res.message || "Gagal menghapus module");
      }
    } catch (error: any) {
      toast.error(error?.message || "Gagal menghapus module");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Buka modal create
  const openCreateModal = () => {
    setEditModule(null);
    setModalOpen(true);
  };

  // Buka modal edit
  const openEditModal = (module: Module) => {
    setEditModule(module);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h2 className="text-xl font-bold text-foreground">Daftar Module</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Cari module..."
            className="border border-border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={openCreateModal}>Tambah Module</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-border overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Kode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Course
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
            ) : modules.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  Tidak ada module ditemukan.
                </td>
              </tr>
            ) : (
              modules.map((module) => (
                <tr
                  key={module.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {module.code}
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {module.title}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {module.courseName}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2"
                      title="Edit"
                      onClick={() => openEditModal(module)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="px-2"
                      title="Hapus"
                      onClick={() => handleDelete(module.id)}
                      disabled={deleteLoading === module.id}
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
        total={modules.length}
        totalPages={Math.ceil(modules.length / limit)}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <ModuleModal
        onSubmit={handleSaveModule}
        loading={editModule ? editLoading : createLoading}
        initialValues={editModule || undefined}
        mode={editModule ? "edit" : "create"}
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      />
    </div>
  );
}
