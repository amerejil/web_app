import { BASE_PATH } from "../utils/constants";
import { authFech } from "../utils/fetch";
export async function registerApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const reponse = await fetch(url, params);
    const result = await reponse.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function loginApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const reponse = await fetch(url, params);
    const result = await reponse.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function resetPasswordApi(email) {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const reponse = await fetch(url, params);
    const result = await reponse.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeaApi(logout) {
  try {
    const url = `${BASE_PATH}/users/me`;
    const result = await authFech(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateNameApi(idUser, data, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFech(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateEmailApi(idUser, email, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFech(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePasswordApi(idUser, password, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFech(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
