import { API_URL } from "../API";

export const SignUpApplicant = async (name, email, password, national_id, gender) => {

    let headersList = {
        Accept: "*/*",
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
        "Content-Type": "application/json",
    };
    
    let bodyContent = JSON.stringify({
        name: name,
        email: email,
        password: password,
        national_id: national_id,
        gender: gender,
    });
    
    let response = await fetch(
        `${API_URL}/auth/signup-applicant`,
        {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        }
    );

    return response.ok
}