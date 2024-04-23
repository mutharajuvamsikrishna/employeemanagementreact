import React, { useState, useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { getFamilyDetails } from "./Services/Api";
import "./ViewAdminFamily.css";

const ViewAdminFamily = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const email = location.state.data.email;
  const navigate=useNavigate();
  const data={
    email:email
  }
  // State object to store form field values
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchFamilyData(email);
  }, [email]);

  const fetchFamilyData = (email) => {
    getFamilyDetails(email)
      .then((response) => {
        setLoading(false);
        // Accessing the first element of the array
        setFormData(response.data[0]);
        console.log(formData)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="viewfamily">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-center">Family Details</h2>
            <table className="table table-striped table-bordered">
              <thead></thead>
              <tbody>
                <tr>
                  <th>Father's Name</th>
                  <td>{formData.fatherName}</td>
                  <th>
                    Adhar Number
                  </th>
                  <td>
                    {formData.fatherAadhar}
                  </td>
                  <th>PAN Number</th>
                  <td>{formData.fatherPanCard}</td>
                </tr>
                <tr>
                  <th>Mother's Name</th>
                  <td>{formData.fatherName}</td>
                  <th>
                    Adhar Number
                  </th>
                  <td>
                    {formData.motherAadhar}
                  </td>
                  <th>PAN Number</th>
                  <td>{formData.motherPan}</td>
                </tr>
                {formData.married==="Yes" &&(
                  <>
                <tr>
                  <th>Spouse Name</th>
                  <td>{formData.marriedName}</td>
                  <th>
                    Adhar Number
                  </th>
                  <td>
                    {formData.marriedAadhar}
                  </td>
                  <th>PAN Number</th>
                  <td>{formData.marriedPan}</td>
                </tr>
                </>
                )}
                  {formData.children==="Yes" &&(
                  <>
                <tr>
                  <th>Child1 Name</th>
                  <td>{formData.childname}</td>
                  <th>
                    Adhar Number
                  </th>
                  <td>
                    {formData.childAadhar}
                  </td>
                  <th>PAN Number</th>
                  <td>{formData.childPan}</td>
                </tr>
                </>
                )}
                  {formData.children1==="Yes" &&(
                  <>
                <tr>
                  <th>Child2 Name</th>
                  <td>{formData.childname1}</td>
                  <th>
                    Adhar Number
                  </th>
                  <td>
                    {formData.childAadhar1}
                  </td>
                  <th>PAN Number</th>
                  <td>{formData.childPan1}</td>
                </tr>
                </>
                )}
                  {formData.children2==="Yes" &&(
                  <>
                <tr>
                  <th>Child3 Name</th>
                  <td>{formData.childname2}</td>
                  <th>
                    Adhar Number
                  </th>
                  <td>
                    {formData.childAadhar2}
                  </td>
                  <th>PAN Number</th>
                  <td>{formData.childPan2}</td>
                </tr>
                </>
                )}
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

export default ViewAdminFamily;
