import { BASE_PATH } from "../Utils/constants";
import { authFech } from "../Utils/fetch";
import { size } from "lodash";
export async function isFavoriteApi(idUser, idproduct, logout) {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}&producto=${idproduct}`;
    return await authFech(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(idUser, idproduct, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idproduct, logout);
    if (size(dataFound) > 0 || !dataFound) {
      return "Este juego ya lo tienes en tu lista de favoritos";
    } else {
      const url = `${BASE_PATH}/favorites`;
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: idUser, producto: idproduct }),
      };
      const result = await authFech(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(idUser, idproduct, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idproduct, logout);
    if (size(dataFound) > 0 || !dataFound) {
      const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const result = await authFech(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}`;
    const result = await authFech(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
