import { API_URL, COLLEGE } from "../../API";
import { Upload } from "../../storage/AWS/upload";

export const createApplication = async (token, programID, files) => {
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

  let data = response.json();
  data.data.filesToUpload.map(async (file) => {
    await Upload(file.uploadUrl);
  });

  return response;
};
