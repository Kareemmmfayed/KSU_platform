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

  let data = await response.json();
  let responses = [];

  if (response.ok) {
    data.data.filesToUpload.map(async (file, index) => {
      responses[index] = await Upload(file.uploadUrl, files[index], file.type);
    });
  }

  if (responses.every((response) => response === true)) {
    return true;
  } else {
    return false;
  }
};
