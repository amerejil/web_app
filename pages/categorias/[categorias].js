import Header from "../../components/header";
import { useRouter } from "next/router";
import { size } from "lodash";
import SelectSubCategorie from "../../components/SelectSubCategorie";
import {
  getCategoriasApi,
  getProductsCategorieApi,
  getTotalProductsCategorieApi,
} from "../../Api/Categorias";
import { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import Pagination from "../../components/Pagination";
import PaginationSubcategoria from "../../components/PaginationSubcategoria";
import { Loader } from "semantic-ui-react";
import ListProducts from "../../components/ListProducts";
const limitPerPage = 1;

export default function Categorias(props) {
  const { categorias, subcategorias, totalproducts } = props;
  const { query } = useRouter();
  const [products, setproducts] = useState(null);
  const [activePage, setactivePage] = useState(1);
  const getStartItem = () => {
    const currentPages = parseInt(activePage);
    if (!activePage || currentPages === 1) return 0;
    else {
      return currentPages * limitPerPage - limitPerPage;
    }
  };
  useEffect(() => {
    if (query.categorias) {
      (async () => {
        const response = await getProductsCategorieApi(
          query.categorias,
          limitPerPage,
          getStartItem()
        );
        setproducts(response);
      })();
    }
  }, [activePage]);

  const pane_categoria = [
    {
      menuItem: `${categorias.title}`,
      render: () => (
        <Tab.Pane>
          {!products && <Loader active> Cargando juegos</Loader>}
          {products && size(products) === 0 && (
            <div>No hay más {categorias.title}</div>
          )}
          {size(products) > 0 && (
            <ListProducts products={products}></ListProducts>
          )}
          {totalproducts ? (
            <Pagination
              setactivePage={setactivePage}
              totalproducts={totalproducts}
              page={activePage}
              limitPerPage={limitPerPage}
            ></Pagination>
          ) : null}
        </Tab.Pane>
      ),
    },
  ];
  const initialState = subcategorias.map(() => 1);

  const [activepages, setactivePages] = useState(1);
  const [activepagesArry, setactivepagesArry] = useState(initialState);
  console.log(activepagesArry);
  const panes_subcategorias = subcategorias.map((item, i) => {
    return {
      menuItem: `${item.title}`,
      render: () => (
        <Tab.Pane>
          <PaginationSubcategoria
            activepagesArry={activepagesArry}
            activepages={activepages}
            setactivepagesArry={setactivepagesArry}
            index={i}
            setactivePages={setactivePages}
            totalproducts={totalproducts}
            limitPerPage={1}
          ></PaginationSubcategoria>
        </Tab.Pane>
      ),
    };
  });

  const panes = [...pane_categoria, ...panes_subcategorias];

  if (!products) return null;

  return (
    <div className="page-categorias">
      <Header></Header>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: false, pointing: true }}
        className="tabs-categorias"
        panes={panes}
      ></Tab>
    </div>
  );
}

import { BASE_PATH } from "../../Utils/constants";
export async function getStaticProps(contex) {
  try {
    const url = `${BASE_PATH}/categorias?url=${contex.params.categorias}`;
    const response = await fetch(url);
    const r = await fetch(`${BASE_PATH}/subcategorias`);
    const count = await getTotalProductsCategorieApi(contex.params.categorias);
    const a = await r.json();
    const result = await response.json();

    return {
      props: {
        categorias: result[0],
        subcategorias: a,
        totalproducts: count,
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
