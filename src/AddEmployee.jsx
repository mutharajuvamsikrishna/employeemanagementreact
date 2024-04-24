import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserRegisterByAdmin, getAllReisters } from "./Services/Api";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Application.css";
import OniebgImage from "./Images/employeemanagementregisterimg.svg";
const AddEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [isEmailExists, setIsEmailExists] = useState(false);
const location=useLocation();
const data=location.state?.data.email;
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = () => {
    getAllReisters()
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.error("AxiosError:", error.message);
        console.error("Error details:", error.response);
      });
  };
  const formik = useFormik({
    initialValues: {
      personalEmail:"",
      email: "",
      name: "",
      mob: "",
      designation: "",
      roles: "",
      ctc: "",
    },
    validationSchema: Yup.object({
      personalEmail:Yup.string()
      .email("Invalid email address")
      .required("PersonalEmail is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Name should contain only alphabets")
        .required("Name is required"),
      mob: Yup.string()
        .matches(/^\d{10}$/, "Invalid mobile number")
        .required("Mobile number is required"),
      roles: Yup.string().required("Role is required"),
      designation: Yup.string().required("designation is required"),
      ctc: Yup.string().required("CTC is required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        const isEmailExists = formData.some(
          (user) => user.email === values.email
        );
        const isMobExists = formData.some((user) => user.mob === values.mob);
       
        if (isEmailExists) {
          setFieldError("email", "Email is already in use.");
          return;
        }
        setFieldError("email", "");
        if (isMobExists) {
          setFieldError("mob", "Mobile Number is already in use.");
          return;
        }
        setFieldError("mob", "");
        setLoading(true);
        const response = await UserRegisterByAdmin(values);
        if (response.status === 200) {
     alert("Details Saved SuccesFully")
     navigate("/superadmindashboardlayout/registers",{state:{data:data}})
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "99vh",paddingLeft:"400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-2">Loading...</h4>
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: "whitesmoke", minHeight: "99vh" }}>
      <div className="regbg">
        <h5 className="head">its Easy to SignUp</h5>

        <img
          src={OniebgImage}
          alt="ONiE SOFT"
          width="350px"
          height="350px"
          style={{ backgroundColor: "pink" }}
        />
      </div>
      <div className="row g-3 d-flex reg" style={{ paddingTop: "70px" }}>
        <div className="col-md-10 mb-2 bg bg-white regborder">
          <center>
            <form onSubmit={formik.handleSubmit} className="">
              <h3
                className="mb-4 text-center mt-4"
                style={{ fontFamily: "inherit" }}
              >
                Add New Employee
              </h3>

              <div className="row">
              <div id="register" className="col-md-6 mb-4">
                  <label className="col-md-5">Personal Email</label>
                  <input
                    type="text"
                    name="personalEmail"
                    placeholder="Enter Personal Email"
                    className={` form-control ${
                      formik.touched.personalEmail && formik.errors.personalEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.personalEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.personalEmail && formik.errors.personalEmail && (
                    <div className="invalid-feedback">
                      {formik.errors.personalEmail}
                    </div>
                  )}
                </div>


                <div id="register" className="col-md-6 mb-4">
                  <label className="col-md-2">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    className={` form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className={` form-control ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mob"
                    placeholder="Enter Mobile Number"
                    className={` form-control ${
                      formik.touched.mob && formik.errors.mob
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.mob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.mob && formik.errors.mob && (
                    <div className="invalid-feedback">{formik.errors.mob}</div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>Roles</label>
                  <select
                    id=""
                    name="roles"
                    style={{ appearance: "auto" }}
                    value={formik.values.roles}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.roles && formik.errors.roles
                        ? "is-invalid"
                        : ""
                    }`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="ROLE_USER">USER</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                  </select>
                  {formik.touched.roles && formik.errors.roles && (
                    <div className="invalid-feedback">
                      {formik.errors.roles}
                    </div>
                  )}
                </div>

                <div id="register" className="col-md-6 mb-4">
                  <label>Designation</label>
                  <div>
                    <input
                      type="text"
                      name="designation"
                      placeholder="Enter Designation"
                      className={` form-control ${
                        formik.touched.designation && formik.errors.designation
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.designation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                  {formik.touched.designation && formik.errors.designation && (
                    <div
                      style={{ display: "flex" }}
                      className="invalid-feedback"
                    >
                      {formik.errors.designation}
                    </div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>CTC</label>
                  <div>
                    <input
                      type="text"
                      name="ctc"
                      placeholder="Enter CTC"
                      className={` form-control ${
                        formik.touched.ctc && formik.errors.ctc
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.ctc}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                  {formik.touched.ctc && formik.errors.ctc && (
                    <div
                      style={{ display: "flex" }}
                      className="invalid-feedback"
                    >
                      {formik.errors.ctc}
                    </div>
                  )}
                </div>
              </div>
              <br />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ width: "150px", marginBottom: "30px" }}
              >
                Submit
              </button>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
