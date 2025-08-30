import callAPI from "../../config/api";
import { ScoreTypes } from "../data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "v1";

export async function getAllScores({
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
  const url = `${ROOT_API}/${API_VERSION}/score?${params.toString()}`;
  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function createScore(data: ScoreTypes) {
  const url = `${ROOT_API}/${API_VERSION}/score`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function updateScore(id: string, data: ScoreTypes) {
  const url = `${ROOT_API}/${API_VERSION}/score/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}

export async function deleteScore(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/score/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}
