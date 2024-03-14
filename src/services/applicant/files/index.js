import { API_URL, COLLEGE } from "../../API";

export const indexProgramFiles = async (token, programId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/applicant/collages/${COLLEGE.id}/programs/${programId}/program-files`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  if (response.ok) {
    let data = await response.json();
    return data.data.programFiles;
  } else {
    return [];
  }
};
