import { API_URL } from "../../API";

export const deleteCollege = async (token, collegeID) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
        `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    
    let response = await fetch(
        `${API_URL}/master/collages/${collegeID}`,
        {
            method: "DELETE",
            headers: headersList,
        }
    );

    return response;
}