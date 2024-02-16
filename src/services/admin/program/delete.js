import { API_URL, COLLEGE } from "../../API";

export const deleteProgram = async (token, ProgramID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${ProgramID}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );
  return response;
};
