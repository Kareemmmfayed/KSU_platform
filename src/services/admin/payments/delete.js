import { API_URL, COLLEGE } from "../../API";

export const deletePayment = async (token) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/levels/${levelID}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );
  return response;
};
