import React, { useState,useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./EmployeeChecklist.css";
import { postUserCheckList, getUserCheckList,getAdminCheckList } from "./Services/Api";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeChecklistEdit from "./EmployeeChecklistEdit";
const EmployeeChecklist = () => {
  const [formDta,setFormData]=useState(null);
  const [adminFormDta,setAdminFormData]=useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const empId = location.state?.data.empId;
  useEffect(() => {
    fetchUserCheckListData(empId);
    fetchAdminCheckListData(empId);
  }, [empId]);

  const fetchUserCheckListData = (empId) => {
    getUserCheckList(empId)
      .then((response) => {
        setFormData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchAdminCheckListData = (empId) => {
    getAdminCheckList(empId)
      .then((response) => {
        setAdminFormData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if(formDta){
   
    return <div><EmployeeChecklistEdit formDta={formDta}
    adminFormDta={adminFormDta}/></div>
  }
  const initialValues = {
    empId: empId,
    candidateConfirmation: false,
    hrAssignment: false,
    submitRelievingLetter: false,
    submitExperienceLetter: false,
    submitPayslips: false,
    fillJoiningForm: false,
    submitPhotos: false,
    submitCertificates: false,
    signContract: false,
    signITIPR: false,
    signJoiningLetter: false,
    welcomeKit: false,
    employeeNumber: false,
    laptop: false,
    workstation: false,
    internetAccess: false,
    intranetAccess: false,
    emailAccess: false,
    teamsAccess: false,
    attendance: false,
    timeSheet: false,
    finance: false,
    employeeIDCard: false,
    employeeAccessCard: false,
    parkingSlot: false,
  };

  const validationSchema = Yup.object().shape({});
  const handleSubmit = async (values) => {
    try {
      const response = await postUserCheckList(values);
      if (response.status === 200) {
        alert("Details Saved Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="employee-checklist">
      <h3 className="text-center mb-2 text-primary">
        New Bee Checklist 
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
       
          <Form>
            <div className="row">
              <div className="col-md-12 mb-5">
                <h5 className="text-center mt-2 mb-5">Joining Day</h5>
                <div style={{ marginTop: "25px" }} className="row">
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label
                        htmlFor="candidateConfirmation"
                        className="checkbox-label"
                      >
                        <Field
                          type="checkbox"
                          id="candidateConfirmation"
                          name="candidateConfirmation"
                        />
                        Confirmation
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label htmlFor="hrAssignment">
                        <Field
                          type="checkbox"
                          id="hrAssignment"
                          name="hrAssignment"
                        />
                        HR Assignment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="submitRelievingLetter" />
                        Submit Relieving Letter (O)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="submitExperienceLetter" />
                        Submit Experience Letter (O)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="submitPayslips" />
                        Submit Payslips (O)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="fillJoiningForm" />
                        Fill Joining form
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="submitPhotos" />
                        Submit Photos (3PPs)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="submitCertificates" />
                        Submit the Certificates (O)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="signContract" />
                        Sign the Contact
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="signITIPR" />
                        Sign the IT/IPR/NDA
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="signJoiningLetter" />
                        Sign Joining Letter
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="welcomeKit" />
                        Welcome Kit
                      </label>
                    </div>
                  </div>
                  <h5 className="text-center mt-4 mb-5">First Work Day</h5>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="employeeNumber" />
                        Employee Number
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="laptop" />
                        Laptop
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="workstation" />
                        Workstation
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="internetAccess" />
                        Internet Network Access
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="intranetAccess" />
                        Intranet Access
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="emailAccess" />
                        Email ID/Access
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="teamsAccess" />
                        Teams
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="attendance" />
                        Attendance
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="timeSheet" />
                        Time Sheet
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="finance" />
                        Finance
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="employeeIDCard" />
                        Employee ID Card
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="employeeAccessCard" />
                        Employee Access Card
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="checkbox-group">
                      <label>
                        <Field type="checkbox" name="parkingSlot" />
                        Parking Slot (If available)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
      
      </Formik>
    </div>
  );
};

export default EmployeeChecklist;
