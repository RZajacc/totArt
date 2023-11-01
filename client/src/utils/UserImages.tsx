import { ImageUrlUpdateResponse, User } from "../types/types";

export const updateImage = async (
  email: string,
  imageUrl: string,
  setUser: (user: User) => void,
  user: User
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("userImage", imageUrl);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/users/updateUser",
      requestOptions
    );
    const data = (await response.json()) as ImageUrlUpdateResponse;
    setUser({ ...user!, userImage: imageUrl });
    console.log(data.msg);
  } catch (error) {
    console.log(error);
  }
};
