import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

type SignupData = {
    username: string,
    email: string,
    password: string,
};

type LoginData = {
    username: string,
    password: string,
};

export const signupUser = async (e, data: SignupData, router) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        router.push("/login");
    } catch (error) {
        console.error("Error signing up", error);
        alert("Sign up failed")
    }
}

export const loginUser = async (e, data: LoginData, router) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        localStorage.setItem("token", response.data.access_token);
        router.push("/");
    } catch (error) {
        console.error("Error logging in", error);
        alert("Login failed");
    }
};