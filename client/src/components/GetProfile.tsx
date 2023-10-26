import { useState } from "react";
import { Button } from "react-bootstrap";
import { User } from "../types/types";

function GetProfile() {
  const [user, setUser] = useState<User | null>(null);

  const getProfile = async () => {
    const myToken = localStorage.getItem("token");
    if (!myToken) {
      alert("You need to login first");
    }
    if (myToken) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${myToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          requestOptions
        );
        if (response.ok) {
          const result = await response.json();
          const user = result.user as User;
          setUser(user);
        }
      } catch (err) {
        const error = err as Error;
        console.log(error.message);
      }
    }
  };

  console.log(user);
  return (
    <div>
      <h2>Profile</h2>
      <Button onClick={getProfile}>GetProfile</Button>
    </div>
  );
}

export default GetProfile;
