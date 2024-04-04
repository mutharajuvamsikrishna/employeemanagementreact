import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getAllAdminRegisterDetails,
  searchAdminRegisterDetails,
  deleteAdminRegisterDetails,
} from "./Services/Api";
import "./ViewAllAdminRegister.css";
import { MdDelete } from "react-icons/md";
const ViewAllAdminRegister = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
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
  const confirmDelete = (email) => {
    const confirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (!confirmed) {
      return;
    }
    deleteAdminRegisterDetails(email)
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
    searchAdminRegisterDetails(searchQuery)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
            <h2 className="text-center mt-2">Admin Registrations</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.name}</td>
                    <td>{emp.mob}</td>
                    <td>{emp.email}</td>
                    <td>{emp.roles}</td>
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

export default ViewAllAdminRegister;
