import styled from "styled-components";
import { useState } from "react";


const UploadImages = ({ imgLink, setImgLink }) => {
  const [SelectedImage, setSelectedImage] = useState(null);


  const uploadPic = async (e) => {
    setSelectedImage(e.target.files[0]);
    const fileIn = e.target;
    const file = fileIn.files[0];
    if (file && file.size < 5e6) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "an5k6f9k");
      fetch("https://api.cloudinary.com/v1_1/ali-saleh/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          e.preventDefault();
          setImgLink(response.secure_url);
        });
    } else {
      console.error("oversized file");
    }
  };

  return (
    <>
      <Div>
        <article>
          <input type="file" name="image" id="upload" onChange={uploadPic} />
        </article>
      </Div>
    </>
  );
};
const Div = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default UploadImages;
