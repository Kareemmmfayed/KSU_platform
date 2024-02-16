import { API_URL, COLLEGE } from "../../API";

export const createEmployee = async (token, name, mail, pass) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    email: mail,
    password: pass,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/employees`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  let data = await response.json();
  return data;
};
