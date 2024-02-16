import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const indexLevel = async (token, programId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  const data = await response.json();
  return data.data.levels;
};
