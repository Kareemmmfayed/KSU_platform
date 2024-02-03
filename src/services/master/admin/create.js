import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const createAdmin = async (token, name, mail, pass) => {
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
    `${API_URL}/master/collages/${COLLEGE.id}/admins`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  let data = await response.json();
  return data;
};
