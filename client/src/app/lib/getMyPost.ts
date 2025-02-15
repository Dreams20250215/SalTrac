import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type PostData = {
    postid: number;
    userid: number;
    image: string;
    text: string;
    salt: number;
    username?: string;
    icon: string;
    likes: number;
    likedByCurrentUser: boolean;
};

export const searchPosts = async (): Promise<PostData[]> => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/mypost`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched posts:", response.data); // ここでレスポンスを確認
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postid: number) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.delete(`${API_URL}/delete_post/${postid}`, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};