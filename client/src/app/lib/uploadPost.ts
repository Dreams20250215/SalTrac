import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const uploadPost = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/mypost`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to upload post.", error);
    }
};