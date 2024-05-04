import { API_URL, COLLEGE } from "../../API";

export const createPayment = async (token, kind) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    paymentKind: kind,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/payments`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  return response;
};
