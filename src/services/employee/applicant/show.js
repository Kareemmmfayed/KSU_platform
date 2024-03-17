import { API_URL } from "../../API";

export const showApplicant = async (
  token,
  collegeId,
  programId,
  applicantId
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/employee/collages/${collegeId}/programs/${programId}/applicants/${applicantId}`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  let data = await response.json();
  return data.data.applicant;
};
