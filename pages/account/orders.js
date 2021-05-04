import React from "react";
import SearchCard from "../../components/SearchCard/Searchcard";

export default function orders() {
  const item_submenu_account = [
    { url: "perfil", title: "Perfil", id: 1 },
    { url: "favorites", title: "Favoritos", id: 2 },
    { url: "orders", title: "Pedidos", id: 3 },
  ];
  return (
    <div>
      <SearchCard products={item_submenu_account}></SearchCard>
    </div>
  );
}
