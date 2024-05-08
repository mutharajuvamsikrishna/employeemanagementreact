import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllAdminRegisterDetails,
  searchAdminRegisterDetails,
} from "./Services/Api";
import "./ViewAllAdminRegister.css";
const ViewAllAdminRegister = ({ employee }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchAllAdminRegistersData();
  }, []);

  const fetchAllAdminRegistersData = () => {
    getAllAdminRegisterDetails()
      .then((response) => {
        setLoading(false);
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handlesearchQuery = () => {
    searchAdminRegisterDetails(searchQuery)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleNavigate = (empId) => {
    const data = {
      empId1: empId,
      empId: employee.empId,
    };
    navigate("/admindashboardlayout/checkuserlist", { state: { data: data } });
  };
  const handleAdminNavigate = (empId) => {
    const data = {
      empId1: empId,
      empId: employee.empId,
    };
    navigate("/admindashboardlayout/adminchecklist", { state: { data: data } });
  };
  return (
    <>
      <div className="adminreg">
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
                  placeholder="Enter Email or Mobile or Name"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  style={{
                    marginRight: "10px",
                    width: "700px",
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
            <h2 className="text-center mt-2">Employee Check List</h2>
            <table className="table table-striped table-bordered mt-2">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>CheckList</th>
                  <th>Admin CheckList</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.empId}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.roles}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          emp.checkBox ? "btn-success" : "btn-danger"
                        }`}
                        onClick={
                          emp.checkBox
                            ? () => handleNavigate(emp.empId)
                            : undefined
                        }
                      >
                        {emp.checkBox ? "Applied" : "Not Applied"}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          emp.adminCheckBox ? "btn-success" : "btn-danger"
                        }`}
                        onClick={() => handleAdminNavigate(emp.empId)}
                      >
                        {emp.adminCheckBox ? "Applied" : "Not Applied"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        <div className="text-center" style={{ paddingTop: "30px" }}></div>
      </div>
    </>
  );
};

export default ViewAllAdminRegister;
