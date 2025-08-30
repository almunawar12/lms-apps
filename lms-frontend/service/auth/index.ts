import callAPI from "../../config/api";
import { LoginTypes } from "../data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "v1";

export async function loginUser(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/user/login`;
  console.log("ROOT_API:", ROOT_API);

  console.log(url);
  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function register(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/user/register`;
  return callAPI({
    url,
    method: "POST",
    data,
  });
}
