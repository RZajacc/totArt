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

export const destructureUrlToImageID = (imageUrl: string) => {
  const imageUrlSplit = imageUrl.split("/");
  const imageUrlNoExt = imageUrlSplit![imageUrlSplit!.length - 1].split(".");
  const imageId = [
    imageUrlSplit![imageUrlSplit!.length - 2],
    imageUrlNoExt[0],
  ].join("/");
  return imageId;
};

export const deleteUserImage = async (imageId: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("publicId", imageId);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/users/imageDelete",
      requestOptions
    );
    const result = response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};