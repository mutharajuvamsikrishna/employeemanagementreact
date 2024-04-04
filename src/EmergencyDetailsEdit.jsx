import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { updateEmergencyDetails, getEmergencyDetails } from "./Services/Api";
import * as Yup from "yup";

import "./EmergencyDetailsEdit.css";
import { Country, State, City } from "country-state-city";

const EmergencyDetailsEdit = () => {
  const location = useLocation();
  const email = location.state.data.email;
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    fetchEmergencyData(email);
    fetchStates();
  }, [email]);

  const fetchEmergencyData = (email) => {
    getEmergencyDetails(email)
      .then((response) => {
        formik.setValues({
          email: response.data[0].email,
          name: response.data[0].name,
          relation: response.data[0].relation,
          mobileNumber: response.data[0].mobileNumber,
          state: response.data[0].state,
          city: response.data[0].city,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStates = () => {
    const states = State.getStatesOfCountry("IN").map((states) => ({
      name: states.name,
      isoCode: states.isoCode,
    }));
    setStateList(states);
  };

  const fetchCities = (selectedState) => {
    const stateCode = stateList.find(
      (state) => state.name === selectedState
    )?.isoCode;
    if (stateCode) {
      const city = City.getCitiesOfState("IN", stateCode).map(
        (city) => city.name
      );
      setCityList(city);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: email,
      name: "",
      relation: "",
      mobileNumber: "",
      state: "",
      city: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("required"),
      relation: Yup.string().required("required"),
      mobileNumber: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be a 10-digit numeric value")
        .required("required"),
      state: Yup.string().required("required"),
      city: Yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      try {
        const confirmed = window.confirm(
          "Are you sure you want to save the changes?"
        );
        if (!confirmed) {
          return;
        }
        const response = await updateEmergencyDetails(values);
        if (response.status === 200) {
          alert("Details Saved Successfully");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="emer">
      <div className="row g-3 justify-content-center align-items-center">
        <h4 className="text-center text-primary">Employee Details</h4>
        <div className="col-md-12 mb-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
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
                <label>Relation</label>
                <input
                  type="text"
                  name="relation"
                  placeholder="Enter Relation"
                  className={`border form-control ${
                    formik.touched.relation && formik.errors.relation
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.relation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.relation && formik.errors.relation && (
                  <div className="invalid-feedback">
                    {formik.errors.relation}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter Mobile Number"
                  className={`border form-control ${
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.mobileNumber}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>State</label>
                <select
                  name="state"
                  className={`border form-control ${
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.state}
                  style={{ appearance: "auto" }}
                  onChange={(event) => {
                    formik.handleChange(event);
                    fetchCities(event.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select a State</option>
                  {stateList.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {formik.touched.state && formik.errors.state && (
                  <div className="invalid-feedback">{formik.errors.state}</div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>City</label>
                <select
                  name="city"
                  className={`border form-control ${
                    formik.touched.city && formik.errors.city
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ appearance: "auto" }}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value={formik.values.city}>
                    {formik.values.city}
                  </option>
                  {cityList.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {formik.touched.city && formik.errors.city && (
                  <div className="invalid-feedback">{formik.errors.city}</div>
                )}
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center" style={{ paddingTop: "30px" }}>
        <a href="javascript:history.go(-1)">Go Back</a>
      </div>
    </div>
  );
};

export default EmergencyDetailsEdit;
