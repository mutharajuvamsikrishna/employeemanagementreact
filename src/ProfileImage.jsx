import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; // Import styled-components
import { getAvatarDetails } from "./Services/Api"; // Import the API function to fetch avatar details

// Styled component for the oval image container
const OvalImageContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
  border-raius: 50%;
  overflow: hidden;
  width: 50px;
  height: 70px;
  cursor: pointer;
`;

const MenuModal = styled.div`
  position: fixed;
  top: 75px;
  right: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProfileImage = ({ employee }) => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const email = employee.email;
  useEffect(() => {
    if (email) {
      fetchAvatarData(email);
    }
  }, [email]);

  const fetchAvatarData = (email) => {
    getAvatarDetails(email)
      .then((response) => {
        if (response.status === 200) {
          const dataUrl = `data:image/png;base64,${response.data.fileContents}`;
          setAvatarUrl(dataUrl);
        }
      })
      .catch((error) => {
        const dataUrl =
          "https://www.signivis.com/img/custom/avatars/member-avatar-01.png";
        setAvatarUrl(dataUrl);
        console.error("Error fetching avatar data:", error);
      });
  };

  const handleEditProfile = () => {
    setIsMenuOpen(false);
    // Navigate to edit profile page
    const data = {
      email: email,
    };
    navigate("/dashboardlayout/avatar", { state: { data: data } });
  };

  const handleViewProfile = () => {
    setIsMenuOpen(false);
    // Navigate to view profile page
    const data = {
      email: email,
    };
    navigate("/dashboardlayout/profile", { state: { data: data } });
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <OvalImageContainer onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img src={avatarUrl} alt="Profile" style={{ width: "100%" }} />
        <p className="text-success">{employee.name}</p>
      </OvalImageContainer>
      <MenuModal isOpen={isMenuOpen}>
        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </MenuModal>
    </>
  );
};

export default ProfileImage;
