import { API_URL, COLLEGE } from "../../API";
import { showApplicant } from "../applicant/show";
import { download } from "../../storage/AWS/download";

export const showApplication = async (token, programId, applicantionId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/employee/collages/${COLLEGE.id}/programs/${programId}/applications/${applicantionId}`,
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

  data?.data.files.map(async (file, index) => {
    let picture = await download(file.downloadUrl, file.type);
    // files[index] = { name: file.original_name, picture: picture };
  });

  // return { name: applicant.name, id: applicant.national_id, files: files };
};
