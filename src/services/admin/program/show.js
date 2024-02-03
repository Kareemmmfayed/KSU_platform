import { API_URL } from "../../API";

export const showProgram = async (token, collegeId, programId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${collegeId}/programs/${programId}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  return response;
};
