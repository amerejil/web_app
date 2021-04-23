import { BASE_PATH } from "../Utils/constants";
export async function getProductByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/productos?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
