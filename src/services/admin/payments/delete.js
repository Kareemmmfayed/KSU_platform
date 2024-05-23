import { API_URL, COLLEGE } from "../../API";

export const deletePayment = async (token, payId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/payments/${payId}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );
  return response;
};
