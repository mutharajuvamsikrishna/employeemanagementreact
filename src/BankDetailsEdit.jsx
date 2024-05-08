import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { putBankDetails, getBankDetails } from "./Services/Api";
import * as Yup from "yup";
import "./BankDetailsEdit.css";
const BankDetailsEdit = () => {
  const location = useLocation();
  const empId = location.state.data.empId;
  useEffect(() => {
    fetchBankData(empId);
  }, [empId]);

  const fetchBankData = (empId) => {
    getBankDetails(empId)
      .then((response) => {
        formik.setValues({
          regno: response.data.regno || "",
          empId: response.data.empId || "",
          bankName: response.data.bankName || "",
          branch: response.data.branch || "",
          ifcCode: response.data.ifcCode || "",
          accountNumber: response.data.accountNumber || "",
          name: response.data.name || "",
          bankFile: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      regno: "",
      empId: "",
      bankName: "",
      branch: "",
      ifcCode: "",
      accountNumber: "",
      name: "",
      bankFile: "",
    },
    validationSchema: Yup.object().shape({
      bankName: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "BankName should contain only alphabets")
        .required("Bank name is required"),
      branch: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "BranchName should contain only alphabets")
        .required("Branch is required"),
      ifcCode: Yup.string().required("IFSC code is required"),
      accountNumber: Yup.string()
        .matches(/^[0-9]+$/, "Account number must only contain numbers")
        .required("Account number is required"),

      name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Name should contain only alphabets")
        .required("Name is required"),
      bankFile: Yup.mixed()
        .test(
          "fileSize",
          "File size is between 20kb and 50kb",
          (value) =>
            !value || (value && value.size <= 51200 && value.size >= 20480) // 20kb to 50kb in bytes
        )
        .test(
          "fileType",
          "Only JPG, JPEG, or PNG files are allowed",
          (value) => {
            if (!value) return true; // if no file is provided, validation passes
            const acceptedFormats = ["image/jpeg", "image/jpg", "image/png"];
            return acceptedFormats.includes(value.type);
          }
        ),
    }),
    onSubmit: async (values) => {
      try {
        const confirmed = window.confirm(
          "Are you sure you want to save the changes?"
        );
        if (!confirmed) {
          return;
        }

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await putBankDetails(formData);
        if (response.status === 200 || response.status === 201) {
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
    <div className="bankedit">
      <div className="row g-3 justify-content-center align-items-center">
        <h4 className="text-center text-primary">Edit Bank Details</h4>
        <div className="col-md-12 mb-2">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-4 mb-4">
                <label>Bank Name</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  placeholder="Enter Bank Name"
                  className={`border form-control ${
                    formik.touched.bankName && formik.errors.bankName
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.bankName && formik.errors.bankName && (
                  <div className="invalid-feedback">
                    {formik.errors.bankName}
                  </div>
                )}
              </div>

              <div className="col-md-4 mb-4">
                <label>Branch</label>
                <input
                  type="text"
                  id="branch"
                  name="branch"
                  placeholder="Enter Branch"
                  className={`border form-control ${
                    formik.touched.branch && formik.errors.branch
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.branch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.branch && formik.errors.branch && (
                  <div className="invalid-feedback">{formik.errors.branch}</div>
                )}
              </div>

              <div className="col-md-4 mb-4">
                <label>IFSC Code</label>
                <input
                  type="text"
                  id="ifcCode"
                  name="ifcCode"
                  placeholder="Enter IFSC Code"
                  className={`border form-control ${
                    formik.touched.ifcCode && formik.errors.ifcCode
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.ifcCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.ifcCode && formik.errors.ifcCode && (
                  <div className="invalid-feedback">
                    {formik.errors.ifcCode}
                  </div>
                )}
              </div>

              <div className="col-md-4 mb-4">
                <label>Account Number</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Enter Account Number"
                  className={`border form-control ${
                    formik.touched.accountNumber && formik.errors.accountNumber
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.accountNumber &&
                  formik.errors.accountNumber && (
                    <div className="invalid-feedback">
                      {formik.errors.accountNumber}
                    </div>
                  )}
              </div>

              <div className="col-md-4 mb-4">
                <label>Account Holder Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Account Holder Name"
                  className={`border form-control ${
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
              <div className="col-md-4 mb-4">
                <label>Bank File</label>
                <input
                  type="file"
                  id="bankFile"
                  name="bankFile"
                  className={`border form-control ${
                    formik.touched.bankFile && formik.errors.bankFile
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(event) =>
                    formik.setFieldValue(
                      "bankFile",
                      event.currentTarget.files[0]
                    )
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.bankFile && formik.errors.bankFile && (
                  <div className="invalid-feedback">
                    {formik.errors.bankFile}
                  </div>
                )}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="text-center"
        style={{ paddingTop: "30px", marginBottom: "20px" }}
      >
        
      </div>
    </div>
  );
};

export default BankDetailsEdit;
