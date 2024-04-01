import React, { useState, useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { getEmployeeDetails } from "./Services/Api";
import "./ViewEmployeeDetails.css";
const ViewEmployeeDetails = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
const navigate=useNavigate();
  const data={
    email:email
  }
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEmployeeData(email);
  }, [email]);

  const fetchEmployeeData = (email) => {
    getEmployeeDetails(email)
      .then((response) => {
        setLoading(false);
        // Accessing the first element of the array
        setFormData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="viewemp">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-center">Employee Details</h2>
            <table className="table table-striped table-bordered">
              <thead></thead>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{formData.empId}</td>
                  <th>Total Experience</th>
                  <td>{formData.totalExperience}</td>
                  <th>Current CTC</th>
                  <td>{formData.currentCtc}</td>
                  <th>role</th>
                  <td>{formData.role}</td>
                </tr>
                <tr>
                  <th>Designation</th>
                  <td>{formData.designation}</td>
                  <th>Join Date</th>
                  <td>{formData.joinDate}</td>
                  <th>Domain</th>
                  <td>{formData.domain}</td>
                  <th>Skills</th>
                  <td>{formData.skills}</td>
                </tr>
                {formData.laptopIssueDate !== "" && (
                  <tr>
                    <th>Laptop Issue Date</th>
                    <td>{formData.laptopIssueDate}</td>
                    <th>Laptop Model</th>
                    <td>{formData.laptopModel}</td>
                    <td colSpan={4}></td>
                  </tr>
                )}
                {formData.onsite === "Yes" && (
                  <>
                    <tr>
                      <th>Onsite Traveld</th>
                      <td>{formData.onsite}</td>
                      <th>Countries</th>
                      <td>{formData.countries}</td>
                      <th>Cities</th>
                      <td>{formData.cities}</td>
                      <th>Company Names</th>
                      <td>{formData.companyNames}</td>
                    </tr>
                    <tr>
                      <th>ClientSupport</th>
                      <td>{formData.clientSupport}</td>
                      <td colSpan={7}></td>
                    </tr>
                  </>
                )}
                {formData.prevCompany === "Yes" && (
                  <>
                    <tr>
                      <th>Company Name</th>
                      <td>{formData.prevEmpId}</td>
                      <th>Join Date</th>
                      <td>{formData.prevJoinDate}</td>
                      <th>End Date</th>
                      <td>{formData.prevJoinDate}</td>
                      <th>Domain</th>
                      <td>{formData.prevDomain}</td>
                    </tr>
                    <tr>
                      <th>CTC</th>
                      <td>{formData.prevCtc}</td>
                      <td colSpan={7}></td>
                    </tr>
                  </>
                )}
                {formData.prevCompany1 === "Yes" && (
                  <>
                    <tr>
                      <th>Company Name</th>
                      <td>{formData.prevEmpId1}</td>
                      <th>Join Date</th>
                      <td>{formData.prevJoinDate1}</td>
                      <th>End Date</th>
                      <td>{formData.prevJoinDate1}</td>
                      <th>Domain</th>
                      <td>{formData.prevDomain1}</td>
                    </tr>
                    <tr>
                      <th>CTC</th>
                      <td>{formData.prevCtc1}</td>
                      <td colSpan={7}></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </>
        )}
        <div
          className="text-center"
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/editemployeedetails", { state: { data: data } })
            }
          >
            Edit
          </button>
        </div>
        <div className="text-center" style={{ paddingTop: "30px" }}>
          <a href="javascript:history.go(-1)">Go Back</a>
        </div>
      </div>
    </>
  );
};

export default ViewEmployeeDetails;
