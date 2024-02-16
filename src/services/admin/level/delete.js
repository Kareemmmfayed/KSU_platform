import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const deleteLevel = async (token, programId, levelID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelID}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );
  return response;
};
