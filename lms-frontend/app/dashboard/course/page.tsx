"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/service/course";
import { formatDate } from "@/lib/formatDate";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { CourseTypes } from "@/service/data-types";
import { CourseModal } from "./course-modal";

interface Course {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  startDate: string;
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [modalOpen, setModalOpen] = useState(false); // untuk create & edit
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getAllCourses({ page, limit, search });
      setCourses(res.data || []);
    } catch (error) {
      toast.error("Gagal memuat course");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, limit, search]);

  // Single handler untuk create & edit
  const handleSaveCourse = async (data: CourseTypes) => {
    const isEdit = !!editCourse;
    const loadingSetter = isEdit ? setEditLoading : setCreateLoading;

    const apiCall = isEdit
      ? () =>
          updateCourse(editCourse!.id, {
            ...data,
            startDate: new Date(data.startDate).toISOString(),
          })
      : () =>
          createCourse({
            ...data,
            startDate: new Date(data.startDate).toISOString(),
          });

    loadingSetter(true);
    try {
      const res = await apiCall();
      if (res.success) {
        toast.success(res.message);
        setModalOpen(false);
        if (isEdit) setEditCourse(null);
        await fetchCourses();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Terjadi kesalahan");
    } finally {
      loadingSetter(false);
    }
  };

  // Delete course
  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus course ini?")) return;
    setDeleteLoading(id);
    try {
      const res = await deleteCourse(id);
      if (res.success) {
        toast.success(res.message || "Berhasil dihapus");
        await fetchCourses();
      } else {
        toast.error(res.message || "Gagal menghapus course");
      }
    } catch (error: any) {
      toast.error(error?.message || "Gagal menghapus course");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Buka modal create
  const openCreateModal = () => {
    setEditCourse(null);
    setModalOpen(true);
  };

  // Buka modal edit
  const openEditModal = (course: Course) => {
    setEditCourse(course);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h2 className="text-xl font-bold text-foreground">Daftar Course</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Cari course..."
            className="border border-border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={openCreateModal}>Tambah Course</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-border overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Instruktur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Tanggal Mulai
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
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  Tidak ada course ditemukan.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {course.instructorName}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {formatDate(course.startDate)}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2"
                      title="Edit"
                      onClick={() => openEditModal(course)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="px-2"
                      title="Hapus"
                      onClick={() => handleDelete(course.id)}
                      disabled={deleteLoading === course.id}
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
        total={courses.length}
        totalPages={Math.ceil(courses.length / limit)}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <CourseModal
        onSubmit={handleSaveCourse}
        loading={editCourse ? editLoading : createLoading}
        initialValues={
          editCourse
            ? { ...editCourse, startDate: editCourse.startDate.split("T")[0] }
            : undefined
        }
        mode={editCourse ? "edit" : "create"}
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      />
    </div>
  );
}
