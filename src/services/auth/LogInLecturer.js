import { API_URL } from "../API";

export const LogInLecturer = async (mail, pass) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    role: "instructor",
    email: mail,
    password: pass,
  });

  let response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();

  if (response.ok) {
    return data.data.tokens;
  } else {
    return false;
  }
};
