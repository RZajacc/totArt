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

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/allUserPosts",
        requestOptions
      );
      const result = await response.json();
      setPosts(result.posts);
    } catch (error) {
      console.log(error);
    }
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
