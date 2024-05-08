import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postUserLogin } from "./Services/Api";
import OnieLogin from "./Images/employeelogin.png";
import "./Login.css";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [formData, setFormData] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      empId: "",
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      empId: Yup.string().required("ID is required"),
      password: Yup.string()
        .min(6, "Password should be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      var v = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*&@#]).{6,}/;
      if (!values.password.match(v)) {
        alert(
          "Password Should Minimum 6 Digits,Should have at least one uppercase and  Lowercase,One Numeric And Special Symbols Like @,&,*,#"
        );
        return false;
      }
       if(values.password==="Onie@12"){
          navigate("/forgetpassword")
          return;
        }
      try {
        const response = await postUserLogin(values);
        if (response.status === 200) {
          localStorage.setItem("jwtToken", response.data.jwt);
          if (response.data.role === "ROLE_USER") {
            navigate("/dashboardlayout/piechart", { state: { data: values } });
          } else if (response.data.role === "ROLE_ADMIN") {
            setFormData(values);
            handleShow();
            setDropdownOptions(["User", "Admin"]);
          } else if (response.data.role === "ROLE_SUPERADMIN") {
            setFormData(values);
            handleShow();
            setDropdownOptions(["User", "SuperAdmin"]);
          }
        }
      } catch (error) {
        setRes(true);
        console.error(error);
      }
    },
  });

  const setResponse = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  

  const handleSelectRole = (role) => {
    const values = {
      empId: formData.empId,
    };
    if (role === "user") {
      navigate("/dashboardlayout/piechart", { state: { data: values } });
    } else{
      navigate(`/${role}dashboardlayout/piechart`, { state: { data: values } });
    }
  };

  return (
    <div className="row">
      <div className="d-flex onieimg" style={{ paddingLeft: "100px" }}>
        <div className="">
          <img
            className=""
            src={OnieLogin}
            alt="ONiE SOFT"
            width="450px"
            height="350px"
          />
          <br />
          <h6 style={{ paddingLeft: "50px" }}>Made Management Easily</h6>
        </div>
        <div className="row g-3 d-flex me-3 userlogin">
          <div className="col-md-7 mb-2">
            <center>
              <form className="form-login" onSubmit={formik.handleSubmit}>
                <div className="text-danger">
                  {res && <h5 className="text-center">Invalid Credentials</h5>}
                </div>
                <h3 className="mb-3">Login to ONiE Soft Employee</h3>
                <div  className="col-md-7 mb-4">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="empId"
                    placeholder="Enter Employee ID"
                    className={`form-control ${
                      formik.touched.empId && formik.errors.empId
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.empId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.empId && formik.errors.empId && (
                    <div className="invalid-feedback">
                      {formik.errors.empId}
                    </div>
                  )}
                </div>
                <div className="col-md-7 mb-4">
                  <label>Password</label>
                  <div className="input-group">
                    <input
                      type={formik.values.showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      className={`form-control ${
                        formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <button
                      type="button"
                      className=""
                      style={{ border: "1px solid white" }}
                      onClick={setResponse}
                    >
                      {formik.values.showPassword ? (
                        <FaEye style={{ height: "20px", width: "20px" }} />
                      ) : (
                        <FaEyeSlash style={{ height: "20px", width: "20px" }} />
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div
                      style={{ display: "flex" }}
                      className="invalid-feedback"
                    >
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{
                    width: "40%",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Sign In
                </button>
                <div className="pt-3" style={{ marginTop: "10px" }}>
                  <Link to="/forgetpassword">Forgotten password/setPassword?</Link>
                  {/* <div style={{ paddingTop: "20px" }}>
                    <button
                      className="btn btn-success"
                      onClick={handleSubmit1}
                    >
                      SignUp
                    </button>
                  </div> */}
                  <br />
                </div>
              </form>
            </center>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        style={{ height: "600px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dropdown-style">
            <DropdownButton
              title="Select DashBoard"
              onSelect={handleSelectRole}
              variant="outline-primary"
              className="custom-dropdown"
            >
              {dropdownOptions.map((option, index) => (
                <Dropdown.Item key={index} eventKey={option.toLowerCase()}>
                  {option}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
