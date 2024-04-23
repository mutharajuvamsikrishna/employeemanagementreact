import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEmergencyDetails } from "./Services/Api";
import "./ViewEmergencyDetails.css";

const ViewBankDetails = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const data = {
    email: email,
  };
  useEffect(() => {
    fetchEmergencyData(email);
  }, [email]);

  const fetchEmergencyData = (email) => {
    getEmergencyDetails(email)
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
      <div className="viewbank">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-center">Emergency Details</h2>
            <br />
            <br />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Relation</th>
                  <th>Mobile Number</th>
                  <th>State</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formData.name}</td>
                  <td>{formData.relation}</td>
                  <td>{formData.mobileNumber}</td>
                  <td>{formData.state}</td>
                  <td>{formData.city}</td>
                </tr>
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
              navigate("/dashboardlayout/emergencydetailsedit", { state: { data: data } })
            }
          >
            Edit
          </button>
        </div>
        <div className="text-center" style={{ paddingTop: "20px" }}>
          
        </div>
      </div>
    </>
  );
};

export default ViewBankDetails;
