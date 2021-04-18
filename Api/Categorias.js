import { BASE_PATH } from "../Utils/constants";
export async function getCategoriasApi() {
  try {
    const url = `${BASE_PATH}/categorias?_sort=position:asc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSubCategoriasApi(u) {
  try {
    const url = `${BASE_PATH}/categorias?${u}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsCategorieApi(categorie, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = "_sort=createdAt:desc";
    const startItems = `_start=${start}`;
    const url = ` ${BASE_PATH}/productos?categoria.url=${categorie}&${limitItems}&${sortItem}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalProductsCategorieApi(categorie) {
  try {
    const url = `${BASE_PATH}/productos/count?categoria.url=${categorie}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsSubcategorieApi(subcategoria, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = "_sort=createdAt:desc";
    const startItems = `_start=${start}`;
    const url = ` ${BASE_PATH}/productos?subcategoria.url=${subcategoria}&${limitItems}&${sortItem}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalProductsSubCategorieApi(subcategorie) {
  try {
    const url = `${BASE_PATH}/productos/count?subcategoria.url=${subcategorie}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
