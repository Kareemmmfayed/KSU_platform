import { API_URL } from "../../API";

export const createProgram = async (
  token,
  collegeID,
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
    `${API_URL}/admin/collages/${collegeID}/programs`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  return response;
};
