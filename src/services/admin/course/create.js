import { API_URL, COLLEGE } from "../../API";

export const createCourse = async (
  token,
  programId,
  levelId,
  semesterId,
  name,
  hours,
  code
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    creditHours: hours,
    code: code,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelId}/semesters/${semesterId}/courses`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  return response;
};
