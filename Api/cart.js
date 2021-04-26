import { toast } from "react-toastify";
import { BASE_PATH, CART } from "../Utils/constants";
import { size, includes, remove } from "lodash";
export function getProductsCart() {
  const cart = localStorage.getItem(CART);
  if (!cart) {
    return null;
  } else {
    const product = JSON.parse(cart);

    return product;
  }
}
export function addProductCart(product) {
  const cart = getProductsCart();
  if (!cart) {
    localStorage.setItem(
      CART,
      JSON.stringify([{ product: product, quantity: 1 }])
    );
    toast.success("Producto añadido al carrito");
  } else {
    const productFound = cart.filter((item) => item.product === product);

    if (productFound.length > 0) {
      toast.warning("Este producto ya esta en el carrito");
    } else {
      cart.push({ product, quantity: 1 });
      localStorage.setItem(CART, JSON.stringify(cart));
      toast.success("Producto añadido al carrito");
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart();
  remove(cart, (item) => {
    return item.product === product;
  });
  if (size(cart) > 0) {
    localStorage.setItem(CART, JSON.stringify(cart));
  } else {
    localStorage.removeItem(CART);
  }
}
