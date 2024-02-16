import { API_URL, COLLEGE } from "../../API";

export const indexLecturer = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/instructors`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data.data.instructors;
};
