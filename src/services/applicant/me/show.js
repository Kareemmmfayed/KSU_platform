import { API_URL  } from "../../API";

export  const show = async (token) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
            `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    
    let response = await fetch(
        `${API_URL}/applicant/me`,
        {
            method: "GET",
            headers: headersList,
        }
    );
    let data = await response.text();
    console.log(data);
}