import { API_URL } from "../../API";

export const deleteYear = async (token, yearId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(`${API_URL}/admin/years/${yearId}`, {
    method: "DELETE",
    headers: headersList,
  });

  return response;
};
