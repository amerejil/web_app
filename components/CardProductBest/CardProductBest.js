import React from "react";
import { Icon, Image } from "semantic-ui-react";
export default function CardProductBest() {
  return (
    <div className="card_productB">
      <div className="card_product_absolute">
        <Image className="imagen" src="/Img2_.png" alt=""></Image>
        <div className="card__precis">
          <div className="card__icon">
            <Icon className="heart outline"></Icon>
          </div>

          <div className="card_price">
            <span className="card__preci--before">$0.00</span>
            <span className="card__preci--now">$0.00</span>
          </div>
          <div className="card__icon">
            <Icon className="cart"></Icon>
          </div>
        </div>
      </div>
      <div className="card__name">
        <p>Nombre</p>
      </div>
    </div>
  );
}
