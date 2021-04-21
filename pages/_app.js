import "../scss/global.scss";
import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { getMeaApi } from "../Api/user";
import { setToken, getToken, removeToken } from "../Api/token";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const [auth, setauth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();
  const [user, setuser] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setauth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setauth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    setauth({
      token,
      idUser: jwtDecode(token).id,
    });
  };
  const logout = () => {
    if (auth) {
      removeToken();
      setauth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  useEffect(() => {
    (async () => {
      const response = await getMeaApi(() => logout);
      setuser(response);
    })();
  }, [auth]);

  const userLogin = useMemo(() => ({ user: user }), [user]);
  return (
    <AuthContext.Provider value={authData}>
      <UserContext.Provider value={userLogin}>
        <title>El porcelanito</title>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
