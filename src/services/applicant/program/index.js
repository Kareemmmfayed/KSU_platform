import { API_URL } from '../../API';

export const indexPrograms = async (token, collageId) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
            `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    
    let response = await fetch(
        `${API_URL}/admin/collages/${collageId}/programs`,
        {
            method: "GET",
            headers: headersList,
        }
    );
    let data = await response.text();
    console.log(data);
}