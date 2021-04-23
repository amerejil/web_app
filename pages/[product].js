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

  useEffect(() => {
    (async () => {
      const response = await getProductByUrlApi(query.product);
      setproduct(response);
    })();
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
