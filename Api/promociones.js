import { BASE_PATH } from "../Utils/constants";

export async function getPromocionesApi() {
  try {
    const url = `${BASE_PATH}/promociones`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
