import { API_URL } from "../../API";

export const indexAdmin = async (token, collegeID) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
        `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    
    let response = await fetch(
        `${API_URL}/master/collages/${collegeID}/admins`,
        {
            method: "GET",
            headers: headersList,
        }
    );

    return response;
}