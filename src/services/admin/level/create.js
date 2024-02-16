import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const createLevel = async (token, programId, name) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  console.log(response.json());
  return response;
};
