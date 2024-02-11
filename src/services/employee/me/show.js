import { API_URL } from "../../API";

export const showEmployee = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(`${API_URL}/employee/me`, {
    method: "GET",
    headers: headersList,
  });
  let data = await response.json();
  return data.data.employee;
};
