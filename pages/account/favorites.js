import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { getFavoriteApi } from "../../Api/favorite";
import useAuth from "../../hooks/useAuth";
import ListProducts from "../../components/ListProducts";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import Header from "../../components/header";
import useCategories from "../../hooks/useCategories";
export default function favorites() {
  const { auth, logout } = useAuth();
  const [games, setgames] = useState(null);
  const { categorias } = useCategories();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth?.idUser, logout);
      if (size(response) > 0) {
        const gamesList = [];
        forEach(response, (data) => {
          gamesList.push(data.producto);
        });

        setgames(gamesList);
      } else {
        setgames([]);
      }
    })();
  }, []);
  if (!auth) {
    router.replace("/");
    return null;
  }
  return (
    <div className="whishlist_block">
      <Header categorias={categorias}> </Header>
      <div className="title">Lista de favoritos</div>
      <div className="data">
        {!games && <Loader active> Cargando juegos</Loader>}
        {games && size(games) === 0 && (
          <div className="data_not-found">No hay juegos</div>
        )}
        {size(games) > 0 && <ListProducts products={games}></ListProducts>}
      </div>
    </div>
  );
}
