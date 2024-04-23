import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllPersonalDetails,
  searchPersonalDetails,
  deletePersonalDetails,
} from "./Services/Api";
import "./ViewAllPersonalDetails.css";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const ViewAllPersonalDetails = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchAllFamilyData();
  }, []);

  const fetchAllFamilyData = () => {
    getAllPersonalDetails()
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
    deletePersonalDetails(email)
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
    searchPersonalDetails(searchQuery)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleNavigate = (email) => {
    const data = {
      email: email,
    };
    navigate("/admindashboardlayout/viewadminpersonal", { state: { data: data } });
  };
  return (
    <>
      <div className="viewepersonal">
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
                  placeholder="Enter Email"
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
            <h2 className="text-center mt-2">Personal Details</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Aadhar Number</th>
                  <th>PAN Number</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.adhar}</td>
                    <td>{emp.pan}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.email}</td>

                    <td>
                      {" "}
                      <button onClick={() => handleNavigate(emp.email)}>
                        <MdOutlineContentPasteSearch
                          style={{
                            height: "20px",
                            width: "20px",
                            color: "blue",
                          }}
                        />
                      </button>
                    </td>
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
          
        </div>
      </div>
    </>
  );
};

export default ViewAllPersonalDetails;
