import { API_URL, COLLEGE } from "../../API";

export const deleteLecturer = async (token, lecID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/instructors/${lecID}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  return response;
};
