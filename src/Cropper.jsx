import { useRef, useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { FcAddImage } from "react-icons/fc";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteAvatarDetails, postAvatarDetails, getAvatarDetails } from "./Services/Api";

const Modal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 96vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;

  &.open {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  padding-left: 300px;
  padding-right: 300px;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ff0000;
  color: white;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #5596e6;
  color: white;
`;

const Container = styled.div`
  margin-top: 50px;
  margin-left: 250px;
  display: flex;
  flex-flow: column;
  align-items: center;

  .add-icon {
    width: 50px;
    height: 50px;
  }

  input {
    display: none;
  }

  .img-container {
    margin-top: 30px;
    border-radius: 50%;
    border: 3px solid black;

    img {
      display: block;
      border-radius: 50%;
    }
  }
`;

const CropperModal = ({
  src,
  modalOpen,
  setModalOpen,
  preview, // Added preview prop
  setPreview,
  setSrc,
  resetInput,
  empId,
}) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const blob = await fetch(dataUrl).then((res) => res.blob());

      const formData = new FormData();
      formData.append("empId", empId);
      formData.append("avatarFile", blob, "avatar.png");

      postAvatarDetails(formData)
        .then((response) => {
          if (response.status === 200) {
            setPreview(dataUrl);
            setModalOpen(false);
          } else {
            console.error("Server returned an error:", response.statusText);
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSrc(null);
    resetInput();
  };

  useEffect(() => {
    fetchAvatarData(empId);
  }, [empId]);

  const fetchAvatarData = (empId) => {
    getAvatarDetails(empId)
      .then((response) => {
        if (response.status === 200) {
          const dataUrl = `data:image/png;base64,${response.data.fileContents}`;
          setPreview(dataUrl);
        }
      })
      .catch((error) => {
        console.error("Error fetching avatar data:", error);
      });
  };

  return (
    <Modal className={modalOpen ? "open" : ""}>
      <ModalContent>
        <AvatarEditor
          ref={cropRef}
          image={preview} // Use preview prop directly
          style={{ width: "250px", height: "250px" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />
        <input
          type="range"
          min={10}
          max={50}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <SaveButton onClick={handleSave} style={{ marginRight: "10px" }}>
            Save
          </SaveButton>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

const Cropper = () => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();
  const empId = location.state?.data.empId;

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        setModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear input value
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (!confirmed) {
      return;
    }
    deleteAvatarDetails(empId)
      .then((response) => {
        if (response.status === 200) {
          alert("Deleted SucessFully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Container>
        <header>
          <h1>Upload Avatar</h1>
          <hr />
        </header>
        <CropperModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          preview={preview} // Pass preview state as a prop
          setPreview={setPreview}
          setSrc={setSrc}
          resetInput={resetInput}
          empId={empId}
        />
        <a href="/" onClick={handleInputClick}>
          <FcAddImage className="add-icon" />
        </a>
        <small>Click to select image</small>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />
        <div className="img-container">
          <img
            src={
              preview ||
              "https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
            }
            alt=""
            width="200"
            height="200"
          />
        </div>
        {preview&&(
        <div className="mt-2 mb-2">
          <button className="btn btn-secondary" onClick={handleDelete}>
            Remove
          </button>
        </div>
        )}
      </Container>
      <div
        className="text-center"
        style={{ paddingTop: "30px", marginBottom: "20px" }}
      ></div>
    </>
  );
};

export default Cropper;
