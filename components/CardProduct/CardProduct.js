import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Icon, Image } from "semantic-ui-react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { getProductsCart } from "../../Api/cart";
import { size, includes } from "lodash";
import {
  addFavoriteApi,
  deleteFavoriteApi,
  isFavoriteApi,
} from "../../Api/favorite";

export default function CardProduct(props) {
  const { product } = props;
  const [reloadFavorite, setreloadFavorite] = useState(false);
  const [isFavorite, setisFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart, removeProductCart } = useCart();
  const cart = getProductsCart();
  const productFound = cart?.filter((item) => item.id === product.id);

  useEffect(() => {
    if (auth) {
      (async () => {
        const response = await isFavoriteApi(auth.idUser, product.id, logout);

        if (size(response) > 0) setisFavorite(true);
        else {
          setisFavorite(false);
        }
      })();
    }

    setreloadFavorite(false);
  }, [auth, reloadFavorite]);

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
    <div className="card_product">
      <div className="card__name">
        <p>{product.title}</p>
      </div>
      <div className="card_product_absolute">
        <Link href={`/${product.url}`}>
          <a>
            <Image
              loading="lazy"
              className="imagen"
              src={
                product.imagen[0].formats.small
                  ? product.imagen[0].formats.small.url
                  : product.imagen[0].formats.thumbnail.url
              }
              alt={product.title}
            ></Image>
          </a>
        </Link>

        <div className="card__precis">
          <div className="card__icon heart">
            <i
              className={isFavorite ? "far fa-heart pink_ " : "far fa-heart"}
              onClick={isFavorite ? deleteFavorite : addFavorite}
            ></i>

            <i
              className={isFavorite ? "fas fa-heart fill" : "fas fa-heart"}
            ></i>
          </div>

          <div className="card_price">
            {product.discount && product.discount > 0 ? (
              <span className="card__preci--before">${product.price}</span>
            ) : null}
            <span className="card__preci--now">
              $
              {(
                product.price -
                Math.floor(product.price * product.discount) / 100
              ).toFixed(2)}
            </span>
          </div>
          <div className="card__icon cart">
            <i
              className={
                productFound?.length > 0
                  ? "fas fa-shopping-cart pink"
                  : "fas fa-shopping-cart"
              }
              onClick={
                !(productFound?.length > 0)
                  ? () => addProductCart(product)
                  : () => removeProductCart(product)
              }
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
