import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { post } from "../types/types";
import { ListGroup } from "react-bootstrap";
import "../styles/userDashboard.css";
import { Link } from "react-router-dom";

function UserPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<post[]>();

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
      {posts ? (
        <h4>List of your posts created by you:</h4>
      ) : (
        <h4>You didn't create any posts yet!</h4>
      )}

      <ListGroup as="ol" numbered>
        {posts &&
          posts.map((post) => {
            return (
              <ListGroup.Item>
                <strong>Post title: </strong>
                <Link className="link-to-own-post" to={`/content/${post._id}`}>
                  {post.title}
                </Link>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
}

export default UserPosts;
