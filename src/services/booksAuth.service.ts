import axios from "axios";

export const booksAuthService = {
  autoLogin: async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BOOKS_API_URL || "http://localhost:3000"}/books/auth`
    );
    return res.data;
  },
};
