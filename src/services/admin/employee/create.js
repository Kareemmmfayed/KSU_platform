import { API_URL } from "../../API";

export const createEmployee = async (token, collegeId, name, mail, pass) => {
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
    `${API_URL}/admin/collages/${collegeId}/employees`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  console.log(response);
  return response;
};
