import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { BASE_PATH } from "../../../Utils/constants";

export default function redirect() {
  const { login } = useAuth();
  const router = window.location.search;
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${BASE_PATH}/auth/google/callback${router}`
      );
      const result = await response.json();
      console.log(result);
      if (result?.jwt) {
        login(result.jwt);
      }
    })();
  }, [router]);

  return <div>hola </div>;
}
