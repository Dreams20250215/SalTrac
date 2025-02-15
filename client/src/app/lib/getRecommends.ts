import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type PostData = {
    userid: number;
    postid: number;
    image: string;
    text: string;
    salt: number;
    username: string;
    icon: string;
};

export const searchRecommends = async (): Promise<PostData[]> => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/recommends`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        throw error;
    }
};