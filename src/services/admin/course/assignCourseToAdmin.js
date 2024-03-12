import { API_URL, COLLEGE } from "../../API";

export const AssignCourseToAdmin = async (
  token,
  programId,
  levelId,
  semesterId,
  courseId,
  lecturerId,
  dyear
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    instructorId: lecturerId,
    yearId: dyear,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelId}/semesters/${semesterId}/courses/${courseId}`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  return response;
};
