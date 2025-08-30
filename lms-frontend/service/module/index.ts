import callAPI from "../../config/api";
import { CourseTypes, LoginTypes, ModuleTypes } from "../data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "v1";

export async function getAllModules({
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
  const url = `${ROOT_API}/${API_VERSION}/module?${params.toString()}`;
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function createModule(data: ModuleTypes) {
  const url = `${ROOT_API}/${API_VERSION}/module`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function updateModule(id: string, data: ModuleTypes) {
  const url = `${ROOT_API}/${API_VERSION}/module/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}

export async function deleteModule(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/module/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}
