import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type PostData = {
    userid: number;
    postid: number;
    image: string;
    text: string;
    salt: number;
};

export const searchPosts = async (): Promise<PostData[]> => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/mypost`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
