import { API_URL, COLLEGE } from "../../API";

export const AddPaymentToProgram = async (
  token,
  programId,
  yearId,
  paymentsIds,
  prices
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    programId: programId,
    yearId: yearId,
    paymentsIds: paymentsIds,
    prices: prices,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/payments/addPaymentsToProgram`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  return response;
};
