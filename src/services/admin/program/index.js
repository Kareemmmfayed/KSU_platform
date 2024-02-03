import { API_URL } from "../../API";

export const indexPrograms = async (token, collegeID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${collegeID}/programs`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  return response;
};
