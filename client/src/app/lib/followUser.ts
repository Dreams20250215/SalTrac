import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type FollowResponse = {
    success: boolean;
    updatedFollowerCount?: number;
    following?: boolean
};

export const followUser = async (userId: string, token: string): Promise<FollowResponse> => {
    try {
        const response = await axios.post(`${API_URL}/follow`, {userId}, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error("Failed to follow user", error);
        return { success: false };
    }
};

export const checkFollowing = async (userId: string, token: string): Promise<boolean> => {
    try {
        const response = await axios.get(`${API_URL}/is_following/${userId}`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data.isFollowing;
    } catch (error) {
        console.error("Failed to check follow status");
        return false;
    }
};