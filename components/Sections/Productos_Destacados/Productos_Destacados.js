import React from "react";
import Slider from "react-slick";

import CardProductBest from "../../../components/CardProductBest";

export default function Productos_Destacados() {
  const cards = [0, 0, 0, 0];

  return (
    <section className="products" id="sect-3">
      <div className="section-title">Productos Destacados</div>
      <div className="CardProduct-container">
        {cards.map((card) => (
          <CardProductBest></CardProductBest>
        ))}
      </div>
    </section>
  );
}
