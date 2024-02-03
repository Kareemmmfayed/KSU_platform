import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const createProgram = async (
  token,
  name,
  desc,
  appfees,
  profees,
  open,
  close,
  crefees
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    description: desc,
    applying_fees: appfees,
    program_fees: profees,
    open_at: open,
    close_at: close,
    credit_hour_fees: crefees,
  });

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/programs`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  return response;
};
