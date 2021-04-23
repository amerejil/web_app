import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import useCart from "../../../hooks/useCart";
import { forEach, map } from "lodash";
//import { removeProductCart } from "../../../api/cart";

export default function Summary(props) {
  const { products, reloadCart, setreloadCart } = props;
  const [totalPrice, settotalPrice] = useState(0);
  const { removeProductCart } = useCart();
  useEffect(() => {
    let price = 0;
    forEach(products, (produt) => {
      price += produt.price;
    });
    settotalPrice(price);
  }, [products, reloadCart]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setreloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>
      <div className="data">
        <Table celled structured unstackable="true">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Productos</Table.HeaderCell>
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart_product">
                <Table.Cell verticalAlign="top">
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  ></Icon>
                  <Image
                    src={product.imagen.formats.small.url}
                    alt={product.title}
                  ></Image>
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.categoria.title}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
              </Table.Row>
            ))}
            <Table.Row className="summary-cart_resume">
              <Table.Cell colSpan="3">Total:</Table.Cell>
              <Table.Cell className="total-price">
                ${totalPrice.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
