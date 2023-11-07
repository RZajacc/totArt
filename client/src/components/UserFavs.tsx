import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

type fav = {
  _id: string;
  title: string;
};

function UserFavs() {
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState<fav[]>();

  const getUserFavs = async () => {
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
        "http://localhost:5000/api/users/allUserFavs",
        requestOptions
      );
      const result = await response.json();
      setFavs(result.favs);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(favs);

  useEffect(() => {
    getUserFavs();
  }, []);

  return (
    <>
      {favs ? (
        <h4>List of your favourite posts:</h4>
      ) : (
        <h4>You didn't add any posts to favourites yet!</h4>
      )}
      <ListGroup as="ol" numbered>
        {favs &&
          favs.map((fav) => {
            return (
              <ListGroup.Item>
                <strong>Post title: </strong>
                <Link className="link-to-own-post" to={`/content/${fav._id}`}>
                  {fav.title}
                </Link>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
}

export default UserFavs;
