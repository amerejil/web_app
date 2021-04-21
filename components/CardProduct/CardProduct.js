import React from "react";
import Link from "next/link";
import { Icon, Image } from "semantic-ui-react";
export default function CardProduct(props) {
  const { product } = props;
  return (
    <div className="card_product">
      <div className="card__name">
        <p>{product.title}</p>
      </div>
      <div className="card_product_absolute">
        <Link href={`/${product.url}`}>
          <a>
            <Image
              className="imagen"
              src={product.imagen.formats.small.url}
              alt={product.title}
            ></Image>
          </a>
        </Link>

        <div className="card__precis">
          <div className="card__icon">
            <Icon className="heart outline"></Icon>
          </div>

          <div className="card_price">
            <span className="card__preci--before">$0.00</span>
            <span className="card__preci--now">${product.price}</span>
          </div>
          <div className="card__icon">
            <Icon className="cart"></Icon>
          </div>
        </div>
      </div>
    </div>
  );
}
