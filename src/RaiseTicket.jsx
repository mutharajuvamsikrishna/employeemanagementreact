import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { postRaiseDisputeDetails } from "./Services/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./RaiseTicket.css";

const RaiseTicket = ({employee}) => {
  const location = useLocation();
  const data = location.state.data;
  const email = location.state.data.email;
  const navigate = useNavigate();
  const [res, setRes] = useState(false);
  const [selectedMainType, setSelectedMainType] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const departments = {
    HR: ["Leaves", "Performance", "Compensation", "Personal", "Other"],
    Finance: ["Salary", "Insurance", "EPF", "Taxation", "Other"],
    Admin: ["ID Card", "Transport", "Security", "Parking", "Travel", "Other"],
    IT: ["Laptop", "Network Access", "Email", "Tools", "MS 365", "Other"],
    Project: ["Assignment", "Change", "Client"],
  };

  const formik = useFormik({
    initialValues: {
      email: email,
      complaintDate: new Date().toISOString().split("T")[0],
      selectedMainType: selectedMainType,
      selectedSubType: selectedSubType,
      status:"Applied",
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
          setRes(false);
          navigate("/dashboardlayout/viewticket",{state:{data:data}});
        } else {
          console.error("Failed to save details:", response.statusText);
        }
      } catch (error) {
        setRes(false);
        console.error("Error while submitting:", error);
      }
      setRes(false);
    },
  });

  const handleCancel = () => {
    setSelectedMainType(null);
    setSelectedSubType(null);
  };

  if (res) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh",marginLeft:"450px" }}
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
      <div className="raiseticket">
          <>
            <div
              style={{
                paddingLeft: "200px",
                paddingTop: "50px",
                paddingRight: "40px",
              }}
            >
              {selectedSubType ? (
                <>
                  <h3>
                    {selectedMainType} - {selectedSubType}
                  </h3>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter description"
                        style={{ width: "700px", display: "flex" }}
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div
                      className="d-flex justify-content-center mt-2"
                      style={{ paddingTop: "20px" }}
                    >
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      <Button
                        variant="secondary"
                        className="mx-2"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </>
              ) : (
                <>
                  <h2 className="text-center">Raise Ticket</h2>
                  <h5>Hello {employee.name}, How can I help you?</h5>
                  <p>
                    Please select a main type and sub-type to raise a ticket:
                  </p>
                  <div className="departments">
                    {Object.keys(departments).map((mainType) => (
                      <div key={mainType} className="main-type-button">
                        <Button
                          onClick={() => {
                            setSelectedMainType(mainType);
                            formik.setFieldValue("selectedMainType", mainType);
                          }}
                          className={`mx-2 ${
                            selectedMainType === mainType ? "active" : ""
                          }`}
                        >
                          {mainType}
                        </Button>

                        {selectedMainType === mainType && (
                          <div className="sub-departments">
                            {departments[mainType].map((subType) => (
                              <Button
                                variant="secondary"
                                key={subType}
                                onClick={() => {
                                  setSelectedSubType(subType);
                                  formik.setFieldValue(
                                    "selectedSubType",
                                    subType
                                  );
                                }}
                                className="mx-2"
                              >
                                {subType}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
      </div>
    </>
  );
};

export default RaiseTicket;
