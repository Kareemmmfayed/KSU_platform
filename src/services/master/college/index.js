import { API_URL } from '../../API';

export const indexColleges = async (token) => {
    let headersList = {
        Authorization:
            `Bearer ${token}`,
    };
    
    let response = await fetch(`${API_URL}/master/collages`, {
        method: "GET",
        headers: headersList,
    });
    
    return response;
    
} 