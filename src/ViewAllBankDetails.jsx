import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getAllBankDetails,
  searchBankDetails,
  deleteBankDetails,
} from "./Services/Api";
import "./ViewAllBankDetails.css";
import { MdDelete } from "react-icons/md";
const ViewAllBankDetails = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchAllBankData();
  }, []);

  const fetchAllBankData = () => {
    getAllBankDetails()
      .then((response) => {
        setLoading(false);
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const confirmDelete = (email) => {
    const confirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (!confirmed) {
      return;
    }
    deleteBankDetails(email)
      .then((response) => {
        if (response.status === 200) {
          alert("Deleted SucessFully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlesearchQuery = () => {
    searchBankDetails(searchQuery)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="viewbank">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <form onSubmit={(event) => event.preventDefault()}>
                <input
                  type="text"
                  name={searchQuery}
                  placeholder="Enter Email or Account Number or Name"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  style={{
                    marginRight: "10px",
                    width:"700px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  className="btn btn-secondary"
                  onClick={handlesearchQuery}
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Search
                </button>
                <button
                  type="reset"
                  onClick={() => setSearchQuery("")}
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </form>
            </div>
            <h2 className="text-center mt-2">Bank Details</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Bank Name</th>
                  <th>Account Number</th>
                  <th>Branch</th>
                  <th>IFC Code</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.bankName}</td>
                    <td>{emp.accountNumber}</td>
                    <td>{emp.ifcCode}</td>
                    <td>{emp.branch}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>
                      {" "}
                      <button
                        className=""
                        onClick={() => confirmDelete(emp.email)}
                      >
                        <MdDelete
                          style={{
                            height: "20px",
                            width: "20px",
                            color: "red",
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
          <div className="text-center" style={{ paddingTop: "30px" }}>
        <a href="javascript:history.go(-1)">Go Back</a>
      </div>
      </div>
    </>
  );
};

export default ViewAllBankDetails;
