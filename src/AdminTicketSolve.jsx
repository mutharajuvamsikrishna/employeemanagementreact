import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getAllTicketDetails,
  putRaiseDisputeDetailsUpdate,
} from "./Services/Api";
import "./AdminTicketSolve.css";
const AdminTicketSolve = ({ employee}) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const empId = location.state.data.empId;
  const data = { empId: empId };
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminRaiseDisputeData();
  }, []);

  const fetchAdminRaiseDisputeData = () => {
    setLoading(true);
    getAllTicketDetails()
      .then((response) => {
        setLoading(false);
        const filterData = response.data.filter(
          (ticket) => ticket.selectedMainType === employee.roles
        );
        setFormData(filterData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      status: "",
      responseText: "",
    },
    validationSchema: Yup.object().shape({
      status: Yup.string().required("required"),
      responseText: Yup.string().required("required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const ticketToUpdate = formData[editingIndex];
        const updatedTicket = { ...ticketToUpdate, ...values };

        // If the status is "solved", update the resolvedDate with today's date
        if (values.status === "solved") {
          updatedTicket.resolvedDate = new Date().toISOString().split("T")[0];
        }

        const response = await putRaiseDisputeDetailsUpdate(updatedTicket);
        if (response.status === 200) {
          setLoading(false);
          alert("Details Saved SuccessFully");
          window.location.reload();
        } else {
          setLoading(false);
          console.error("Failed to save details:", response.statusText);
        }
      } catch (error) {
        console.error("Error while submitting:", error);
      }
    },
  });

  const handleEdit = (index) => {
    setEditingIndex(index);
    formik.setValues({
      status: formData[index].status,
      responseText: formData[index].responseText,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    formik.resetForm();
  };
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", paddingLeft: "350px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-2">Loading...</h4>
      </div>
    );
  }
  const handlesearchQuery=(searchQuery)=>{
const findSearchData=formData.filter(data=>data.status===searchQuery)
setFormData(findSearchData)
  }
  return (
    <>
      <div className="ticketsolve">
        <>
          <h2 className="text-center">View All Tickets</h2>
          <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
          <form onSubmit={(event) => event.preventDefault()}>
            <select
              name={searchQuery}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              style={{
                marginRight: "10px",
                width: "700px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select</option>
              <option value="processing">Processing</option>
              <option value="solved">Solved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              className="btn btn-secondary"
              onClick={()=>handlesearchQuery(searchQuery)}
              style={{
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop:"20px",
                marginBottom:"10px"
              }}
            >
              Search
            </button>
            <button
              type="reset"
              onClick={() => fetchAdminRaiseDisputeData()}
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
                <th>Comments</th>
                <th>Action</th>
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
                  <td>
                    {index === editingIndex ? (
                      <>
                        <select
                          name="status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select Status</option>
                          <option value="processing">Processing</option>
                          <option value="solved">Solved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                          <div className="text-danger">
                            {formik.errors.status}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      dispute.status
                    )}
                  </td>
                  <td>
                    {index === editingIndex ? (
                      <>
                        <textarea
                          name="responseText"
                          value={formik.values.responseText}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        ></textarea>
                        {formik.touched.responseText &&
                        formik.errors.responseText ? (
                          <div className="text-danger">
                            {formik.errors.responseText}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      dispute.responseText
                    )}
                  </td>
                  <td>
                    {index === editingIndex ? (
                      <div style={{ display: "flex" }}>
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          onClick={formik.handleSubmit}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm ms-2"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-sm"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
    </>
  );
};

export default AdminTicketSolve;
