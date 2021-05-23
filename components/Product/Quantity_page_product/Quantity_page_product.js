import React, { useEffect, useState } from "react";
import { CART } from "../../../Utils/constants";
import { Icon, Input } from "semantic-ui-react";
import { getProductsCart } from "../../../Api/cart";
export default function Quantity_page_product(props) {
  const { setquantity, quantity } = props;

  function onclick_add() {
    if (quantity > 0) {
      setquantity(quantity + 1);
    }
  }

  const handleInput = (event) => {
    const temp = parseInt(event.value);
    setquantity("");

    if (temp > 0) {
      setquantity(temp);
    }
  };

  function onclick_minus() {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  }

  return (
    <div className="quantity_product">
      <Icon onClick={() => onclick_add()} name="add"></Icon>
      <Input onChange={(_, event) => handleInput(event)} value={quantity}>
        <input />
      </Input>
      <Icon onClick={() => onclick_minus()} name="minus"></Icon>
    </div>
  );
}
