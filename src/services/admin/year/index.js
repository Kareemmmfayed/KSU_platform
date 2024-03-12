import { API_URL } from "../../API";

export const indexYears = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(`${API_URL}/admin/years`, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data.data.years;
};
