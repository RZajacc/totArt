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

export const detailsLoader = async ({ params }) => {
  console.log("Params", params);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("id", params.id);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/posts/details",
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
