import { contentData } from "../types/types";

export const dataLoader = async (): Promise<contentData> => {
  try {
    const response = await fetch("http://localhost:5000/api/posts/all");
    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Could not fetch the data" }),
        { status: 500 }
      );
    } else {
      const contentData: contentData = await response.json();
      return contentData;
    }
  } catch (error) {
    throw new Response(
      JSON.stringify({
        message:
          "Server not responding, try again later (or turn the server on if its yours;p)",
      }),
      { status: 503 }
    );
  }
};

// export const getAuthToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return null;
//   }
//   return token;
// };

// export const checkAuthLoader = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return redirect("/account");
//   }

//   return null;
// };
