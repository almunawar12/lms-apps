import callAPI from "../../config/api";
import { CourseTypes, EnrolmentTypes, LoginTypes } from "../data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "v1";

export async function getAllEnrollments({
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
  const url = `${ROOT_API}/${API_VERSION}/enrolment?${params.toString()}`;
  return callAPI({
    url,
    method: "GET",
  });
}

export async function createEnrollment(data: EnrolmentTypes) {
  const url = `${ROOT_API}/${API_VERSION}/enrolment`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function updateEnrollment(id: string, data: EnrolmentTypes) {
  const url = `${ROOT_API}/${API_VERSION}/enrolment/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
  });
}

export async function deleteEnrollment(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/enrolment/${id}`;

  return callAPI({
    url,
    method: "DELETE",
  });
}
