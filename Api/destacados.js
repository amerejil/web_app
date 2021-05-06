import { BASE_PATH } from "../Utils/constants";

export async function getDestacadosApi() {
  try {
    const url = `${BASE_PATH}/destacados`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
