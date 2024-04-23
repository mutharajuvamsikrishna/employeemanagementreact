import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import { postEmployeeDetails, getEmployeeDetails } from "./Services/Api";
import * as Yup from "yup";
import "./EmployeeDetails.css";
import ViewEmployeeDetails from "./ViewEmployeeDetails";
import { Country, State } from "country-state-city";
const EditEmployeeDetails = () => {
  const navigate = useNavigate(); // Import useNavigate
  const location = useLocation();
  const email = location.state.data.email;
  const [formData, setFormData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [city, setCity] = useState("");
  useEffect(() => {
    fetchEmployeeData(email);
    fetchCountries();
  }, [email]);

  const fetchEmployeeData = (email) => {
    getEmployeeDetails(email)
      .then((response) => {
        setCity(response.data[0].cities);
        formik.setValues({
          laptopId: response.data[0].laptopId || "",
          email: response.data[0].email || "",
          totalExperience: response.data[0].totalExperience || "",
          currentCtc: response.data[0].currentCtc || "",
          role: response.data[0].role || "",
          designation: response.data[0].designation || "",
          joinDate: response.data[0].joinDate || "",
          isLaptop: response.data[0].isLaptop || "",
          laptopIssueDate: response.data[0].laptopIssueDate || "",
          laptopModel: response.data[0].laptopModel || "",
          empId: response.data[0].empId || "",
          pf: response.data[0].pf || "",
          domain: response.data[0].domain || "",
          skills: response.data[0].skills || "",
          onsite: response.data[0].onsite || "",
          countries: response.data[0].countries || "",
          cities: response.data[0].cities || "",
          companyNames: response.data[0].companyNames || "",
          clientSupport: response.data[0].clientSupport || "",
          prevCompany: response.data[0].prevCompany || "",
          prevEmpId: response.data[0].prevEmpId || "",
          prevJoinDate: response.data[0].prevJoinDate || "",
          prevEndDate: response.data[0].prevEndDate || "",
          prevDomain: response.data[0].prevDomain || "",
          prevCtc: response.data[0].prevCtc || "",
          prevCompany1: response.data[0].prevCompany1 || "",
          prevEmpId1: response.data[0].prevEmpId1 || "",
          prevJoinDate1: response.data[0].prevJoinDate1 || "",
          prevEndDate1: response.data[0].prevEndDate1 || "",
          prevDomain1: response.data[0].prevDomain1 || "",
          prevCtc1: response.data[0].prevCtc1 || "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCountries = () => {
    const countries = Country.getAllCountries().map((country) => ({
      name: country.name,
      isoCode: country.isoCode,
    }));
    setCountryList(countries);
  };

  const fetchStates = (selectedCountry) => {
    const countryCode = countryList.find(
      (country) => country.name === selectedCountry
    )?.isoCode;
    if (countryCode) {
      const states = State.getStatesOfCountry(countryCode).map(
        (state) => state.name
      );
      setStateList(states);
    }
  };

  const formik = useFormik({
    initialValues: {
      laptopId: "",
      email: "",
      totalExperience: "",
      currentCtc: "",
      role: "",
      designation: "",
      joinDate: "",
      isLaptop: "",
      laptopIssueDate: "",
      laptopModel: "",
      empId: "",
      pf: "",
      domain: "",
      skills: "",
      onsite: "",
      countries: "",
      cities: "",
      companyNames: "",
      clientSupport: "",
      prevCompany: "",
      prevEmpId: "",
      prevJoinDate: "",
      prevEndDate: "",
      prevDomain: "",
      prevCtc: "",
      prevCompany1: "",
      prevEmpId1: "",
      prevJoinDate1: "",
      prevEndDate1: "",
      prevDomain1: "",
      prevCtc1: "",
    },
    validationSchema: Yup.object().shape({
      totalExperience: Yup.number()
        .typeError("Total experience must be a number")
        .required("required"),
      currentCtc: Yup.number()
        .typeError("Current CTC must be a number")
        .required("required"),
      role: Yup.string().required("required"),
      pf: Yup.string(),
      designation: Yup.string().required("required"),
      joinDate: Yup.date()
        .required("required")
        .min(new Date("2022-01-01"), "Invalid Date")
        .max(new Date(), "Invalid Date"),
      isLaptop: Yup.string().required("required"),
      laptopIssueDate: Yup.date().when("isLaptop", (isLaptop, schema) => {
        if (isLaptop[0] === "Yes") {
          return schema.required("required").max(new Date(), "Invalid Date");
        }
        return schema;
      }),
      laptopModel: Yup.string().when("isLaptop", (isLaptop, schema) => {
        if (isLaptop[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      empId: Yup.string().required("required"),
      domain: Yup.string().required("required"),
      skills: Yup.string().required("required"),
      onsite: Yup.string().required("required"),
      countries: Yup.string().when("onsite", (onsite, schema) => {
        if (onsite[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      cities: Yup.string().when("onsite", (onsite, schema) => {
        if (onsite[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      companyNames: Yup.string().when("onsite", (onsite, schema) => {
        if (onsite[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      clientSupport: Yup.string().when("onsite", (onsite, schema) => {
        if (onsite[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      prevCompany: Yup.string().required("required"),
      prevEmpId: Yup.string().when("prevCompany", (prevCompany, schema) => {
        if (prevCompany[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      prevJoinDate: Yup.date().when("prevCompany", (prevCompany, schema) => {
        if (prevCompany[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      prevEndDate: Yup.date().when("prevCompany", (prevCompany, schema) => {
        if (prevCompany[0] === "Yes") {
          return schema
            .required("required")
            .min(Yup.ref("prevJoinDate"), "Invalid Date")
            .max(new Date(), "Invalid Date");
        }
        return schema;
      }),

      prevDomain: Yup.string().when("prevCompany", (prevCompany, schema) => {
        if (prevCompany[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      prevCtc: Yup.number().when("prevCompany", (prevCompany, schema) => {
        if (prevCompany[0] === "Yes") {
          return schema
            .typeError("Previous CTC must be a number")
            .required("required");
        }
        return schema;
      }),
      prevCompany1: Yup.string().when("prevCompany", (prevCompany, schema) => {
        if (prevCompany[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      prevEmpId1: Yup.string().when("prevCompany1", (prevCompany1, schema) => {
        if (prevCompany1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      prevJoinDate1: Yup.date().when("prevCompany1", (prevCompany1, schema) => {
        if (prevCompany1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),

      prevEndDate1: Yup.date().when("prevCompany1", (prevCompany1, schema) => {
        if (prevCompany1[0] === "Yes") {
          return schema
            .required("required")
            .min(Yup.ref("prevJoinDate1"), "Invalid Date")
            .max(new Date(), "Invalid Date");
        }
        return schema;
      }),

      prevDomain1: Yup.string().when("prevCompany1", (prevCompany1, schema) => {
        if (prevCompany1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      prevCtc1: Yup.number().when("prevCompany1", (prevCompany1, schema) => {
        if (prevCompany1[0] === "Yes") {
          return schema
            .typeError("Previous CTC must be a number")
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
        const response = await postEmployeeDetails(values);
        if (response.status === 200) {
          alert("Details Saved Sucess Fully");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  if (formData.length > 0) {
    return (
      <div>
        <ViewEmployeeDetails />
      </div>
    );
  }
  console.log("Form errors:", formik.errors);
  return (
    <>
      <div className="employee">
        <div className="row g-3 justify-content-center align-items-center">
          <h4 className="text-center text-primary">Employee Details</h4>
          <div className="col-md-12 mb-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="empId"
                    placeholder="Enter Employee ID"
                    className={`border  form-control ${
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
                <div className="col-md-4 mb-4">
                  <label>Total Experience</label>
                  <input
                    type="text"
                    name="totalExperience"
                    placeholder="Enter Total Experience"
                    className={`border  form-control ${
                      formik.touched.totalExperience &&
                      formik.errors.totalExperience
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.totalExperience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.totalExperience &&
                    formik.errors.totalExperience && (
                      <div className="invalid-feedback">
                        {formik.errors.totalExperience}
                      </div>
                    )}
                </div>
                <div className="col-md-4 mb-4">
                  <label>Current CTC</label>
                  <input
                    type="text"
                    name="currentCtc"
                    placeholder="Enter Current CTC"
                    className={`border  form-control ${
                      formik.touched.currentCtc && formik.errors.currentCtc
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.currentCtc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.currentCtc && formik.errors.currentCtc && (
                    <div className="invalid-feedback">
                      {formik.errors.currentCtc}
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    placeholder="Enter Role"
                    className={`border  form-control ${
                      formik.touched.role && formik.errors.role
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.role && formik.errors.role && (
                    <div className="invalid-feedback">{formik.errors.role}</div>
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Enter Designation"
                    className={`border  form-control ${
                      formik.touched.designation && formik.errors.designation
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.designation && formik.errors.designation && (
                    <div className="invalid-feedback">
                      {formik.errors.designation}
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <label>Join Date</label>
                  <input
                    type="date"
                    name="joinDate"
                    placeholder="Enter Join Date"
                    className={`border  form-control ${
                      formik.touched.joinDate && formik.errors.joinDate
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.joinDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    min="2022-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    required
                  />
                  {formik.touched.joinDate && formik.errors.joinDate && (
                    <div className="invalid-feedback">
                      {formik.errors.joinDate}
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <label>Enter Domain</label>
                  <input
                    type="text"
                    name="domain"
                    placeholder="Enter Domain"
                    className={`border  form-control ${
                      formik.touched.domain && formik.errors.domain
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.domain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.domain && formik.errors.domain && (
                    <div className="invalid-feedback">
                      {formik.errors.domain}
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <label>Skills</label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="Enter Skills"
                    className={`border  form-control ${
                      formik.touched.skills && formik.errors.skills
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.skills}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.skills && formik.errors.skills && (
                    <div className="invalid-feedback">
                      {formik.errors.skills}
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <label> EPF Number</label>
                  <input
                    type="text"
                    name="pf"
                    placeholder="Enter EPF Number"
                    className={`border  form-control ${
                      formik.touched.pf && formik.errors.pf ? "is-invalid" : ""
                    }`}
                    value={formik.values.pf}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.pf && formik.errors.pf && (
                    <div className="invalid-feedback">{formik.errors.pf}</div>
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <label>Do you have a laptop?</label>
                  <select
                    name="isLaptop"
                    style={{ appearance: "auto" }}
                    className={`border  form-control ${
                      formik.touched.isLaptop && formik.errors.isLaptop
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.isLaptop}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.isLaptop && formik.errors.isLaptop && (
                    <div className="invalid-feedback">
                      {formik.errors.isLaptop}
                    </div>
                  )}
                </div>
                {formik.values.isLaptop === "Yes" &&
                  formik.values.laptopIssueDate !== undefined && (
                    <>
                      <div className="col-md-4 mb-4">
                        <label>Laptop Issued Date</label>
                        <input
                          type="date"
                          name="laptopIssueDate"
                          className={`border  form-control ${
                            formik.touched.laptopIssueDate &&
                            formik.errors.laptopIssueDate
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.laptopIssueDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                        {formik.touched.laptopIssueDate &&
                          formik.errors.laptopIssueDate && (
                            <div className="invalid-feedback">
                              {formik.errors.laptopIssueDate}
                            </div>
                          )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Laptop Model</label>
                        <input
                          type="text"
                          name="laptopModel"
                          placeholder="Enter LapTop Model"
                          className={`border  form-control ${
                            formik.touched.laptopModel &&
                            formik.errors.laptopModel
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.laptopModel}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                        {formik.touched.laptopModel &&
                          formik.errors.laptopModel && (
                            <div className="invalid-feedback">
                              {formik.errors.laptopModel}
                            </div>
                          )}
                      </div>
                    </>
                  )}
                <div className="col-md-4 mb-4">
                  <label>Did you travel for any on-site work?</label>
                  <select
                    name="onsite"
                    style={{ appearance: "auto" }}
                    className={`border  form-control ${
                      formik.touched.onsite && formik.errors.onsite
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.onsite}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.onsite && formik.errors.onsite && (
                    <div className="invalid-feedback">
                      {formik.errors.onsite}
                    </div>
                  )}
                </div>
                {formik.values.onsite === "Yes" && (
                  <>
                    <div className="col-md-4 mb-4">
                      <label htmlFor="countries">Countries</label>
                      <select
                        name="countries"
                        id="countries"
                        style={{ appearance: "auto" }}
                        className={`border form-control ${
                          formik.touched.countries && formik.errors.countries
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.countries}
                        onChange={(event) => {
                          formik.handleChange(event);
                          fetchStates(event.target.value); // Fetch states when country changes
                        }}
                        onBlur={formik.handleBlur}
                        required
                      >
                        <option value="">Select a country</option>
                        {countryList.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.countries && formik.errors.countries && (
                        <div className="invalid-feedback">
                          {formik.errors.countries}
                        </div>
                      )}
                    </div>

                    <div className="col-md-4 mb-4">
                      <label>Cities</label>
                      <select
                        name="cities"
                        id="cities"
                        className={`border form-control ${
                          formik.touched.cities && formik.errors.cities
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ appearance: "auto" }}
                        value={formik.values.cities}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      >
                        <option value={formik.values.cities}>
                          {formik.values.cities}
                        </option>
                        {stateList.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      {formik.touched.cities && formik.errors.cities && (
                        <div className="invalid-feedback">
                          {formik.errors.cities}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {formik.values.onsite === "Yes" && (
                  <>
                    <div className="col-md-4 mb-4">
                      <label>Company Names</label>
                      <input
                        type="text"
                        name="companyNames"
                        placeholder="Enter Comapny Names"
                        className={`border  form-control ${
                          formik.touched.companyNames &&
                          formik.errors.companyNames
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.companyNames}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.companyNames &&
                        formik.errors.companyNames && (
                          <div className="invalid-feedback">
                            {formik.errors.companyNames}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Clients Supported</label>
                      <input
                        type="text"
                        name="clientSupport"
                        placeholder="Enter Clients Supported"
                        className={`border  form-control ${
                          formik.touched.clientSupport &&
                          formik.errors.clientSupport
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.clientSupport}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.clientSupport &&
                        formik.errors.clientSupport && (
                          <div className="invalid-feedback">
                            {formik.errors.clientSupport}
                          </div>
                        )}
                    </div>
                  </>
                )}
                <div className="col-md-4 mb-4">
                  <label>Do you Worked Previous Company?</label>
                  <select
                    name="prevCompany"
                    style={{ appearance: "auto" }}
                    className={`border  form-control ${
                      formik.touched.prevCompany && formik.errors.prevCompany
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.prevCompany}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.prevCompany && formik.errors.prevCompany && (
                    <div className="invalid-feedback">
                      {formik.errors.prevCompany}
                    </div>
                  )}
                </div>
                {formik.values.prevCompany === "Yes" && (
                  <>
                    <div className="col-md-4 mb-4">
                      <label>Previous Company Name</label>
                      <input
                        type="text"
                        name="prevEmpId"
                        placeholder="Enter Previous Employee ID"
                        className={`border  form-control ${
                          formik.touched.prevEmpId && formik.errors.prevEmpId
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevEmpId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.prevEmpId && formik.errors.prevEmpId && (
                        <div className="invalid-feedback">
                          {formik.errors.prevEmpId}
                        </div>
                      )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Previous Company Join Date</label>
                      <input
                        type="date"
                        name="prevJoinDate"
                        className={`border  form-control ${
                          formik.touched.prevJoinDate &&
                          formik.errors.prevJoinDate
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevJoinDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        max={formik.values.prevEndDate}
                        required
                      />
                      {formik.touched.prevJoinDate &&
                        formik.errors.prevJoinDate && (
                          <div className="invalid-feedback">
                            {formik.errors.prevJoinDate}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Previous Company End Date</label>
                      <input
                        type="date"
                        name="prevEndDate"
                        className={`border  form-control ${
                          formik.touched.prevEndDate &&
                          formik.errors.prevEndDate
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevEndDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={formik.values.prevJoinDate}
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                      {formik.touched.prevEndDate &&
                        formik.errors.prevEndDate && (
                          <div className="invalid-feedback">
                            {formik.errors.prevEndDate}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Previous Compnay Domain</label>
                      <input
                        type="text"
                        name="prevDomain"
                        placeholder="Enter Previous Compnay Domain"
                        className={`border  form-control ${
                          formik.touched.prevDomain && formik.errors.prevDomain
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevDomain}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.prevDomain &&
                        formik.errors.prevDomain && (
                          <div className="invalid-feedback">
                            {formik.errors.prevDomain}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Enter Previous Company CTC</label>
                      <input
                        type="text"
                        name="prevCtc"
                        placeholder="Enter Previous Comapny CTC"
                        className={`border  form-control ${
                          formik.touched.prevCtc && formik.errors.prevCtc
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevCtc}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.prevCtc && formik.errors.prevCtc && (
                        <div className="invalid-feedback">
                          {formik.errors.prevCtc}
                        </div>
                      )}
                    </div>

                    <div className="col-md-4 mb-4">
                      <label>Did you work in any other company before ?</label>
                      <select
                        name="prevCompany1"
                        style={{ appearance: "auto" }}
                        className={`border  form-control ${
                          formik.touched.prevCompany1 &&
                          formik.errors.prevCompany1
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevCompany1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formik.touched.prevCompany1 &&
                        formik.errors.prevCompany1 && (
                          <div className="invalid-feedback">
                            {formik.errors.prevCompany1}
                          </div>
                        )}
                    </div>
                  </>
                )}
                {formik.values.prevCompany1 === "Yes" && (
                  <>
                    <div className="col-md-4 mb-4">
                      <label>Previous Employee ID</label>
                      <input
                        type="text"
                        name="prevEmpId1"
                        placeholder="Enter Previous Employee ID"
                        className={`border  form-control ${
                          formik.touched.prevEmpId1 && formik.errors.prevEmpId1
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevEmpId1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.prevEmpId1 &&
                        formik.errors.prevEmpId1 && (
                          <div className="invalid-feedback">
                            {formik.errors.prevEmpId1}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Previous Company Join Date</label>
                      <input
                        type="date"
                        name="prevJoinDate1"
                        className={`border  form-control ${
                          formik.touched.prevJoinDate1 &&
                          formik.errors.prevJoinDate1
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevJoinDate1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        max={formik.values.prevEndDate1}
                        required
                      />
                      {formik.touched.prevJoinDate1 &&
                        formik.errors.prevJoinDate1 && (
                          <div className="invalid-feedback">
                            {formik.errors.prevJoinDate1}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Previous Company End Date</label>
                      <input
                        type="date"
                        name="prevEndDate1"
                        className={`border  form-control ${
                          formik.touched.prevEndDate1 &&
                          formik.errors.prevEndDate1
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevEndDate1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={formik.values.prevJoinDate1}
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                      {formik.touched.prevEndDate1 &&
                        formik.errors.prevEndDate1 && (
                          <div className="invalid-feedback">
                            {formik.errors.prevEndDate1}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Previous Compnay Domain</label>
                      <input
                        type="text"
                        name="prevDomain1"
                        placeholder="Enter Previous Compnay Domain"
                        className={`border  form-control ${
                          formik.touched.prevDomain1 &&
                          formik.errors.prevDomain1
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevDomain1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.prevDomain1 &&
                        formik.errors.prevDomain1 && (
                          <div className="invalid-feedback">
                            {formik.errors.prevDomain1}
                          </div>
                        )}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label>Enter Previous Company CTC</label>
                      <input
                        type="text"
                        name="prevCtc1"
                        placeholder="Enter Previous Comapny CTC"
                        className={`border  form-control ${
                          formik.touched.prevCtc1 && formik.errors.prevCtc1
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.prevCtc1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.prevCtc1 && formik.errors.prevCtc1 && (
                        <div className="invalid-feedback">
                          {formik.errors.prevCtc1}
                        </div>
                      )}
                    </div>
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
        <div
          className="text-center"
          style={{ paddingTop: "30px", marginBottom: "20px" }}
        >
          
        </div>
      </div>
    </>
  );
};
export default EditEmployeeDetails;
