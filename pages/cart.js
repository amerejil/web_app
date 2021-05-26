import { getProductByUrlApi } from "../Api/product";
import React, { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import Sumary from "../components/Cart/Summary";
import Header from "../components/header";
import useCategories from "../hooks/useCategories";
import { Loader } from "semantic-ui-react";
import AddressShipping from "../components/Cart/AddressShipping/AddressShipping";

export default function cart() {
  const [reloadCart, setreloadCart] = useState(false);
  const [products, setproducts] = useState(null);
  const { getProductsCart } = useCart();
  const { categorias } = useCategories();
  useEffect(() => {
    if (!(products?.length === 0)) {
      const products = getProductsCart();
      setproducts(products);
      setreloadCart(false);
    }
  }, [reloadCart]);
  console.log("hola component cart");

  return (
    <div className="cart">
      <Header categorias={categorias}></Header>
      {!products && <Loader active></Loader>}
      {products?.length === 0 && <EmptyCart />}
      {products?.length > 0 && (
        <FullCart
          products={products}
          reloadCart={reloadCart}
          setreloadCart={setreloadCart}
        ></FullCart>
      )}
    </div>
  );
}
function EmptyCart() {
  return (
    <div className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </div>
  );
}

function FullCart(props) {
  const { products, reloadCart, setreloadCart } = props;
  const [address, setaddress] = useState(null);
  return (
    <div className="full-cart">
      <Sumary
        products={products}
        reloadCart={reloadCart}
        setreloadCart={setreloadCart}
      ></Sumary>
      <AddressShipping setaddress={setaddress}></AddressShipping>
    </div>
  );
}
