import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const token = localStorage.getItem("token");

export const uploadPost = async (formData: FormData) => {
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

export const analyzeImage = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/analyze_image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to analyze image.", error);
    }
};