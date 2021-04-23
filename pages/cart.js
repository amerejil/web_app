import { getProductByUrlApi } from "../Api/product";
import React, { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import Sumary from "../components/Cart/Summary";

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();
  return !products ? <EmptyCart /> : <FullCart products={products} />;
}
function EmptyCart() {
  <></>;
  return <h2>No hay productos en el carrito</h2>;
}

function FullCart(props) {
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
    <Sumary
      products={productsData}
      reloadCart={reloadCart}
      setreloadCart={setreloadCart}
    ></Sumary>
  );
}
