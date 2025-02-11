import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type ProfileInfo = {
    id: string;
    username: string;
    icon: string;
    follow: number;
    follower: number;
};

export const profileData = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data as ProfileInfo;
    } catch (error) {
        console.error("Failed to get profile", error);
        return null;
    }
};