import { API_URL } from "../constants";

export const getPostsUrl = (offset: number, limit: number): string => {
    return `${API_URL}?_start=${offset}&_limit=${limit}`;
  };
  