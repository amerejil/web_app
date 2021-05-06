import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { getPromocionesApi } from "../Api/promociones";
import Header from "../components/header/Header";
import ListProducts from "../components/ListProducts";
import useCategories from "../hooks/useCategories";

export default function promociones() {
  const [promos, setpromos] = useState(null);
  useEffect(() => {
    (async () => {
      const r = await getPromocionesApi();

      if (r?.length === 1) {
        setpromos([r[0].producto]);
      }
      if (r.length > 1) {
        const p = r?.reduce((allT, promo) => {
          return [...allT, ...[promo.producto]];
        }, []);
        setpromos(p);
      }
    })();
  }, []);

  const { categorias } = useCategories();
  return (
    <div>
      <Header categorias={categorias}></Header>
      <div className="title">Lista de promociones</div>
      <div className="data">
        {!promos && <Loader active> Cargando...</Loader>}
        {promos && size(promos) === 0 && (
          <div className="data_not-found">No hay juegos</div>
        )}
        {size(promos) > 0 && <ListProducts products={promos}></ListProducts>}
      </div>
    </div>
  );
}
