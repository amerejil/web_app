import { BASE_PATH } from "../Utils/constants";
import { authFech } from "../Utils/fetch";
export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFech(url, params, logout);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getAddressesApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?user=${idUser}`;
    const result = await authFech(url, null, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteAddressApi(idAddress, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFech(url, params, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFech(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
