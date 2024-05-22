import { API_URL, COLLEGE } from "../../API";

export const showApplication = async (token, appId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/applicant/collages/${COLLEGE.id}/programs/a8a352f4-4afd-4c67-98ac-ebea44c03307/applications/${appId}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  console.log(data);
  return data.data.application;
};
