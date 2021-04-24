import { getProductByUrlApi } from "../Api/product";
import React, { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import Sumary from "../components/Cart/Summary";
import Header from "../components/header";
import useCategories from "../hooks/useCategories";

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();
  return !products ? <EmptyCart /> : <FullCart products={products} />;
}
function EmptyCart() {
  const { categorias } = useCategories();
  return (
    <div className="empty-cart">
      <Header categorias={categorias}></Header>
      <h2>No hay productos en el carrito</h2>
    </div>
  );
}

function FullCart(props) {
  const { categorias } = useCategories();
  const { products } = props;
  const [productsData, setproductsData] = useState(null);
  const [reloadCart, setreloadCart] = useState(false);
  const [address, setaddress] = useState(null);
  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getProductByUrlApi(product);
        productsTemp.push(data);
      }
      setproductsData(productsTemp);
    })();
    setreloadCart(false);
  }, [reloadCart]);

  return (
    <div className="full-cart">
      <Header categorias={categorias}></Header>
      <Sumary
        products={productsData}
        reloadCart={reloadCart}
        setreloadCart={setreloadCart}
      ></Sumary>
    </div>
  );
}
