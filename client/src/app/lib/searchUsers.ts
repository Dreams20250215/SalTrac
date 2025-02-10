import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type User = {
    id: string;
    icon: string;
    username: string;
    post: number;
    follow: number;
    follower: number;
};

export const searchUsers = async (searchQuery?: string) => {
    try {
        const response = await axios.post(`${API_URL}/users`);
        return response.data as User[];
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
};