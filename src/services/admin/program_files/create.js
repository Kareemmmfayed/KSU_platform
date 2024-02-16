import { API_URL, COLLEGE } from "../../API";

export const createProgramFiles = async (token, programId, name) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    type: "image/jpeg",
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/program-files`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  return response;
};
