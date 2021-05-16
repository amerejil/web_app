import React from "react";
import Header from "../components/header";
import useCategories from "../hooks/useCategories";

export default function terms() {
  const { categorias } = useCategories();
  return (
    <div>
      <Header categorias={categorias}></Header>
    </div>
  );
}
