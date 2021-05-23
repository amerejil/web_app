import Header from "../components/header";
import Section_1 from "../components/Sections/Section_1";
import Section_2 from "../components/Sections/Section_2";
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import Productos_Destacados from "../components/Sections/Productos_Destacados";
import useCategories from "../hooks/useCategories";
import { getBannerApi } from "../Api/banner";
import { useRouter } from "next/router";
import Footer from "../components/Sections/Footer";
import Seo from "../components/Seo";

export default function Home() {
  const r = useRouter();
  const [banners, setbanners] = useState(null);
  const { categorias } = useCategories();
  useEffect(() => {
    (async () => {
      const response = await getBannerApi();
      setbanners(response);
    })();
  }, [r]);
  return (
    <div className="home">
      {!categorias && !banners && <Loader active> Cargando página</Loader>}

      {categorias && banners && (
        <>
          <Header categorias={categorias}></Header>
          <Section_1 banners={banners}></Section_1>
          <Section_2 categorias={categorias}></Section_2>
          <Productos_Destacados></Productos_Destacados>
          <Footer></Footer>
        </>
      )}
    </div>
  );
}
