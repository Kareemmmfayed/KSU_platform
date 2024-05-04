import { API_URL, COLLEGE } from "../../API";

export const UpdateApplication = async (
  token,
  programID,
  applicationId,
  status,
  feedback,
  aFees,
  pFees
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    status: status,
    feedback: feedback,
    applying_fees_status: aFees,
    program_fees_status: pFees,
  });

  let response = await fetch(
    `${API_URL}/employee/collages/${COLLEGE.id}/programs/${programID}/applications/${applicationId}`,
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    }
  );

  console.log(await response.json());
  return response;
};
