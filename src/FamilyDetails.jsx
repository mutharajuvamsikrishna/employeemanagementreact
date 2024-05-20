import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { postFamilyDetails, getFamilyDetails } from "./Services/Api";
import * as Yup from "yup";
import "./FamilyDetailsEdit.css"
import FamilyDetailsView from "./FamilyDetailsView";
const FamilyDetails = () => {
  const navigate = useNavigate(); // Import useNavigate
  const location = useLocation();
  const empId = location.state.data.empId;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchFamilyData(empId);
  }, [empId]);

  const fetchFamilyData = (empId) => {
    getFamilyDetails(empId)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      empId: empId,
      fatherName: "",
      fatherAadhar: "",
      fatherPanCard: "",
       fatherMob:"",
       fatherAge:"",
      fatherAddress:"",
      motherName: "",
      motherAadhar: "",
      motherPan: "",
      motherMob:"",
      motherAge:"",
      motherAddress:"",
      married: "",
      marriedName: "",
      marriedAadhar: "",
      marriedPan: "",
      marriedMob:"",
      marriedAge:"",
      marriedAddress:"",
      children: "",
      childname: "",
      childAadhar: "",
      childPan: "",
      childMob:"",
      childAge:"",
      childAddress:"",
      children1: "",
      childname1: "",
      childAadhar1: "",
      childPan1: "",
      childMob1:"",
      childAge1:"",
      childAddress1:"",
      children2: "",
      childname2: "",
      childAadhar2: "",
      childPan2: "",
      childMob2:"",
      childAge2:"",
      childAddress2:"",
    },
    validationSchema: Yup.object().shape({
      fatherName: Yup.string()
        .matches(
          /^[A-Za-z]+$/,
          "Father's name must contain only alphabetic characters"
        )
        .required("required"),
      fatherAadhar: Yup.string()
        .matches(/^\d{12}$/, "Aadhar number must be a 12-digit numeric value")
        .required("Aadhar number is required"),
      fatherPanCard: Yup.string()
        .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Invalid PAN Card number")
        .required("PAN Card number is required"),
        fatherMob:Yup.string().matches(/^\d{10}$/, "Mobile number 10 Digits Only").required(),
 fatherAge:Yup.number().typeError("Age Numerics Only").required("required"),
fatherAddress:Yup.string().required("requird"),
      motherName: Yup.string()
        .matches(
          /^[A-Za-z]+$/,
          "Mother's name must contain only alphabetic characters"
        )
        .required("Mother's name is required"),
      motherAadhar: Yup.string()
        .matches(/^\d{12}$/, "Aadhar number must be a 12-digit numeric value")
        .required("Aadhar number is required"),
      motherPan: Yup.string()
        .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Invalid PAN Card number")
        .required("PAN Card number is required"),
        motherMob:Yup.string().matches(/^\d{12}$/, "Mobile number 10 Digits Only").required(),
        motherAge:Yup.number().typeError("Age Numerics Only").required("required"),
       motherAddress:Yup.string().required("requird"),
      married: Yup.string().required("required"),
      marriedName: Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
          return schema
            .matches(
              /^[A-Za-z]+$/,
              "Spouse's name must contain only alphabetic characters"
            )
            .required("required");
        }
        return schema;
      }),
      marriedAadhar: Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
          return schema
            .matches(
              /^\d{12}$/,
              "Aadhar number must be a 12-digit numeric value"
            )
            .required("required");
        }
        return schema;
      }),
      marriedPan: Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
          return schema
            .matches(
              /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
              "Invalid PAN Card number"
            )
            .required("required");
        }
        return schema;
      }),
      marriedMob:Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
          return schema
          .matches(/^\d{10}$/, "Mobile number 10 Digits Only")
            .required("required");
        }
        return schema;
      }),
      marriedAge:Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
          return schema
          .matches(/^([0-9]){4}$/, 'Invalid Age')
            .required("required");
        }
        return schema;
      }),
      marriedAddress:Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
          return schema
            .required("required");
        }
        return schema;
      }),
      children: Yup.string().when("married", (married,schema) => {
        if (married[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      childname: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .matches(
              /^[A-Za-z]+$/,
              "Child's name must contain only alphabetic characters"
            )
            .required("required");
        }
        return schema;
      }),
      childAadhar: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .matches(
              /^\d{12}$/,
              "Aadhar number must be a 12-digit numeric value"
            )
            .required("required");
        }
        return schema;
      }),
      childPan: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .matches(
              /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
              "Invalid PAN Card number"
            )
            .required("required");
        }
        return schema;
      }),
      childMob: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .matches(
              /^\d{10}$/,
              "Mobile number 10 Digits Only"
            )
            .required("required");
        }
        return schema;
      }),
      childAge: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
          .matches(/^([0-9]){4}$/, 'Invalid Age')
            .required("required");
        }
        return schema;
      }),
      childAddress: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .required("required");
        }
        return schema;
      }),


      //  child1 start
      children1: Yup.string().when("children", (children,schema) => {
        if (children[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      childname1: Yup.string().when("children1", (children1, schema) => {
        if (children1[0] === "Yes") {
          return schema
            .matches(
              /^[A-Za-z]+$/,
              "Child's name must contain only alphabetic characters"
            )
            .required("required");
        }
        return schema;
      }),
      childAadhar1: Yup.string().when("children1", (children1, schema) => {
        if (children1[0] === "Yes") {
          return schema
            .matches(
              /^\d{12}$/,
              "Aadhar number must be a 12-digit numeric value"
            )
            .required("required");
        }
        return schema;
      }),
      childPan1: Yup.string().when("children1", (children1, schema) => {
        if (children1[0] === "Yes") {
          return schema
            .matches(
              /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
              "Invalid PAN Card number"
            )
            .required("required");
        }
        return schema;
      }),
      childMob1: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .matches(
              /^\d{10}$/,
              "Mobile number 10 Digits Only"
            )
            .required("required");
        }
        return schema;
      }),
      childAge1: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
          .matches(/^([0-9]){4}$/, 'Invalid Age')
            .required("required");
        }
        return schema;
      }),
      childAddress1: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .required("required");
        }
        return schema;
      }),

      // child 2 starts
      children2: Yup.string().when("children1", (children1,schema) => {
        if (children1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      childname2: Yup.string().when("children2", (children2, schema) => {
        if (children2[0] === "Yes") {
          console.log(children2[0])
          return schema
            .matches(
              /^[A-Za-z]+$/,
              "Child's name must contain only alphabetic characters"
            )
            .required("required");
        }
        return schema;
      }),
      childAadhar2: Yup.string().when("children2", (children2, schema) => {
        if (children2[0] === "Yes") {
          return schema
            .matches(
              /^\d{12}$/,
              "Aadhar number must be a 12-digit numeric value"
            )
            .required("required");
        }
        return schema;
      }),
      childPan2: Yup.string().when("children2", (children2, schema) => {
        if (children2[0] === "Yes") {
          return schema
            .matches(
              /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
              "Invalid PAN Card number"
            )
            .required("required");
        }
        return schema;
      }),
      childMob2: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .matches(
              /^\d{10}$/,
              "Mobile number 10 Digits Only"
            )
            .required("required");
        }
        return schema;
      }),
      childAge2: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
          .matches(/^([0-9]){4}$/, 'Invalid Age')
            .required("required");
        }
        return schema;
      }),
      childAddress2: Yup.string().when("children", (children, schema) => {
        if (children[0] === "Yes") {
          return schema
            .required("required");
        }
        return schema;
      }),

    }),
    onSubmit: async (values) => {
      try {
        const response = await postFamilyDetails(values);
        if (response.status === 200) {
          alert("Details Saved Sucess Fully")
 window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  if(formData.length>0){
    return(
      <div>
        <FamilyDetailsView/>
      </div>
    )
  }
  console.log(formik.errors);
  return (
    <div className="family">
      <div className="row g-3 justify-content-center align-items-center">
        <div className="col-md-12 mb-2">
          <form onSubmit={formik.handleSubmit}>
          <h4 className="text-center text-primary">Family Details</h4>
            <div className="row">
              <div className="col-md-4 mb-4">
                <label>Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Enter Father's Name"
                  className={`border form-control ${
                    formik.touched.fatherName && formik.errors.fatherName
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.fatherName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.fatherName && formik.errors.fatherName && (
                  <div className="invalid-feedback">
                    {formik.errors.fatherName}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Father Aadhar Number</label>
                <input
                  type="text"
                  name="fatherAadhar"
                  placeholder="Enter Father Aadhar Number"
                  className={`border form-control ${
                    formik.touched.fatherAadhar && formik.errors.fatherAadhar
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.fatherAadhar}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.fatherAadhar && formik.errors.fatherAadhar && (
                  <div className="invalid-feedback">
                    {formik.errors.fatherAadhar}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Father PAN Number</label>
                <input
                  type="text"
                  name="fatherPanCard"
                  placeholder=" Enter Father PAN Number"
                  className={`border form-control ${
                    formik.touched.fatherPanCard && formik.errors.fatherPanCard
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.fatherPanCard}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.fatherPanCard &&
                  formik.errors.fatherPanCard && (
                    <div className="invalid-feedback">
                      {formik.errors.fatherPanCard}
                    </div>
                  )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Father Mobile Number</label>
                <input
                  type="text"
                  name="fatherMob"
                  placeholder="Enter Father Mobile Number"
                  className={`border form-control ${
                    formik.touched.fatherMob && formik.errors.fatherMob
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.fatherMob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.fatherMob && formik.errors.fatherMob && (
                  <div className="invalid-feedback">
                    {formik.errors.fatherMob}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Father Age</label>
                <input
                  type="text"
                  name="fatherAge"
                  placeholder="Enter Father Age"
                  className={`border form-control ${
                    formik.touched.fatherAge && formik.errors.fatherAge
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.fatherAge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.fatherAge && formik.errors.fatherAge && (
                  <div className="invalid-feedback">
                    {formik.errors.fatherAge}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Father Address</label>
                <textarea
                  type="text"
                  name="fatherAddress"
                  placeholder="Enter Father Address"
                  className={`border form-control ${
                    formik.touched.fatherAddress && formik.errors.fatherAddress
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.fatherAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.fatherAddress && formik.errors.fatherAddress && (
                  <div className="invalid-feedback">
                    {formik.errors.fatherAddress}
                  </div>
                )}
              </div>

              {/* Mother Started */}
              <div className="col-md-4 mb-4">
                <label>Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  placeholder="Enter mother's Name"
                  className={`border form-control ${
                    formik.touched.motherName && formik.errors.motherName
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.motherName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.motherName && formik.errors.motherName && (
                  <div className="invalid-feedback">
                    {formik.errors.motherName}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Mother Aadhar Number</label>
                <input
                  type="text"
                  name="motherAadhar"
                  placeholder="Enter mother Aadhar Number"
                  className={`border form-control ${
                    formik.touched.motherAadhar && formik.errors.motherAadhar
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.motherAadhar}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.motherAadhar && formik.errors.motherAadhar && (
                  <div className="invalid-feedback">
                    {formik.errors.motherAadhar}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Mother PAN Number</label>
                <input
                  type="text"
                  name="motherPan"
                  placeholder="Enter Mother PAN Number"
                  className={`border form-control ${
                    formik.touched.motherPan && formik.errors.motherPan
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.motherPan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.motherPan && formik.errors.motherPan && (
                  <div className="invalid-feedback">
                    {formik.errors.motherPan}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Mother Mobile Number</label>
                <input
                  type="text"
                  name="motherMob"
                  placeholder="Enter Mother Mobile Number"
                  className={`border form-control ${
                    formik.touched.motherMob && formik.errors.motherMob
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.motherMob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.motherMob && formik.errors.motherMob && (
                  <div className="invalid-feedback">
                    {formik.errors.motherMob}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Mother Age</label>
                <input
                  type="text"
                  name="motherAge"
                  placeholder="Enter Mother Age"
                  className={`border form-control ${
                    formik.touched.motherAge && formik.errors.motherAge
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.motherAge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.motherAge && formik.errors.motherAge && (
                  <div className="invalid-feedback">
                    {formik.errors.motherAge}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Mother Address</label>
                <textarea
                  type="text"
                  name="motherAddress"
                  placeholder="Enter Mother Address"
                  className={`border form-control ${
                    formik.touched.motherAddress && formik.errors.motherAddress
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.motherAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.motherAddress && formik.errors.motherAddress && (
                  <div className="invalid-feedback">
                    {formik.errors.motherAddress}
                  </div>
                )}
              </div>
              {/* Maried Start */}
              <div className="col-md-4 mb-4">
                <label>Do you Married?</label>
                <select
                  name="married"
                  style={{ appearance: "auto" }}
                  className={`border  form-control ${
                    formik.touched.married && formik.errors.married
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.married}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {formik.touched.married && formik.errors.married && (
                  <div className="invalid-feedback">
                    {formik.errors.married}
                  </div>
                )}
              </div>
              {formik.values.married === "Yes" && (
                <>
                  <div className="col-md-4 mb-4">
                    <label>Spouse Name</label>
                    <input
                      type="text"
                      name="marriedName"
                      placeholder="Enter Spouse Name"
                      className={`border form-control ${
                        formik.touched.marriedName && formik.errors.marriedName
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.marriedName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.marriedName &&
                      formik.errors.marriedName && (
                        <div className="invalid-feedback">
                          {formik.errors.marriedName}
                        </div>
                      )}
                  </div>
                  <div className="col-md-4 mb-4">
                    <label>Spouse Aadhar Number</label>
                    <input
                      type="text"
                      name="marriedAadhar"
                      placeholder="Enter Spouse Aadhar Number"
                      className={`border form-control ${
                        formik.touched.marriedAadhar &&
                        formik.errors.marriedAadhar
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.marriedAadhar}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.marriedAadhar &&
                      formik.errors.marriedAadhar && (
                        <div className="invalid-feedback">
                          {formik.errors.marriedAadhar}
                        </div>
                      )}
                  </div>
                  <div className="col-md-4 mb-4">
                    <label>Spouse PAN Number</label>
                    <input
                      type="text"
                      name="marriedPan"
                      placeholder=" Enter Spouse PAN Number"
                      className={`border form-control ${
                        formik.touched.marriedPan && formik.errors.marriedPan
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.marriedPan}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.marriedPan && formik.errors.marriedPan && (
                      <div className="invalid-feedback">
                        {formik.errors.marriedPan}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-4">
                <label> Spouse Mobile Number</label>
                <input
                  type="text"
                  name="marriedMob"
                  placeholder="Enter Spouse Mobile Number"
                  className={`border form-control ${
                    formik.touched.marriedMob && formik.errors.marriedMob
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.marriedMob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.marriedMob && formik.errors.marriedMob && (
                  <div className="invalid-feedback">
                    {formik.errors.marriedMob}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Spouse Age</label>
                <input
                  type="text"
                  name="marriedAge"
                  placeholder="Enter Spouse Age"
                  className={`border form-control ${
                    formik.touched.marriedAge && formik.errors.marriedAge
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.marriedAge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.marriedAge && formik.errors.marriedAge && (
                  <div className="invalid-feedback">
                    {formik.errors.marriedAge}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Spouse Address</label>
                <textarea
                  type="text"
                  name="marriedAddress"
                  placeholder="Enter Spouse Address"
                  className={`border form-control ${
                    formik.touched.marriedAddress && formik.errors.marriedAddress
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.marriedAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.marriedAddress && formik.errors.marriedAddress && (
                  <div className="invalid-feedback">
                    {formik.errors.marriedAddress}
                  </div>
                )}
              </div>
                  <div className="col-md-4 mb-4">
                    <label>Do you have Children?</label>
                    <select
                      name="children"
                      style={{ appearance: "auto" }}
                      className={`border  form-control ${
                        formik.touched.children && formik.errors.children
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.children}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.touched.children && formik.errors.children && (
                      <div className="invalid-feedback">
                        {formik.errors.children}
                      </div>
                    )}
                  </div>
                  {formik.values.children === "Yes" && (
                    <>
                      <div className="col-md-4 mb-4">
                        <label>Child1 Name</label>
                        <input
                          type="text"
                          name="childname"
                          placeholder="Enter Child1 Name"
                          className={`border form-control ${
                            formik.touched.childname && formik.errors.childname
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.childname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                        {formik.touched.childname &&
                          formik.errors.childname && (
                            <div className="invalid-feedback">
                              {formik.errors.childname}
                            </div>
                          )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Child1 Aadhar Number</label>
                        <input
                          type="text"
                          name="childAadhar"
                          placeholder="Enter child Aadhar Number"
                          className={`border form-control ${
                            formik.touched.childAadhar &&
                            formik.errors.childAadhar
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.childAadhar}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                        {formik.touched.childAadhar &&
                          formik.errors.childAadhar && (
                            <div className="invalid-feedback">
                              {formik.errors.childAadhar}
                            </div>
                          )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Child1 PAN Number</label>
                        <input
                          type="text"
                          name="childPan"
                          placeholder=" Enter child PAN Number"
                          className={`border form-control ${
                            formik.touched.childPan && formik.errors.childPan
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.childPan}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                        {formik.touched.childPan && formik.errors.childPan && (
                          <div className="invalid-feedback">
                            {formik.errors.childPan}
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                <label>Child1 Mobile Number</label>
                <input
                  type="text"
                  name="childMob"
                  placeholder="Enter Child1 Mobile Number"
                  className={`border form-control ${
                    formik.touched.childMob && formik.errors.childMob
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childMob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childMob && formik.errors.childMob && (
                  <div className="invalid-feedback">
                    {formik.errors.childMob}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Child1 Age</label>
                <input
                  type="text"
                  name="childAge"
                  placeholder="Enter Child1 Age"
                  className={`border form-control ${
                    formik.touched.childAge && formik.errors.childAge
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childAge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childAge && formik.errors.childAge && (
                  <div className="invalid-feedback">
                    {formik.errors.childAge}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Child1 Address</label>
                <textarea
                  type="text"
                  name="childAddress"
                  placeholder="Enter Child1 Address"
                  className={`border form-control ${
                    formik.touched.childAddress && formik.errors.childAddress
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childAddress && formik.errors.childAddress && (
                  <div className="invalid-feedback">
                    {formik.errors.childAddress}
                  </div>
                )}
              </div>
                      {/* Child 2 start */}
                      <div className="col-md-4 mb-4">
                        <label>Do you have Child2?</label>
                        <select
                          name="children1"
                          style={{ appearance: "auto" }}
                          className={`border  form-control ${
                            formik.touched.children1 && formik.errors.children1
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.children1}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {formik.touched.children1 &&
                          formik.errors.children1 && (
                            <div className="invalid-feedback">
                              {formik.errors.children1}
                            </div>
                          )}
                      </div>
                      {formik.values.children1 === "Yes" && (
                        <>
                          <div className="col-md-4 mb-4">
                            <label>Child2 Name</label>
                            <input
                              type="text"
                              name="childname1"
                              placeholder="Enter Child1 Name"
                              className={`border form-control ${
                                formik.touched.childname1 &&
                                formik.errors.childname1
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={formik.values.childname1}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                            />
                            {formik.touched.childname1 &&
                              formik.errors.childname1 && (
                                <div className="invalid-feedback">
                                  {formik.errors.childname1}
                                </div>
                              )}
                          </div>
                          <div className="col-md-4 mb-4">
                            <label>Child2 Aadhar Number</label>
                            <input
                              type="text"
                              name="childAadhar1"
                              placeholder="Enter child Aadhar Number"
                              className={`border form-control ${
                                formik.touched.childAadhar1 &&
                                formik.errors.childAadhar1
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={formik.values.childAadhar1}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                            />
                            {formik.touched.childAadhar1 &&
                              formik.errors.childAadhar1 && (
                                <div className="invalid-feedback">
                                  {formik.errors.childAadhar1}
                                </div>
                              )}
                          </div>
                          <div className="col-md-4 mb-4">
                            <label>Child2 PAN Number</label>
                            <input
                              type="text"
                              name="childPan1"
                              placeholder=" Enter child PAN Number"
                              className={`border form-control ${
                                formik.touched.childPan1 &&
                                formik.errors.childPan1
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={formik.values.childPan1}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                            />
                            {formik.touched.childPan1 &&
                              formik.errors.childPan1 && (
                                <div className="invalid-feedback">
                                  {formik.errors.childPan1}
                                </div>
                              )}
                          </div>
                          <div className="col-md-4 mb-4">
                <label>Child2 Mobile Number</label>
                <input
                  type="text"
                  name="childMob1"
                  placeholder="Enter Child2 Mobile Number"
                  className={`border form-control ${
                    formik.touched.childMob1 && formik.errors.childMob1
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childMob1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childMob1 && formik.errors.childMob1 && (
                  <div className="invalid-feedback">
                    {formik.errors.childMob1}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Child2 Age</label>
                <input
                  type="text"
                  name="childAge1"
                  placeholder="Enter Child2 Age"
                  className={`border form-control ${
                    formik.touched.childAge1 && formik.errors.childAge1
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childAge1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childAge1 && formik.errors.childAge1 && (
                  <div className="invalid-feedback">
                    {formik.errors.childAge1}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Child2 Address</label>
                <textarea
                  type="text"
                  name="childAddress1"
                  placeholder="Enter Child2 Address"
                  className={`border form-control ${
                    formik.touched.childAddress1 && formik.errors.childAddress1
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childAddress1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childAddress1 && formik.errors.childAddress1 && (
                  <div className="invalid-feedback">
                    {formik.errors.childAddress1}
                  </div>
                )}
              </div>
                          {/* Child 3 strats */}
                          <div className="col-md-4 mb-4">
                            <label>Do you have Child3?</label>
                            <select
                              name="children2"
                              style={{ appearance: "auto" }}
                              className={`border  form-control ${
                                formik.touched.children2 &&
                                formik.errors.children2
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={formik.values.children2}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                            {formik.touched.children2 &&
                              formik.errors.children2 && (
                                <div className="invalid-feedback">
                                  {formik.errors.children2}
                                </div>
                              )}
                          </div>
                          {formik.values.children2 === "Yes" && (
                            <>
                              <div className="col-md-4 mb-4">
                                <label>Child3 Name</label>
                                <input
                                  type="text"
                                  name="childname2"
                                  placeholder="Enter Child3 Name"
                                  className={`border form-control ${
                                    formik.touched.childname2 &&
                                    formik.errors.childname2
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={formik.values.childname2}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  required
                                />
                                {formik.touched.childname2 &&
                                  formik.errors.childname2 && (
                                    <div className="invalid-feedback">
                                      {formik.errors.childname2}
                                    </div>
                                  )}
                              </div>
                              <div className="col-md-4 mb-4">
                                <label>Child3 Aadhar Number</label>
                                <input
                                  type="text"
                                  name="childAadhar2"
                                  placeholder="Enter child Aadhar Number"
                                  className={`border form-control ${
                                    formik.touched.childAadhar2 &&
                                    formik.errors.childAadhar2
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={formik.values.childAadhar2}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  required
                                />
                                {formik.touched.childAadhar2 &&
                                  formik.errors.childAadhar2 && (
                                    <div className="invalid-feedback">
                                      {formik.errors.childAadhar2}
                                    </div>
                                  )}
                              </div>
                              <div className="col-md-4 mb-4">
                                <label>Child3 PAN Number</label>
                                <input
                                  type="text"
                                  name="childPan2"
                                  placeholder=" Enter child PAN Number"
                                  className={`border form-control ${
                                    formik.touched.childPan2 &&
                                    formik.errors.childPan2
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={formik.values.childPan2}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  required
                                />
                                {formik.touched.childPan2 &&
                                  formik.errors.childPan2 && (
                                    <div className="invalid-feedback">
                                      {formik.errors.childPan2}
                                    </div>
                                  )}
                              </div>
                              <div className="col-md-4 mb-4">
                <label>Child3 Mobile Number</label>
                <input
                  type="text"
                  name="childMob2"
                  placeholder="Enter Child3 Mobile Number"
                  className={`border form-control ${
                    formik.touched.childMob2 && formik.errors.childMob2
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childMob2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childMob2 && formik.errors.childMob2 && (
                  <div className="invalid-feedback">
                    {formik.errors.childMob2}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Child3 Age</label>
                <input
                  type="text"
                  name="childAge2"
                  placeholder="Enter Child3 Age"
                  className={`border form-control ${
                    formik.touched.childAge2 && formik.errors.childAge2
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childAge2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childAge2 && formik.errors.childAge2 && (
                  <div className="invalid-feedback">
                    {formik.errors.childAge2}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Child3 Address</label>
                <textarea
                  type="text"
                  name="childAddress2"
                  placeholder="Enter Child3 Address"
                  className={`border form-control ${
                    formik.touched.childAddress2 && formik.errors.childAddress2
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.childAddress2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.childAddress2 && formik.errors.childAddress2 && (
                  <div className="invalid-feedback">
                    {formik.errors.childAddress2}
                  </div>
                )}
              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
          </form>
        </div>
      </div>
      <div className="text-center" style={{ paddingTop: "30px" }}>
          
        </div>
    </div>
  );
};

export default FamilyDetails;
