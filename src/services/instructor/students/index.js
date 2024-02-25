import { API_URL } from "../../API";

export const indexStudents = async (token, courseId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/instructor/courses/${courseId}/students`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  let data = await response.json();
  return data.data.courses;
};
