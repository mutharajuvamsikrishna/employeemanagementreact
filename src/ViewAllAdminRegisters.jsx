import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllAdminRegisterDetails,
  searchAdminRegisterDetails,
  deleteAdminRegisterDetails,
} from "./Services/Api";
import "./ViewAllAdminRegister.css";
import { MdDelete, MdEdit } from "react-icons/md";
import AdminNewBeeVerify from "./AdminNewBeeVerify";
const ViewAllAdminRegister = ({employee}) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const empId = employee.empId
  const emp={
    empId:empId
  }
  const data = {
    empId: empId,
  };
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
  const handleEdit=(empId)=>{
const data={
  empId:emp.empId,
  empId1:empId
}
navigate("/superadmindashboardlayout/editregisterdetails",{state:{data:data}})
  }
  const confirmDelete = (empId) => {
    const confirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (!confirmed) {
      return;
    }
    deleteAdminRegisterDetails(empId)
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
  const handleNavigate = (event) => {
    event.preventDefault();
    navigate("/superadmindashboardlayout/addnewemployee", {
      state: { data: data },
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
            <h2 className="text-center mt-2">Admin Registrations</h2>
            <div className="mt-2">
              <button className="btn btn-success" onClick={handleNavigate}>
                Add New Employee
              </button>
            </div>
            <table className="table table-striped table-bordered mt-2">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tel Number</th>
                  <th>Per-Email</th>
                  <th>Email</th>
                  <th>Employee ID</th>
                  <th>Role</th>
                  <th>Designation</th>
                  <th>CTC</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.name}</td>
                    <td>{emp.mob}</td>
                    <td>{emp.personalEmail}</td>
                    <td>{emp.email}</td>
                    <td>{emp.empId}</td>
                    <td>{emp.roles}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.ctc}</td>
                    <td>
                      {" "}
                      <button
                        className=""
                        onClick={() =>handleEdit(emp.empId)}
                      >
                        <MdEdit
                          style={{
                            height: "20px",
                            width: "15px",
                            color: "blue",
                          }}
                        />
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className=""
                        onClick={() => confirmDelete(emp.empId)}
                      >
                        <MdDelete
                          style={{
                            height: "20px",
                            width: "15px",
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
        <div className="text-center" style={{ paddingTop: "30px" }}></div>
      </div>
    </>
  );
};

export default ViewAllAdminRegister;
