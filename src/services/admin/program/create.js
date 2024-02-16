import { API_URL, COLLEGE } from "../../API";
import { createProgramFiles } from "../program_files/create";

export const createProgram = async (token, name, desc, open, close) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    description: desc,
    open_at: open,
    close_at: close,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  await createProgramFiles(token, data.data.program.id, name);
  return response;
};
