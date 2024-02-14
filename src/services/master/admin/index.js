import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const indexAdmin = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/master/collages/${COLLEGE.id}/admins`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};