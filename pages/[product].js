import React from "react";
import Header from "../components/header";
import {
  getCategoriasApi,
  getProductsCategorieApi,
  getTotalProductsCategorieApi,
} from "../Api/Categorias";
export default function Product() {
  return (
    <>
      <Header></Header>
      <div>Hola</div>
    </>
  );
}
import { BASE_PATH } from "../Utils/constants";
export async function getStaticPaths() {
  const url = ` ${BASE_PATH}/productos`;
  const response = await fetch(url);
  const result = await response.json();
  const paths = result.map((item) => ({
    params: { product: `${item.url}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(contex) {
  return {
    props: {},
  };
}
