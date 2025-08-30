import callAPI from "../../config/api";
import { CourseTypes, LoginTypes, UserTypes } from "../data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "v1";

export async function getAllUsers({
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
  const url = `${ROOT_API}/${API_VERSION}/user?${params.toString()}`;
  console.log("url", url);
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getAllInstructors({
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
  const url = `${ROOT_API}/${API_VERSION}/user/instructors?${params.toString()}`;
  console.log("url", url);
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getAllStudents({
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
  const url = `${ROOT_API}/${API_VERSION}/user/students?${params.toString()}`;
  console.log("url", url);
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function createUser(data: UserTypes) {
  const url = `${ROOT_API}/${API_VERSION}/user/register`;
  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function updateUser(id: string, data: UserTypes) {
  const url = `${ROOT_API}/${API_VERSION}/user/${id}`;
  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}

export async function deleteUser(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/user/${id}`;
  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}
