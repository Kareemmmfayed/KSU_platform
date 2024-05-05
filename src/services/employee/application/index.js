import { API_URL, COLLEGE } from "../../API";

export const indexApplications = async (token, programId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/employee/collages/${COLLEGE.id}/programs/${programId}/applications`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  let data = await response.json();
  if (response.status === 500) {
    return [];
  }
  return data.data.applications;
};
