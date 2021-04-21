import React, { useState, useEffect } from "react";
import { getCategoriasApi, getSubCategoriasApi } from "../../api/Categorias";
export default function SelectSubCategorie(props) {
  const { listcategories } = props;

  let str = "";
  const [subcategories, setsubcategories] = useState([]);
  const [selected, setSelected] = useState([]);

  const onChangeHandler = (id) => () => {
    selected.includes(id)
      ? setSelected(selected.filter((x) => x !== id))
      : setSelected([...selected, id]);
  };

  useEffect(() => {
    (async () => {
      const r = await getSubCategoriasApi(str);
      setsubcategories(r);
    })();
  }, [selected]);
  selected.map((item) => {
    str = str + "url=" + item + "&";
  });

  return (
    <div className="selectcategorie">
      {listcategories.map((categorie) => (
        <div key={categorie.id}>
          <label>{categorie.title}</label>
          <input
            type="checkbox"
            name={categorie.url}
            checked={selected.includes(categorie.url)}
            onChange={onChangeHandler(categorie.url)}
          />
        </div>
      ))}
    </div>
  );
}
