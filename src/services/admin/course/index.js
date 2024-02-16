import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const indexCourse = async (token, programId, levelId, semesterId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelId}/semesters/${semesterId}/courses`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  const data = await response.json();
  return data.data.courses;
};
