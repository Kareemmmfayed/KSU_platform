import { API_URL } from "../../API";

export const deleteProgram = async (token, collegeID, ProgramID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${collegeID}/programs/${ProgramID}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );
  // console.log(response);
  return response;
};
