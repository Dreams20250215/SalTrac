import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const uploadImage = async (image: string) => {
    try {
        const response = await axios.post(`${API_URL}/mypost`, {
            image: image,
        });
    } catch (error) {
        console.error("Failed to upload image.", error);
    }
};