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
              src={product.imagen.formats.thumbnail.url}
              alt={product.title}
            ></Image>
          </a>
        </Link>

        <div className="card__precis">
          <div className="card__icon heart">
            <Icon
              className={isFavorite ? "heart outline pink_ " : "heart outline"}
              onClick={isFavorite ? deleteFavorite : addFavorite}
            ></Icon>
            <Icon className={isFavorite ? "heart fill" : "heart"}></Icon>
          </div>

          <div className="card_price">
            <span className="card__preci--before">$0.00</span>
            <span className="card__preci--now">${product.price}</span>
          </div>
          <div className="card__icon cart">
            <Icon
              className={productFound?.length > 0 ? "cart pink" : "cart"}
              onClick={
                !(productFound?.length > 0)
                  ? () => addProductCart(product)
                  : () => removeProductCart(product)
              }
            ></Icon>
          </div>
        </div>
      </div>
    </div>
  );
}
