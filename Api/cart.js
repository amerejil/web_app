import { toast } from "react-toastify";
import { BASE_PATH, CART } from "../Utils/constants";
import { size, includes, remove } from "lodash";
export function getProductsCart() {
  const cart = localStorage.getItem(CART);
  if (!cart) {
    return [];
  } else {
    const product = JSON.parse(cart);

    return product;
  }
}
export function addProductCart(product) {
  const cart = getProductsCart();
  if (!cart) {
    Object.defineProperty(product, "quantity", {
      value: 1,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    localStorage.setItem(CART, JSON.stringify([product]));
    toast.success("Producto añadido al carrito");
  } else if (!product.color) {
    const productFound = cart.filter((item) => item.id === product.id);
    console.log(product.id);
    if (productFound.length > 0) {
      toast.warning("Este producto ya esta en el carrito");
    } else if (!product.quantity) {
      Object.defineProperty(product, "quantity", {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true,
      });
      cart.push(product);
      localStorage.setItem(CART, JSON.stringify(cart));
      toast.success("Producto añadido al carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, JSON.stringify(cart));
      toast.success("Producto añadido al carrito");
    }
  } else {
    const productFound = cart.filter(
      (item) => item.id === product.id && item.color === product.color
    );
    console.log(productFound);
    if (productFound.length > 0) {
      toast.warning("Este producto ya esta en el carrito");
    } else if (!product.quantity) {
      Object.defineProperty(product, "quantity", {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true,
      });
      cart.push(product);
      localStorage.setItem(CART, JSON.stringify(cart));
      toast.success("Producto añadido al carrito");
    } else {
      cart.push(product);
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
  if (!product.color) {
    remove(cart, (item) => {
      return item.id === product.id;
    });
  } else {
    remove(cart, (item) => {
      return item.id === product.id && item.color === product.color;
    });
  }

  if (size(cart) > 0) {
    localStorage.setItem(CART, JSON.stringify(cart));
  } else {
    localStorage.removeItem(CART);
  }
}
