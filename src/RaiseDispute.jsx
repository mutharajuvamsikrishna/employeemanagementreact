import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getRaiseDisputeDetails,
  postRaiseDisputeDetails,
} from "./Services/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./RaiseDispute.css";

const RaiseDispute = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [res, setRes] = useState(false);
  useEffect(() => {
    fetchRaiseDisputeData(email);
  }, [email]);

  const fetchRaiseDisputeData = (email) => {
    getRaiseDisputeDetails(email)
      .then((response) => {
        setLoading(false);
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: email,
      complaintDate: new Date().toISOString().split("T")[0],
      description: "",
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      setRes(true);
      try {
        const response = await postRaiseDisputeDetails(values);
        if (response.status === 200) {
          setRes(false)
          alert("Details Saved Successfully");
          window.location.reload(); // Reloading the page after successful submission
        } else {
          console.error("Failed to save details:", response.statusText);
        }
      } catch (error) {
        setRes(false)
        console.error("Error while submitting:", error);
      }
      setRes(false)
      setShowModal(false); // Close the modal after form submission
    },
  });

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  if (res) {
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
    <>
      <div className="raisedispute">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-center">Raise Dispute</h2>
            <div className="d-flex justify-content-end mt-2 mb-3">
              <button className="btn btn-success" onClick={handleShow}>
                Raise a Dispute
              </button>
            </div>

            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Complaint Number</th>
                  <th>Description</th>
                  <th>Complaint Date</th>
                  <th>Resolved Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((dispute, index) => (
                  <tr key={index}>
                    <td>{dispute.regno}</td>
                    <td>{dispute.description}</td>
                    <td>{dispute.complaintDate}</td>
                    <td>{dispute.resolvedDate}</td>
                    <td>{dispute.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal for raising dispute */}
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Raise Dispute</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea" // Change type to "textarea"
                      placeholder="Enter description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.description && formik.errors.description
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <center>
                  <Button
                    variant="primary"
                    type="submit"
                    className="text-center"
                  >
                    Submit
                  </Button>
                  </center>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default RaiseDispute;
