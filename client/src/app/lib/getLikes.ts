import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const likePost = async (postId: number) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await axios.post(`${API_URL}/like/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}`}
    });
    return response.data;
};

export const unlikePost = async (postId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await axios.delete(`${API_URL}/unlike/${postId}`, {
        headers: { Authorization: `Bearer ${token}`},
    });
    return response.data;
};