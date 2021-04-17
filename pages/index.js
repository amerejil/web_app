import Header from "../components/header";
import Section_1 from "../components/Sections/Section_1";
import Section_2 from "../components/Sections/Section_2";
import React, { useState, useEffect } from "react";
import Productos_Destacados from "../components/Sections/Productos_Destacados";

export default function Home(props) {
  const { categorias } = props;

  return (
    <div className="home">
      <Header></Header>
      <Section_1></Section_1>
      <Section_2 categorias={categorias}></Section_2>
      <Productos_Destacados></Productos_Destacados>
    </div>
  );
}
import { BASE_PATH } from "../Utils/constants";
export async function getStaticProps() {
  try {
    const url = `${BASE_PATH}/categorias?_sort=position:asc`;
    const response = await fetch(url);
    const result = await response.json();
    return {
      props: {
        categorias: result,
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
