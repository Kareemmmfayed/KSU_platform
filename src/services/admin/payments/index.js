import { API_URL, COLLEGE } from "../../API";

export const indexPayments = async (token, programId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/payments`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  const data = await response.json();
  return data.data;
};
