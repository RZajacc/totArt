import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function UserPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const getAllUsersPosts = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", user!.email);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch("http://localhost:5000/api/users/allUserPosts", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllUsersPosts();
  }, []);

  console.log(posts);
  return (
    <>
      <h4>List of your posts created by you:</h4>
      <ol>
        {posts &&
          posts.map((post) => {
            return <li>{post.title}</li>;
          })}
      </ol>
    </>
  );
}

export default UserPosts;
