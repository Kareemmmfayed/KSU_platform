import { API_URL, COLLEGE } from "../../API";

export const createSemester = async (token, programId, levelId, name) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelId}/semesters`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  return response;
};
