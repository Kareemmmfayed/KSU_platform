import { API_URL } from "../../API";

export const indexStudent = async (token) => {
  let headersList = {
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(`${API_URL}/master/collages`, {
    method: "GET",
    headers: headersList,
  });

  let data = response.json();
  return data;
};
