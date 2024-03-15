import { API_URL } from "../../API";

export const indexColleges = async (token) => {
  let headersList = {
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(`${API_URL}/master/collages`, {
    method: "GET",
    headers: headersList,
  });

  if (response.ok) {
    let data = await response.json();
    return data.data.collages;
  } else {
    return [];
  }
};
