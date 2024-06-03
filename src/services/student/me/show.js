import { API_URL } from "../../API";

export const showStudent = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(`${API_URL}/student/me`, {
    method: "GET",
    headers: headersList,
  });
  let data = await response.json();
  return data.data.student;
};
