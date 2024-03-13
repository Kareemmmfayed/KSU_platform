import { API_URL, COLLEGE } from "../../API";

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

  if (response.ok) {
    let data = await response.json();
    return data.data.admins;
  } else {
    return [];
  }
};
