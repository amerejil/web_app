import { getToken, hasExpiredToken } from "../Api/token";
export async function authFech(url, params, logout) {
  const token = getToken();
  if (!token) {
    logout();
  } else {
    if (hasExpiredToken(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
