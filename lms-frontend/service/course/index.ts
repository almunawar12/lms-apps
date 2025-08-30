import callAPI from "../../config/api";
import { CourseTypes, LoginTypes } from "../data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "v1";

export async function getAllCourses({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (search) params.append("search", search);
  const url = `${ROOT_API}/${API_VERSION}/course?${params.toString()}`;
  console.log("url", url);
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function createCourse(data: CourseTypes) {
  const url = `${ROOT_API}/${API_VERSION}/course`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function updateCourse(id: string, data: CourseTypes) {
  const url = `${ROOT_API}/${API_VERSION}/course/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}

export async function deleteCourse(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/course/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}
