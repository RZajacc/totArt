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
    return result.comment;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (id: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("_id", id);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/comments/deleteComment",
      requestOptions
    );
    const result = response.json();
  } catch (error) {
    console.log(error);
  }
};
