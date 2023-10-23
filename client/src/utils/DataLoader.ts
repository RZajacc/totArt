import { contentData } from "../types/types";

export const dataLoader = async (): Promise<contentData> => {
  const response = await fetch("http://localhost:5000/api/posts/all");
  if (!response.ok) throw new Error("Something went wrong");
  const contentData = await response.json();
  return contentData;
};