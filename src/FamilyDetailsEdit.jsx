import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { putFamilyDetails, getFamilyDetails } from "./Services/Api";
import * as Yup from "yup";
import "./FamilyDetails.css";
const FamilyDetailsEdit = () => {
  const navigate = useNavigate(); // Import useNavigate
  const location = useLocation();
  const email = location.state.data.email;

  useEffect(() => {
    fetchFamilyData(email);
  }, [email]);

  const fetchFamilyData = (email) => {
    getFamilyDetails(email)
      .then((response) => {
        formik.setValues({
          email: response.data[0].email || "",
          fatherName: response.data[0].fatherName || "",
          fatherAadhar: response.data[0].fatherAadhar || "",
          fatherPanCard: response.data[0].fatherPanCard || "",
          motherName: response.data[0].motherName || "",
          motherAadhar: response.data[0].motherAadhar || "",
          motherPan: response.data[0].motherPan || "",
          married: response.data[0].married || "",
          marriedName: response.data[0].marriedName || "",
          marriedAadhar: response.data[0].marriedAadhar || "",
          marriedPan: response.data[0].marriedPan || "",
          children: response.data[0].children || "",
          childname: response.data[0].childname || "",
          childAadhar: response.data[0].childAadhar || "",
          childPan: response.data[0].childPan || "",
          children1: response.data[0].children1 || "",
          childname1: response.data[0].childname1 || "",
          childAadhar1: response.data[0].childAadhar1 || "",
          childPan1: response.data[0].childPan1 || "",
          children2: response.data[0].children2 || "",
          childname2: response.data[0].childname2 || "",
          childAadhar2: response.data[0].childAadhar2 || "",
          childPan2: response.data[0].childPan2 || "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      fatherName: "",
      fatherAadhar: "",
      fatherPanCard: "",
      motherName: "",
      motherAadhar: "",
      motherPan: "",
      married: "",
      marriedName: "",
      marriedAadhar: "",
      marriedPan: "",
      children: "",
      childname: "",
      childAadhar: "",
      childPan: "",
      children1: "",
      childname1: "",
      childAadhar1: "",
      childPan1: "",
      children2: "",
      childname2: "",
      childAadhar2: "",
      childPan2: "",
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
      children: Yup.string().when("married", (married, schema) => {
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
      //  child1 start
      children1: Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
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
      // child 2 starts
      children2: Yup.string().when("married", (married, schema) => {
        if (married[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      childname2: Yup.string().when("children2", (children2, schema) => {
        if (children2[0] === "Yes") {
          return schema
            .matches(
              /^[A-Za-z]+$/,
              "Child's name must contain only alphabetic characters"
            )
            .required("required");
        }
        return schema;
      }),
      childAadhar2: Yup.string().when("children", (children2, schema) => {
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
    }),
    onSubmit: async (values) => {
      try {
        const confirmed = window.confirm(
          "Are you sure you want to save the changes?"
        );
        if (!confirmed) {
          return;
        }
        const response = await putFamilyDetails(values);
        if (response.status === 200) {
          alert("Details Saved Sucess Fully");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
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
                      placeholder="Enter Maried Name"
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
                    <label> Aadhar Number</label>
                    <input
                      type="text"
                      name="marriedAadhar"
                      placeholder="Enter Married Aadhar Number"
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
                    <label> PAN Number</label>
                    <input
                      type="text"
                      name="marriedPan"
                      placeholder=" Enter Married PAN Number"
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
                                  placeholder="Enter Child1 Name"
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

export default FamilyDetailsEdit;
