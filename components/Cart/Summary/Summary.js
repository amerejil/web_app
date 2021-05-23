import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import useCart from "../../../hooks/useCart";
import { forEach, map } from "lodash";
import Quantity from "../../Quantity/Quantity";
//import { removeProductCart } from "../../../api/cart";

export default function Summary(props) {
  const { products, reloadCart, setreloadCart } = props;

  const [totalPrice, settotalPrice] = useState(0);
  const { removeProductCart } = useCart();

  useEffect(() => {
    let price = 0;
    forEach(products, (produt) => {
      price += produt.price * produt.quantity;
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
        <Table fixed celled structured unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Productos</Table.HeaderCell>
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Cantidad</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product, index) => {
              return (
                <Table.Row key={product.id} className="summary-cart_product">
                  <Table.Cell verticalAlign="top">
                    <Icon
                      circular
                      name="trash"
                      link
                      onClick={() => removeProduct(product)}
                    ></Icon>
                    {product.color && (
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          background: product.color,
                        }}
                      ></div>
                    )}
                    <Image
                      src={product.imagen[0].formats.thumbnail.url}
                      alt={product.title}
                    ></Image>
                    {product.title}
                  </Table.Cell>
                  <Table.Cell>{product.categoria.title}</Table.Cell>
                  <Table.Cell>
                    <Quantity
                      c={product.quantity}
                      setreloadCart={setreloadCart}
                      id={product.url}
                      index={index}
                    ></Quantity>
                  </Table.Cell>
                  <Table.Cell>
                    ${(product.price * product.quantity).toFixed(2)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
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
