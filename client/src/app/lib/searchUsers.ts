import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export type User = {
  userid: number;
  username: string;
  icon: string;
  post: number;
  follow: number;
  follower: number;
};

export const searchUsers = async (searchQuery?: string) => {
  console.log("searchQuery:", searchQuery);

  try {
    const token = localStorage.getItem("token");
    console.log("取得したトークン:", token);

    const response = await axios.post(`${API_URL}/users`,
      { query: searchQuery || "" },
      { headers:
        { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
