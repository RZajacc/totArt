export const addNewComment = async (
  author: string,
  comment: string,
  relatedPost: string
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("author", author);
  urlencoded.append("comment", comment);
  urlencoded.append("relatedPost", relatedPost);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/comments/addComment",
      requestOptions
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
