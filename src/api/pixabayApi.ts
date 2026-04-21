import axios from "axios";

const API_URL = "https://pixabay.com/api/";
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const searchImages = async (query: string, page = 1) => {
  const res = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      per_page: 30,
      page,
      safesearch: true,
    },
  });

  return res.data.hits; 
};
