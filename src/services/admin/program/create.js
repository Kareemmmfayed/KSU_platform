import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const createProgram = async (token, name, desc, open, close) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: name,
    description: desc,
    open_at: open,
    close_at: close,
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
