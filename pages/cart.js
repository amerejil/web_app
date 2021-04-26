import { getProductByUrlApi } from "../Api/product";
import React, { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import Sumary from "../components/Cart/Summary";
import Header from "../components/header";
import useCategories from "../hooks/useCategories";

export default function cart() {
  const [reloadCart, setreloadCart] = useState(false);
  const { getProductsCart } = useCart();
  console.log("hola component cart");
  const products = getProductsCart();
  return !products ? (
    <EmptyCart />
  ) : (
    <FullCart
      products={products}
      setreloadCart={setreloadCart}
      reloadCart={reloadCart}
    />
  );
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
  const { products, reloadCart, setreloadCart } = props;
  const [productsData, setproductsData] = useState(null);

  const [address, setaddress] = useState(null);
  const [initialQuantityArray, setinitialQuantityArray] = useState(null);
  useEffect(() => {
    const initialArray = products.map((item, index) => ({ id: index, q: 1 }));
    setinitialQuantityArray(initialArray);
  }, []);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getProductByUrlApi(product.product);
        Object.defineProperty(data, "quantity", {
          value: product.quantity,
          writable: true,
          enumerable: true,
          configurable: true,
        });

        productsTemp.push(data);
      }
      setproductsData(productsTemp);
    })();
    setreloadCart(false);
  }, [reloadCart]);

  return (
    products && (
      <div className="full-cart">
        <Header categorias={categorias}></Header>
        <Sumary
          initialQuantityArray={initialQuantityArray}
          setinitialQuantityArray={setinitialQuantityArray}
          products={productsData}
          reloadCart={reloadCart}
          setreloadCart={setreloadCart}
        ></Sumary>
      </div>
    )
  );
}
