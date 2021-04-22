import Header from "../../components/header";
import { useRouter } from "next/router";
import { countBy, size } from "lodash";
import SelectSubCategorie from "../../components/SelectSubCategorie";
import { BASE_PATH } from "../../Utils/constants";
import {
  getCategoriasApi,
  getTotalProductsSubCategorieApi,
  getProductsCategorieApi,
  getProductsSubcategorieApi,
  getTotalProductsCategorieApi,
} from "../../Api/Categorias";
import { useEffect, useMemo, useState } from "react";
import { Tab, Loader } from "semantic-ui-react";
import Pagination from "../../components/Pagination";
import PaginationSubcategoria from "../../components/PaginationSubcategoria";

import ListProducts from "../../components/ListProducts";
const limitPerPage = 6;

export default function Categorias() {
  const [indexsubc, setindexsubc] = useState(1);

  const { query } = useRouter();

  const [products, setproducts] = useState(null);
  const [productsSubc, setproductsSubc] = useState([]);
  const [activePage, setactivePage] = useState(1);
  const [totalproductsubc, settotalproductsubc] = useState(null);

  const [activepagesArry, setactivepagesArry] = useState([]);

  const [dataFetch, setdataFetch] = useState(null);

  const getStartItem = () => {
    const currentPages = parseInt(activePage);
    if (!activePage || currentPages === 1) return 0;
    else {
      return currentPages * limitPerPage - limitPerPage;
    }
  };

  const getStartItemSubc = (index) => {
    const currentPages = parseInt(activepagesArry[index]);
    if (!activepagesArry[index] || currentPages === 1) return 0;
    else {
      return currentPages * limitPerPage - limitPerPage;
    }
  };

  useEffect(() => {
    if (query?.categorias) {
      (async () => {
        const url = `${BASE_PATH}/categorias?url=${query.categorias}`;
        const response = await fetch(url);
        const result = await response.json();

        const r = await fetch(`${BASE_PATH}/subcategorias`);
        const subc = await r.json();

        const countTotalProducts = await getTotalProductsCategorieApi(
          query.categorias
        );
        const initialState = subc.map(() => 1);
        const data = {
          categorias: result[0],
          subcategorias: subc,
          initialState,
          totalproducts: countTotalProducts,
        };
        setdataFetch(data);
        setactivepagesArry(initialState);
      })();
    }
  }, [query.categorias]);

  useEffect(() => {
    if (query?.categorias) {
      (async () => {
        const response = await getProductsCategorieApi(
          query.categorias,
          limitPerPage,
          getStartItem()
        );
        setproducts(response);
      })();
    }
  }, [activePage, query.categorias]);

  useEffect(() => {
    if (dataFetch?.subcategorias && indexsubc > 0) {
      (async () => {
        const result = await getProductsSubcategorieApi(
          dataFetch.categorias.url,
          dataFetch.subcategorias[indexsubc - 1].url,
          limitPerPage,
          getStartItemSubc(indexsubc - 1)
        );
        setproductsSubc(result);
      })();
    }
    return () => {};
  }, [activepagesArry, indexsubc]);

  useEffect(() => {
    if (dataFetch?.subcategorias && indexsubc > 0) {
      (async () => {
        const count = await getTotalProductsSubCategorieApi(
          dataFetch.categorias.url,
          dataFetch.subcategorias[indexsubc - 1].url
        );
        settotalproductsubc(count);
      })();
    }

    return () => {
      settotalproductsubc(0);
      setproductsSubc(null);
    };
  }, [indexsubc]);

  let pane_categoria = [];
  let panes_subcategorias = [];
  let panes = [];
  if (dataFetch?.categorias) {
    pane_categoria = [
      {
        menuItem: `${dataFetch.categorias.title}`,
        render: () => (
          <Tab.Pane>
            {!products && <Loader active> Cargando productos</Loader>}
            {products && size(products) === 0 && (
              <div>No hay más {dataFetch.categorias.title}</div>
            )}
            {size(products) > 0 && (
              <ListProducts products={products}></ListProducts>
            )}
            {dataFetch.totalproducts ? (
              <Pagination
                setactivePage={setactivePage}
                totalproducts={dataFetch.totalproducts}
                page={activePage}
                limitPerPage={limitPerPage}
              ></Pagination>
            ) : null}
          </Tab.Pane>
        ),
      },
    ];
  }

  if (dataFetch?.subcategorias) {
    panes_subcategorias = dataFetch.subcategorias.map((item, i) => {
      return {
        menuItem: `${item.title}`,
        render: () => (
          <Tab.Pane>
            {!productsSubc && <Loader active> Cargando productos</Loader>}
            {productsSubc && size(productsSubc) === 0 && (
              <div>No hay más {dataFetch.categorias.title}</div>
            )}
            <ListProducts products={productsSubc}></ListProducts>
            <PaginationSubcategoria
              activepagesArry={activepagesArry}
              setactivepagesArry={setactivepagesArry}
              index={i}
              totalproducts={totalproductsubc}
              limitPerPage={limitPerPage}
            ></PaginationSubcategoria>
          </Tab.Pane>
        ),
      };
    });
    panes = [...pane_categoria, ...panes_subcategorias];
  }

  /*console.log("hola query", query.categorias);
  console.log("Hola categoria", categorias);
  console.log("hola productos", products);
  console.log("hola total productos por categoria", totalproducts);
  console.log("hola subcategorias", subcategorias);
  console.log("hola valores iniciales", activepagesArry);
  console.log("hola panes subcategorias", panes_subcategorias);
  const panes = [...pane_categoria, ...panes_subcategorias];*/

  return (
    <div className="page-categorias">
      {!dataFetch && <Loader active> Cargando página</Loader>}
      {dataFetch && (
        <>
          <Header></Header>

          <Tab
            defaultActiveIndex={0}
            menu={{
              fluid: true,
              vertical: true,
              tabular: false,
              pointing: true,
            }}
            className="tabs-categorias"
            panes={panes}
            onTabChange={(_, event) => {
              setindexsubc(event.activeIndex);
            }}
          ></Tab>
        </>
      )}
    </div>
  );
}
