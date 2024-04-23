import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getRaiseDisputeDetails,
} from "./Services/Api";
import "./RaiseDispute.css";

const ViewTicket = ({employee}) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
  const data={
    email:email,
  }
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchRaiseDisputeData(email);
  }, [email]);

  const fetchRaiseDisputeData = (email) => {
    getRaiseDisputeDetails(email)
      .then((response) => {
        setLoading(false);
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="raisedispute">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-center">View Tickets</h2>
            <div className="d-flex justify-content-end mt-2 mb-3">
              <button onClick={()=>navigate("/dashboardlayout/raiseticket",{state:{data:data}})}className="btn btn-success">
                Raise a ticket
              </button>
            </div>

            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Complaint Number</th>
                  <th>Main Type</th>
                  <th>Sub Type</th>
                  <th>Description</th>
                  <th>Complaint Date</th>
                  <th>Resolved Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((dispute, index) => (
                  <tr key={index}>
                    <td>{dispute.regno}</td>
                    <td>{dispute.selectedMainType}</td>
                    <td>{dispute.selectedSubType}</td>
                    <td>{dispute.description}</td>
                    <td>{dispute.complaintDate}</td>
                    <td>{dispute.resolvedDate}</td>
                    <td>{dispute.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ViewTicket;
