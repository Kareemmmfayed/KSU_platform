import { API_URL } from '../../API';

export const indexPrograms = async (token, collegeId) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
            `Bearer ${token}`,
            "Content-Type": "application/json",
    };
    
    let response = await fetch(
        `${API_URL}/applicant/collages/${collegeId}/programs`,
        {
            method: "GET",
            headers: headersList,
        }
    );
    let data = await response.text();
    return data
}