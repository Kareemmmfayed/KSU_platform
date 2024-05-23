import { API_URL, COLLEGE } from "../../API";

export const indexMyPrograms = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/applicant/collages/${COLLEGE.id}/programs/a8a352f4-4afd-4c67-98ac-ebea44c03307/applications`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  console.log(response);
  if (response.ok) {
    let data = await response.json();
    return data.data.applications;
  } else {
    return [];
  }
};
