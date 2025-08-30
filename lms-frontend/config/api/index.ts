import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
  params,
  responseType = "json",
}: CallAPIProps) {
  let headers = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get("token");
    // console.log(tokenCookies);
    if (tokenCookies) {
      // const jwtToken = Buffer.from(tokenCookies, 'base64').toString('ascii');
      // var decode: any = jwtDecode(tokenCookies);
      headers = {
        Authorization: `Bearer ${tokenCookies}`,
        // "Content-Type": 'application/x-www-form-urlencoded',
      };
    }
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
    params,
    responseType,
  }).catch((err) => err.response);

  console.log("CALL API RESPONSE" + response.data);

  if (responseType === "blob") {
    if (response.status > 300) throw new Error("Failed to fetch blob data");
    return response;
  }

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  const { length } = Object.keys(response.data);
  const res = {
    error: false,
    message: response.data.message,
    data: length > 1 ? response.data : response.data.data,
  };

  return res.data;
}
