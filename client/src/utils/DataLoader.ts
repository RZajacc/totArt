// import { redirect } from "react-router-dom";
import { contentData } from "../types/types";
import {} from "react"

export const dataLoader = async (): Promise<contentData> => {
  const response = await fetch("http://localhost:5000/api/posts/all");
  if (!response.ok) throw new Error("Something went wrong");
  const contentData: contentData = await response.json();
  return contentData;
};

// export const checkAuthLoader = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return redirect("/account");
//   }
// }