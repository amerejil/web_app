import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import { getProductByUrlApi } from "../Api/product";
import HeaderProduct from "../components/Product/HeaderProduct";

import useCategories from "../hooks/useCategories";
export default function Product() {
  const { categorias } = useCategories();
  const [product, setproduct] = useState(null);
  const { query } = useRouter();
  const nav = document?.querySelector("nav.navbar");
  const NavTop = nav?.offsetTop;
  function fixnavbar() {
    if (window.scrollY >= 30) {
      document.body.style.paddingTop = "80px";

      document.body.classList.add("fixed-nav");
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove("fixed-nav");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", fixnavbar, [{ once: true }]);
    (async () => {
      const response = await getProductByUrlApi(query.product);
      setproduct(response);
    })();
    return () => {
      window.removeEventListener("scroll", fixnavbar, [{ once: true }]);
    };
  }, [query]);

  return (
    <div className="page-product">
      {product && (
        <>
          <Header categorias={categorias}></Header>
          <HeaderProduct product={product}></HeaderProduct>
        </>
      )}
    </div>
  );
}
