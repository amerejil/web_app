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
  const [reloadFavorite, setreloadFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const { product } = props;
  const { addProductCart } = useCart();
  const [isFavorite, setisFavorite] = useState(false);
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
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,"
        </p>
      </div>
      <div className="header-product_buy">
        <div className="header-product_buy-price">
          <p>Precio de venta al público: ${product.price}</p>
          <div className="header-product_buy-price-actions">
            <p>-{product.discount}%</p>
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
            className="header-product_buy-btn"
            onClick={() => addProductCart(product)}
          >
            Comprar
          </Button>
        </div>
      </div>
      <div className="header-product_colors"></div>
    </>
  );
}
