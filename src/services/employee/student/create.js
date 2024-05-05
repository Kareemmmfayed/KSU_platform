import { API_URL, COLLEGE } from "../../API";

export const createStudent = async (token, applicantId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    applicantId: applicantId,
  });

  let response = await fetch(
    `${API_URL}/employee/collages/${COLLEGE.id}/students`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  return response;
};
