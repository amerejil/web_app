import { size } from "lodash";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Icon } from "semantic-ui-react";
let pila = [];
import { searchProductApi } from "../../Api/product";
import SearchCard from "../SearchCard/Searchcard";
export default function Search() {
  const [str, setstr] = useState("");
  const [products, setproducts] = useState(null);
  const [searchActive, setsearchActive] = useState(false);
  useEffect(() => {
    (async () => {
      if (size(str) === 0) {
        setproducts(null);
      }
      if (str?.length > 0) {
        const product = await searchProductApi(str);

        setproducts(product);
      }
    })();
  }, [size(str)]);

  return (
    <div
      className="search-box"
      onMouseLeave={() => setsearchActive(false)}
      onMouseEnter={() => setsearchActive(true)}
    >
      <input
        id="search-product"
        type="text"
        placeholder="Buscar"
        onChange={(data) => {
          setTimeout(() => {
            setstr(data.target.value);
          }, 280);
        }}
      ></input>
      <div className="icon">
        <Icon className="search"></Icon>
      </div>
      {searchActive && <SearchCard products={products}></SearchCard>}
    </div>
  );
}
