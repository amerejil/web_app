import { createContext } from "react";
const Cartcontext = createContext({
  prouductsCart: 0,
  addProductCart: () => null,
  getProductsCart: () => null,
  removeProductCart: () => null,
  removeAllProductsCart: () => null,
});
export default Cartcontext;
