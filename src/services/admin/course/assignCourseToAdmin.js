import { API_URL, COLLEGE, YEAR } from "../../API";

export const AssignCourseToAdmin = async (
  token,
  programId,
  levelId,
  semesterId,
  courseId,
  instructorId
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    instructorId: instructorId,
    yearId: YEAR.id,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelId}/semesters/${semesterId}/courses/${courseId}/`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  return response;
};
