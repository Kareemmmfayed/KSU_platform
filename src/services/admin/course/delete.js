import { API_URL, COLLEGE } from "../../API";

export const deleteCourse = async (
  token,
  programId,
  levelID,
  semesterId,
  courseId
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelID}/semesters/${semesterId}/courses/${courseId}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );
  return response;
};
