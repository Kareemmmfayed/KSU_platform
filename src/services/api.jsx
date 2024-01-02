const API_URL = 'https://commerce-api-dev.onrender.com';

// Signup Applicant

export const SignupApplicant = async (name, email, password, national_id, gender) => {

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
        `${API_URL}/api/v1/auth/signup-applicant`,
        {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        }
    );
    
    return response.ok
}

// Applicant login

export const loginApplicant = async (role, email, password) => {
    let headersList = {
        Accept: "*/*",
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
        "Content-Type": "application/json",
    };
    
    let bodyContent = JSON.stringify({
        role: role,
        email: email,
        password: password,
    });
    
    let response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });
    
    return response.ok
}