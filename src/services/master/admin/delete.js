import { API_URL } from "../../API";
import { COLLEGE } from "../../API";

export const deleteAdmin = async (token, adminID) => {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${API_URL}/master/collages/${COLLEGE.id}/admins/${adminID}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
