import { API_URL, COLLEGE } from "../../API";

export const showProgram = async (token, programID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/applicant/collages/${COLLEGE.id}/programs/${programID}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data.data.program;
};
