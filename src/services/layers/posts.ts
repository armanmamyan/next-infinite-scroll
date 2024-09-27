"use server";
import { IPost } from "@/types/Post";
import { getPostsUrl } from "../urls/posts";
import { handleError } from "@/utils/handleResponseError";

export const getPosts = async (
  offset: number,
  limit: number
): Promise<IPost[]> => {
  const url = getPostsUrl(offset, limit);

  try {
    const response = await fetch(url);
    const data = (await response.json()) as IPost[];

    if (!response.ok) {
      throw await handleError(response);
    }

    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error happened: ${error}`);
  }
};