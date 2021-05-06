import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getDestacadosApi } from "../../../Api/destacados";

import CardProductBest from "../../../components/CardProductBest";
import CardProduct from "../../CardProduct/CardProduct";

export default function Productos_Destacados() {
  const [destacados, setdestacados] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getDestacadosApi();
      if (response.length === 1) {
        setdestacados([response[0].producto]);
      } else {
        const d = response.reduce((allT, dest) => {
          return [...allT, ...[dest.producto]];
        }, []);
        setdestacados(d);
      }
    })();
  }, []);

  return (
    <section className="products" id="sect-3">
      <div className="section-title">Productos Destacados</div>
      <div className="CardProduct-container">
        {destacados?.map((card) => (
          <CardProduct product={card} key={card.id}></CardProduct>
        ))}
      </div>
    </section>
  );
}
