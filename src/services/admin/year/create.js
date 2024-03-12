import { API_URL } from "../../API";

export const createYear = async (token, name) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
  });

  let response = await fetch(`${API_URL}/admin/years`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  return response;
};
