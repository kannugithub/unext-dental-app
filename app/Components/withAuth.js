"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const WithAuth = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state) => state.authWeb.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token]);

  return children;
};

export default WithAuth;
