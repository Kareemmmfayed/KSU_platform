import { API_URL, COLLEGE } from "../../API";

export const deleteEmployee = async (token, empID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/admin/collages/${COLLEGE.id}/employees/${empID}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  return response;
};
