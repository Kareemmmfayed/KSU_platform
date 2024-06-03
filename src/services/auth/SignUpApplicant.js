import { API_URL } from "../API";

export const SignUpApplicant = async (
  name,
  email,
  password,
  national_id,
  gender
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    email: email,
    password: password,
    national_id: national_id,
    gender: gender,
  });

  let response = await fetch(`${API_URL}/auth/signup-applicant`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  return response.ok;
};
