export const updatePost = async (
  _id: string,
  elementName: string,
  elementValue: string
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("_id", _id);
  urlencoded.append("elementName", elementName);
  urlencoded.append("elementValue", elementValue);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/posts/updatePost",
      requestOptions
    );
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
};
