import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { getFavoriteApi } from "../../Api/favorite";
import useAuth from "../../hooks/useAuth";
import ListProducts from "../../components/ListProducts";
import { Loader } from "semantic-ui-react";

export default function favorites() {
  const { auth, logout } = useAuth();
  const [games, setgames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      console.log(response);
      if (size(response) > 0) {
        const gamesList = [];
        forEach(response, (data) => {
          gamesList.push(data.producto);
        });
        console.log(gamesList);
        setgames(gamesList);
      } else {
        setgames([]);
      }
    })();
  }, []);
  console.log(auth);
  return (
    <div className="whishlist_block">
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
