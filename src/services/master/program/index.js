import { API_URL, COLLEGE } from "../../API";

export const indexProgram = async (token) => {
  let headersList = {
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(
    `${API_URL}/master/collages/${COLLEGE.id}/programs`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = response.json();
  return data;
};
