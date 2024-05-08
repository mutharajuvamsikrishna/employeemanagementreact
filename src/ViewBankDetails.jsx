import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getBankDetails } from "./Services/Api";
import "./ViewBankDetails.css";

const ViewBankDetails = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const empId = location.state.data.empId;
  const [fileContent, setFileContent] = useState([]);
  // State object to store form field values
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const data = {
    empId: empId,
  };
  useEffect(() => {
    fetchBankData(empId);
  }, [empId]);

  const fetchBankData = (empId) => {
    getBankDetails(empId)
      .then((response) => {
        setLoading(false);
        // Accessing the first element of the array
        setFormData(response.data);
        setFileContent(response.data.fileContents);
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
            <h2 className="text-center">Bank Details</h2>
            <table className="table table-striped table-bordered">
              <thead></thead>
              <tbody>
                <tr>
                  <th>Bank Name</th>
                  <td>{formData.bankName}</td>
                  <th>Branch</th>
                  <td>{formData.branch}</td>
                  <th>IFC Code</th>
                  <td>{formData.ifcCode}</td>
                </tr>
                <tr>
                  <th>Account Number</th>
                  <td>{formData.accountNumber}</td>
                  <th>Account Holder Name</th>
                  <td>{formData.name}</td>
                  <th>Bank File</th>
                  <div>
                    <img
                      style={{ height: "150px", width: "150px" }}
                      key={0}
                      src={`data:image/png;base64,${fileContent}`}
                      alt={`Image ${fileContent[0] + 1}`}
                    />
                    <br />
                    {fileContent && (
                      <a
                        href={`data:image/png;base64,${fileContent}`}
                        download="adhar.png"
                      >
                        Download Aadhar
                      </a>
                    )}
                  </div>
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
              navigate("/dashboardlayout/bankdetailsedit", { state: { data: data } })
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
