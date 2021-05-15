import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";
import { toast } from "react-toastify";
import { size } from "lodash";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../Api/favorite";
import useAuth from "../../../hooks/useAuth";
import classNames from "classnames";
import useCart from "../../../hooks/useCart";
import { useRouter } from "next/router";

export default function HeaderProduct(props) {
  const { product } = props;

  const { imagen, title } = product;
  const [url, seturl] = useState(null);
  useEffect(() => {
    seturl(imagen[0].url);
    return () => {
      seturl(null);
    };
  }, [product]);

  return (
    <div className="header-product">
      <div className="img_product">
        <div className="container_img">
          <img src={url} alt={title}></img>
        </div>

        <div className="container_img_thumbnail">
          {imagen.map((i) => (
            <img
              key={i.id}
              className="img_thumbnail"
              onClick={() => seturl(i.url)}
              src={i.formats.thumbnail.url}
            ></img>
          ))}
        </div>
      </div>
      <div className="info_product">
        <Info product={product}></Info>
      </div>
    </div>
  );
}

function Info(props) {
  const r = useRouter();
  const [reloadFavorite, setreloadFavorite] = useState(false);
  const [isSelectedArrary, setSelectedArrary] = useState([]);
  const { auth, logout } = useAuth();
  const { product } = props;
  const { addProductCart } = useCart();
  const [isFavorite, setisFavorite] = useState(false);
  let array_colors = [];
  if (product.Colores) array_colors = product.Colores.split(",");
  const initialState = array_colors?.map((i) => ({
    id: i,
    estado: false,
  }));
  useEffect(() => {
    setSelectedArrary(initialState);
    return () => {};
  }, [r]);
  const info_color = isSelectedArrary.filter((i) => i.estado === true);
  const isSelect = info_color.length === 0 ? false : info_color[0].estado;
  console.log(isSelect);
  function handlecolor(color) {
    console.log("hola color");
    const temp = initialState.filter((i) => !(i.id === color));
    setSelectedArrary([...temp, { id: color, estado: true }]);
  }
  useEffect(() => {
    (async () => {
      if (auth) {
        const response = await isFavoriteApi(auth.idUser, product.id, logout);

        if (size(response) > 0) setisFavorite(true);
        else {
          setisFavorite(false);
        }
      }
    })();
    setreloadFavorite(false);
  }, [product, reloadFavorite]);
  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, product.id, logout);
      setreloadFavorite(true);
    } else {
      toast.warning("Inicia sesión para agregar a favoritos");
    }
  };
  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, product.id, logout);
      setreloadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-product_title">
        {product.title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        ></Icon>
      </div>
      <div className="header-product_delivery">Entrega en 24/48 horas</div>
      <div className="header-product_summary">
        <p>{product.summary}</p>
      </div>
      <div className="header-product_buy">
        <div className="header-product_buy-price">
          <p>
            Precio de venta al público:
            {product.discount === 0 ? null : `$${product.price}`}
          </p>
          <div className="header-product_buy-price-actions">
            {!(product.discount === 0) && <p>-{product.discount}%</p>}
            <p>
              $
              {(
                product.price -
                Math.floor(product.price * product.discount) / 100
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="container-button">
          <Button
            disabled={array_colors.length === 0 ? false : !isSelect}
            className="header-product_buy-btn"
            onClick={() => addProductCart(product)}
          >
            Comprar
          </Button>
        </div>
      </div>
      <div className="header-product_colors">
        <p className="text_option"> Escoga un color</p>
        <div className="color_container">
          {array_colors.map((color) => (
            <div
              onClick={() => handlecolor(color)}
              className="color_product"
              key={product.id + color}
              style={{
                width: "19px",
                height: "19px",
                background: color,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
