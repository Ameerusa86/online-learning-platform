// utils/youtube.js
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const getVideoDetails = async (videoId) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;
    console.log("Request URL:", url); // Log the request URL for debugging
    const response = await axios.get(url);
    if (response.data.items.length === 0) {
      throw new Error("No video details found for the provided video ID.");
    }
    return response.data.items[0].snippet;
  } catch (error) {
    console.error("Error fetching video details:", error.message);
    throw new Error(
      "Failed to fetch video details. Please check the video ID and API key."
    );
  }
};
