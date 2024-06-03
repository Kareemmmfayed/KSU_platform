import { API_URL } from "../API";

export const LogInEmployee = async (mail, pass) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    role: "employee",
    email: mail,
    password: pass,
  });

  let response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  if (response.ok) {
    let data = await response.json();
    return data.data.tokens;
  } else {
    return false;
  }
};
