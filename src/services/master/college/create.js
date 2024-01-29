import { API_URL } from "../../API";

export const createCollege = async (token, faculty, college) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
        `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    
    let bodyContent = JSON.stringify({
        name: faculty,
        universityName: college,
    });
    
    let response = await fetch(`${API_URL}/master/collages`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });
    
    return response;
}