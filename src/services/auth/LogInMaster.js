import { API_URL } from "../API";

export const LogInMaster = async (email, password) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
        "Content-Type": "application/json",
    };
    
    let bodyContent = JSON.stringify({
        role: "master",
        email: email,
        password: password,
    });
    
    let response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

    let data = await response.json();

    if (response.ok) {
        return data.data.tokens;
    } else {
        return false
    }
}