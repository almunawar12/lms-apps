"use client";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { LoginTypes } from "@/service/data-types";
import { loginUser } from "@/service/auth";

interface JwtPayload {
  sub?: string;
  email?: string;
  name?: string;
  exp: number;
  iat?: number;
}

const useAuth = () => {
  const router = useRouter();
  const [onSignin, setOnSignin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const parseJwt = useCallback(() => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.log("No token found in cookies");
        return null;
      }

      const decoded = jwtDecode<JwtPayload>(token);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        Cookies.remove("token");
        return null;
      }

      return decoded;
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const decoded = parseJwt();

    if (decoded) {
      setIsAuthenticated(true);
      setUser(decoded);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [parseJwt]);

  const getUserPermissions = useCallback(() => {
    const decoded = parseJwt();
    if (!decoded) {
      console.log("No decoded token available");
      return [];
    }
  }, [parseJwt]);

  const login = async (email: string, password: string) => {
    try {
      setOnSignin(true);
      const loginData: LoginTypes = {
        email,
        password,
      };
      const res = await loginUser(loginData);
      console.log("response login", res);

      if (!res.error) {
        const token = res.token;
        console.log("JWT Token:", token);

        Cookies.set("token", token, { expires: 1 });

        const decoded = parseJwt();
        if (decoded) {
          setIsAuthenticated(true);
          setUser(decoded);
        }

        toast.success(`${res.message}`);
        router.push("/dashboard");
      } else {
        console.log(res);
        toast.error(`${res.message}`);
        setOnSignin(false);
      }
    } catch (error) {
      console.error(error);
      setOnSignin(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logout berhasil");
    router.push("/");
  };

  return {
    login,
    logout,
    onSignin,
    isAuthenticated,
    user,
    getUserPermissions,
  };
};

export default useAuth;
