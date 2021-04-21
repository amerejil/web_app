import Header from "../../components/header";
import { useRouter } from "next/router";
import { countBy, size } from "lodash";
import SelectSubCategorie from "../../components/SelectSubCategorie";
import { BASE_PATH } from "../../utils/constants";
import {
  getCategoriasApi,
  getTotalProductsSubCategorieApi,
  getProductsCategorieApi,
  getProductsSubcategorieApi,
  getTotalProductsCategorieApi,
} from "../../api/Categorias";
import { useEffect, useState } from "react";
import { Tab, Loader } from "semantic-ui-react";
import Pagination from "../../components/Pagination";
import PaginationSubcategoria from "../../components/PaginationSubcategoria";

import ListProducts from "../../components/ListProducts";
const limitPerPage = 6;

export default function Categorias() {
  const [indexsubc, setindexsubc] = useState(1);
  const [totalproducts, settotalproducts] = useState(null);
  const { query } = useRouter();
  const [subcategorias, setsubcategorias] = useState(null);
  const [categorias, setcategorias] = useState(null);
  const [products, setproducts] = useState(null);
  const [productsSubc, setproductsSubc] = useState([]);
  const [activePage, setactivePage] = useState(1);
  const [totalproductsubc, settotalproductsubc] = useState(null);

  const [activepagesArry, setactivepagesArry] = useState([]);

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
        setcategorias(result[0]);
        const r = await fetch(`${BASE_PATH}/subcategorias`);
        const subc = await r.json();
        setsubcategorias(subc);
        const countTotalProducts = await getTotalProductsCategorieApi(
          query.categorias
        );
        const initialState = subc.map(() => 1);
        setactivepagesArry(initialState);
        settotalproducts(countTotalProducts);
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
    if (subcategorias && indexsubc > 0) {
      (async () => {
        const result = await getProductsSubcategorieApi(
          categorias.url,
          subcategorias[indexsubc - 1].url,
          limitPerPage,
          getStartItemSubc(indexsubc - 1)
        );
        setproductsSubc(result);
      })();
    }
    return () => {};
  }, [activepagesArry, indexsubc]);

  useEffect(() => {
    if (subcategorias && indexsubc > 0) {
      (async () => {
        const count = await getTotalProductsSubCategorieApi(
          categorias.url,
          subcategorias[indexsubc - 1].url
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
  if (categorias) {
    pane_categoria = [
      {
        menuItem: `${categorias.title}`,
        render: () => (
          <Tab.Pane>
            {!products && <Loader active> Cargando productos</Loader>}
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
  }

  if (subcategorias) {
    panes_subcategorias = subcategorias.map((item, i) => {
      return {
        menuItem: `${item.title}`,
        render: () => (
          <Tab.Pane>
            {!productsSubc && <Loader active> Cargando productos</Loader>}
            {productsSubc && size(productsSubc) === 0 && (
              <div>No hay más {categorias.title}</div>
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
  }
  const panes = [...pane_categoria, ...panes_subcategorias];
  /*console.log("hola query", query.categorias);
  console.log("Hola categoria", categorias);
  console.log("hola productos", products);
  console.log("hola total productos por categoria", totalproducts);
  console.log("hola subcategorias", subcategorias);
  console.log("hola valores iniciales", activepagesArry);
  console.log("hola panes subcategorias", panes_subcategorias);
  const panes = [...pane_categoria, ...panes_subcategorias];*/
  if (!products) return null;
  return (
    <div className="page-categorias">
      <Header></Header>
      <Tab
        defaultActiveIndex={0}
        menu={{ fluid: true, vertical: true, tabular: false, pointing: true }}
        className="tabs-categorias"
        panes={panes}
        onTabChange={(_, event) => {
          setindexsubc(event.activeIndex);
        }}
      ></Tab>
    </div>
  );
}
