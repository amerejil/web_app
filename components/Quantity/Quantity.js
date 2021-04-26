import React, { useEffect, useState } from "react";
import { CART } from "../../Utils/constants";
import { Icon } from "semantic-ui-react";
import { getProductsCart } from "../../Api/cart";
export default function Quantity(props) {
  let { setreloadCart, id, c, index } = props;
  const [count, setcount] = useState(c);
  const cart = getProductsCart();
  const temp1 = [...cart];
  function onclick_minus() {
    if (count > 1) {
      temp1[index].quantity = count - 1;
      console.log(temp1[index]);

      localStorage.setItem(CART, JSON.stringify(temp1));
      setcount(count - 1);
      setreloadCart(true);
    }
  }
  function onclick_add() {
    temp1[index].quantity = count + 1;
    localStorage.setItem(CART, JSON.stringify(temp1));
    setcount(count + 1);
    setreloadCart(true);
  }

  return (
    <div>
      <Icon onClick={() => onclick_minus()} name="minus"></Icon>
      <div>{count}</div>
      <Icon onClick={() => onclick_add()} name="add"></Icon>
    </div>
  );
}
