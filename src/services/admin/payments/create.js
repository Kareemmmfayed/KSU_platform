import { API_URL, COLLEGE } from "../../API";
import { createProgramFiles } from "../program_files/create";

export const createPayment = async (token, kind, programId) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    paymentKind: kind,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs/${programId}/payments`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  return response;
};
