import { Button, Form } from "react-bootstrap";
import { UserImage } from "../types/types";
import { ChangeEvent, FormEvent, useState } from "react";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  // *-----------HANDLE INCOMING DATA---------------------------
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : "");
  };

  // *-----------SUBMITTING A FILE-----------------------------
  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userImage", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      const result = (await response.json()) as UserImage;
      //   setNewUser({ ...newUser, userImage: result.userImage });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Submitting a file */}
      <Form onSubmit={handleFileSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={handleFileInput} />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
        {/* {newUser.userImage && (
                <div>
                  <img src={newUser.userImage} alt="user-avatar-picture" />
                </div>
              )} */}
      </Form>
    </>
  );
}

export default ImageUpload;
