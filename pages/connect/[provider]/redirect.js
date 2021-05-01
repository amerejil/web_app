import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { BASE_PATH } from "../../../Utils/constants";
import { useRouter } from "next/router";
export default function redirect() {
  const [isSuccess, setisSuccess] = useState(undefined);
  const { login } = useAuth();
  const router = window.location.search;
  const r = useRouter();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${BASE_PATH}/auth/google/callback${router}`
      );
      const result = await response.json();

      if (result?.jwt) {
        login(result.jwt);
        setisSuccess(true);
        r.push("/");
      }
    })();
  }, [router]);

  return (
    <div>
      {isSuccess === undefined ? "Espere..." : ""}{" "}
      {isSuccess === true ? "Inicio de sesion correcto" : ""}
    </div>
  );
}
