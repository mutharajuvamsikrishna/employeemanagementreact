import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { postUserLogin } from "./Services/Api";
import OnieLogin from './Images/employeelogin.png'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
      showPassword1: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(6, 'Password should be at least 6 characters')
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
      try {
        const response = await postUserLogin(values);

        if (response.status === 200) {
          localStorage.setItem('jwtToken', response.data.jwt);
          navigate("/dashboard", { state: { data: values } });
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

  const handleSubmit1 = () => {
    navigate("/reg");
  };

  return (
    <>
      <div className="row">
        <div className="d-flex onieimg" style={{ paddingLeft: "100px" }}>
          <div className="">
            <img
              className=''
              src={OnieLogin}
              alt="ONiE SOFT"
              width="350px"
              height="250px"
            />
            <br/>
            <h6 style={{ paddingLeft: "50px" }}>Manage All Your Payments Easily</h6>
          </div>
          <div className="row g-3 d-flex me-3 userlogin">
            <div className="col-md-7 mb-2">
              <center>
                <form className="form-login" onSubmit={formik.handleSubmit}>
                  <div className="text-danger">
                    {res && <h5 className="text-center">Invalid Credentials</h5>}
                  </div>
                  <h3 className="mb-3">Login to ONiE Soft Employee</h3>
                  <div id="register" className="col-md-7 mb-4">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Email"
                      className={`form-control ${
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
                      <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                  </div>

                  <div id="register" className="col-md-7 mb-4">
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
                      <div style={{ display: "flex" }} className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    className="btn btn-primary"
                    type="submit"
                    style={{ width: "50%", fontWeight: "bold", fontSize: "15px" }}
                  >
                    Sign In
                  </button>
                  <div className="pt-3">
                    <Link to="/forgetpassword">Forgotten account?</Link>
                    <div style={{ paddingTop: "20px" }}>
                      <button className="btn btn-success" onClick={handleSubmit1}>
                        SignUp
                      </button>
                    </div>
                   
                    <br/>
                  </div>
                </form>
              </center>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
