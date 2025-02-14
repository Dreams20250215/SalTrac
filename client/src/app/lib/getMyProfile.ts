import axios from "axios";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type ProfileData = {
    userid: number;
    username: string;
    icon: string;
    post: number;
    follow: number;
    follower: number;
};

export const profileData = async (): Promise<ProfileData | null> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            redirect("/login");
        }

        const response = await axios.get(`${API_URL}/myprofile`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get profile", error);

        return null;
    }
};