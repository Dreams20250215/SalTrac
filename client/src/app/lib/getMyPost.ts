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
    try {
        const response = await axios.get(`${API_URL}/mypost`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        throw error;
    }
};

export const postData = async (formData: FormData) => {
    try {
        await axios.post(`${API_URL}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    } catch (error) {
        throw error;
    }
};