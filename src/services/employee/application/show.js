import { API_URL, COLLEGE } from "../../API";
import { showApplicant } from "../applicant/show";

export const showApplication = async (token, programId, applicationId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/employee/collages/${COLLEGE.id}/programs/${programId}/applications/${applicationId}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();

  let applicant = await showApplicant(
    token,
    COLLEGE.id,
    programId,
    data.data.application.applicant_id
  );

  let files = [];

  for (let index = 0; index < data.data.files.length; index++) {
    let file = data.data.files[index];
    files.push([file.original_name, file.downloadUrl]);
  }

  return { name: applicant.name, id: applicant.national_id, files: files };
};
