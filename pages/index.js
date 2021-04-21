import Header from "../components/header";
import Section_1 from "../components/Sections/Section_1";
import Section_2 from "../components/Sections/Section_2";
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import Productos_Destacados from "../components/Sections/Productos_Destacados";
import useUser from "../hooks/useUser";

export default function Home() {
  const [categorias, setcategorias] = useState(null);

  return (
    <div className="home">
      <Header></Header>
      <Section_1></Section_1>
      <Section_2 categorias={categorias}></Section_2>
      <Productos_Destacados></Productos_Destacados>
    </div>
  );
}
