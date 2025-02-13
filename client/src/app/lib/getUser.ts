import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

type SignupData = {
    username: string;
    email: string;
    password: string;
};

type LoginData = {
    username: string;
    password: string;
};

export const signupUser = async (e: React.FormEvent<HTMLFormElement>, data: SignupData, router: AppRouterInstance) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        router.push("/login");
    } catch (error) {
        console.error("Error signing up", error);
        alert("Sign up failed");
    }
};

export const loginUser = async (e: React.FormEvent<HTMLFormElement>, data: LoginData, router: AppRouterInstance) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        localStorage.setItem("token", response.data.access_token);
        router.push("/");
    } catch (error) {
        alert("usernameまたはpasswordが異なります");
    }
};