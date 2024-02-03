import { API_URL } from "../../API";

export const showAdmin = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(`${API_URL}/admin/me`, {
    method: "GET",
    headers: headersList,
  });
  return response;
};
