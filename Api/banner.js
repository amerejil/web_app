import { BASE_PATH } from "../Utils/constants";
export async function getBannerApi() {
  try {
    const url = `${BASE_PATH}/banners`;
    const reponse = await fetch(url);
    const result = await reponse.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
