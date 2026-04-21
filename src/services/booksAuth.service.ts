import axios from "axios";

export const booksAuthService = {
    autoLogin: async () => {
      const res = await axios.post("http://localhost:3000/api/books/auth");
      return res.data;
    },
  };
  