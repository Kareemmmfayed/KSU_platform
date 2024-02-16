import { API_URL, COLLEGE } from "../../API";

export const createApplication = async (token, programID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/applicant/collages/${COLLEGE.id}/programs/${programID}/applications`,
    {
      method: "POST",
      headers: headersList,
    }
  );
  console.log(response);
  return response;
};
