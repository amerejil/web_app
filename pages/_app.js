import "../scss/global.scss";
import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCategoriasApi } from "../Api/Categorias";
import jwtDecode from "jwt-decode";
import Cartcontext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import CategoriesContext from "../context/CategoriesContext";
import { getMeaApi } from "../Api/user";
import { setToken, getToken, removeToken } from "../Api/token";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {
  addProductCart,
  getProductsCart,
  countProductsCart,
  removeProductCart,
} from "../Api/cart";

export default function MyApp({ Component, pageProps }) {
  const [totalProductsCart, settotalProductsCart] = useState(0);
  const [categorias, setcategorias] = useState(null);
  const [reloadCart, setreloadCart] = useState(false);
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

  useEffect(() => {
    settotalProductsCart(countProductsCart());
    setreloadCart(false);
  }, [reloadCart, auth]);

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

  const addProduct = (product) => {
    addProductCart(product);
    setreloadCart(true);
  };
  const removeProduct = (product) => {
    removeProductCart(product);
    setreloadCart(true);
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

  useEffect(() => {
    (async () => {
      const response = await getCategoriasApi();
      setcategorias(response);
    })();
  }, []);

  const cartData = useMemo(
    () => ({
      prouductsCart: totalProductsCart,
      addProductCart: (proudct) => addProduct(proudct),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: () => null,
    }),
    [auth, totalProductsCart]
  );
  const categoriesData = useMemo(() => ({ categorias }), [categorias]);
  console.log(categorias);
  const userLogin = useMemo(() => ({ user: user }), [user]);
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <UserContext.Provider value={userLogin}>
        <CategoriesContext.Provider value={categoriesData}>
          <Cartcontext.Provider value={cartData}>
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
          </Cartcontext.Provider>
        </CategoriesContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
