import { API_URL } from "../API";

export const LogInMaster = async (email, password) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    role: "master",
    email: email,
    password: password,
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
