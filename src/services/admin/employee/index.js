import { API_URL, COLLEGE } from "../../API";

export const indexEmployee = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/employees`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data.data.employees;
};
