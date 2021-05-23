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
import Quantity_page_product from "../Quantity_page_product";

export default function HeaderProduct(props) {
  const { product } = props;
  const [selectColor, setselectColor] = useState("");
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
        <Info product={product} setselectColor={setselectColor}></Info>
      </div>
    </div>
  );
}

function Info(props) {
  const r = useRouter();
  const [quantity, setquantity] = useState(1);
  const [reloadFavorite, setreloadFavorite] = useState(false);
  const [isSelectedArrary, setSelectedArrary] = useState([]);
  const { auth, logout } = useAuth();
  const { product, setselectColor } = props;
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
    setquantity(1);
    return () => {};
  }, [r]);

  useEffect(() => {
    if (product.quantity) {
      product.quantity = quantity;
    } else {
      Object.defineProperty(product, "quantity", {
        value: quantity,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  }, [quantity]);

  const info_color = isSelectedArrary.filter((i) => i.estado === true);
  const isSelect = info_color.length === 0 ? false : info_color[0].estado;
  //console.log(isSelect);
  function hadleSelectColor(color) {
    const temp = isSelectedArrary.filter((i) => i.id === color);

    return temp[0]?.estado;
  }
  function handlecolor(i) {
    const temp = initialState;
    temp[i].estado = true;
    setSelectedArrary(temp);
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
  // console.log(product);
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
      {!(array_colors.length === 0) && (
        <div className="header-product_colors">
          <p className="text_option"> Escoga un color</p>
          <div className="colors_container">
            {array_colors.map((color, i) => (
              <div
                key={product.id + color}
                className="single_color_container"
                style={{
                  border: isSelectedArrary[i]?.estado
                    ? `1px solid #202040`
                    : `1px solid #ffffff`,
                }}
              >
                <div
                  onClick={() => handlecolor(i)}
                  className="color_product"
                  style={{
                    width: "20px",
                    height: "20px",
                    background: color,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
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
        <div className="quantity_container">
          <Quantity_page_product
            setquantity={setquantity}
            quantity={quantity}
          ></Quantity_page_product>
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
    </>
  );
}
