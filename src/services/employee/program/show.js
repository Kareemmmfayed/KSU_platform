import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const showEmployeeProgram = async (token, programID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/employee/collages/${COLLEGE.id}/programs/${programID}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data.data.program;
};
