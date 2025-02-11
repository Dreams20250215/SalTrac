import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type FollowResponse = {
    success: boolean;
    updatedFollowerCount?: number;
}

export const followUser = async (userId: string): Promise<FollowResponse> => {
    try {
        const response = await axios.post(`${API_URL}/follow`, {userId});
        return response.data;
    } catch (error) {
        console.error("Failed to follow user", error);
        return { success: false };
    }
};