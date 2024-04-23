import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { postUserOtp } from "./Services/Api";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [error,setError]=useState(false);
  const data = location.state.data;
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const otpdata = {
      otp: otp,
      mob: data.mob,
    };

    var v46 = /^\d{6}$/;
    if (!otpdata.otp.match(v46)) {
      alert("OTP must be 6 digits numeric");
      return false;
    }
setLoading(true);
    postUserOtp(otpdata)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false)
          handleShow();
        }
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
        console.error(error);
      });
  };
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-2">Loading...</h4>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        height: "99vh",
        paddingTop: "130px",
      }}
    >
         <div className="pt-2"> 
            {error&&(
                <h4 className="text-center text-danger">Invalid OTP</h4>
            )}
        </div>
      <center>
        <h2 style={{ color: "blue" }}>Hello {data.name} Enter Your OTP </h2>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          
          <br />
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ fontSize: "18px" }}
          >
            Submit
          </button>
        </form>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Hey {data.name} Your SuccessFully Registered!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your Registred SuccessFully With ONiE Soft.We Secury Your Details
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                navigate("/");
              }}
            >
              Go to Login
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
        
      </center>
    </div>
  );
};

export default Otp;
