import axios from "axios";

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
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/myprofile`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get profile", error);
        return null;
    }
};