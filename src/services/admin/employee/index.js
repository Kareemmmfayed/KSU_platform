import { API_URL } from "../../API";

export const indexEmployee = async (token, collegeId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${collegeId}/employees`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  return response;
};
