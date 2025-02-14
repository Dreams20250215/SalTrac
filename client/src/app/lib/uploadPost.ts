import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const uploadPost = async (formData: FormData) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(`${API_URL}/post`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to upload post.", error);
    }
};