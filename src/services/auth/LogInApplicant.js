import { API_URL } from "../API";

export const LogInApplicant = async (email, password) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    role: "applicant",
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
