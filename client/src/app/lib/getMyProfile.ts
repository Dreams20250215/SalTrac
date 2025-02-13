import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type ProfileInfo = {
    userid: number;
    username: string;
    icon: string;
    post: number;
    follow: number;
    follower: number;
};

export const profileData = async (): Promise<ProfileInfo | null> => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    } catch (error) {
        console.error("Failed to get profile", error);
        return null;
    }
};