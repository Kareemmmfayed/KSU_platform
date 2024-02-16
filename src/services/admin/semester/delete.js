import { API_URL, COLLEGE } from "../../API";

export const deleteSemester = async (token, programId, levelID, semesterId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelID}/semesters/${semesterId}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );
  return response;
};
