import { API_URL, COLLEGE } from "../../API";
import { createStudent } from "../student/create";

export const UpdateApplication = async (
  token,
  programId,
  applicationId,
  status,
  feedback,
  aFees,
  pFees,
  applicantId
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
    `${API_URL}/employee/collages/${COLLEGE.id}/programs/${programId}/applications/${applicationId}`,
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    }
  );

  if (aFees == true && status == "first acceptance") {
    await createStudent(token, applicantId);
  }
  return response;
};
