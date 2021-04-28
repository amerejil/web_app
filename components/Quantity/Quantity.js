import React, { useEffect, useState } from "react";
import { CART } from "../../Utils/constants";
import { Icon, Input } from "semantic-ui-react";
import { getProductsCart } from "../../Api/cart";
export default function Quantity(props) {
  let { setreloadCart, id, c, index } = props;
  const [count, setcount] = useState(c);
  const cart = getProductsCart();
  let temp1 = [];
  if (cart) {
    temp1 = [...cart];
  }
  function onclick_minus() {
    if (count > 1) {
      temp1[index].quantity = parseInt(count) - 1;

      localStorage.setItem(CART, JSON.stringify(temp1));
      setcount(count - 1);
      setreloadCart(true);
    }
  }
  function onclick_add() {
    if (count > 0) {
      temp1[index].quantity = parseInt(count) + 1;
      localStorage.setItem(CART, JSON.stringify(temp1));
      setcount(count + 1);
      setreloadCart(true);
    }
  }
  const handleInput = (event) => {
    const temp = parseInt(event.value);
    setcount("");
    if (!temp) {
      temp1[index].quantity = 1;
      localStorage.setItem(CART, JSON.stringify(temp1));
      setreloadCart(true);
    }

    if (temp > 0) {
      temp1[index].quantity = temp;
      localStorage.setItem(CART, JSON.stringify(temp1));
      setcount(temp);
      setreloadCart(true);
    }
  };
  return (
    <div className="quantity">
      <Icon circular onClick={() => onclick_add()} name="add"></Icon>
      <Input onChange={(_, event) => handleInput(event)} value={count}>
        <input />
      </Input>
      <Icon circular onClick={() => onclick_minus()} name="minus"></Icon>
    </div>
  );
}
