import { API_URL, COLLEGE } from "../../API";

export const indexStudentPrograms = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/student/collages/${COLLEGE.id}/programs`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  if (response.ok) {
    let data = await response.json();
    return data.data.programs;
  } else {
    return [];
  }
};
