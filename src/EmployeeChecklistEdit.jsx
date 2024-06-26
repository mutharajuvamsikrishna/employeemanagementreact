import React, { useState,useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./EmployeChecklistEdit.css";
import { postUserCheckList, getUserCheckList } from "./Services/Api";
import { useLocation, useNavigate } from "react-router-dom";
import UserViewAdminCheckList from "./UserViewAdminCheckList";
const EmployeeChecklistEdit = ({formDta,adminFormDta}) => {
  const [res,setRes]=useState(false);
  const navigate = useNavigate();
  const initialValues = {
    empId: formDta.empId,
    candidateConfirmation: formDta.candidateConfirmation,
    hrAssignment: formDta.hrAssignment,
    submitRelievingLetter: formDta.submitRelievingLetter,
    submitExperienceLetter: formDta.submitExperienceLetter,
    submitPayslips: formDta.submitPayslips,
    fillJoiningForm: formDta.fillJoiningForm,
    submitPhotos: formDta.submitPhotos,
    submitCertificates: formDta.submitCertificates,
    signContract: formDta.signContract,
    signITIPR: formDta.signITIPR,
    signJoiningLetter: formDta.signJoiningLetter,
    welcomeKit: formDta.welcomeKit,
    employeeNumber: formDta.employeeNumber,
    laptop: formDta.laptop,
    workstation: formDta.workstation,
    internetAccess: formDta.internetAccess,
    intranetAccess: formDta.intranetAccess,
    emailAccess: formDta.emailAccess,
    teamsAccess: formDta.teamsAccess,
    attendance: formDta.attendance,
    timeSheet: formDta.timeSheet,
    finance: formDta.finance,
    employeeIDCard: formDta.employeeIDCard,
    employeeAccessCard: formDta.employeeAccessCard,
    parkingSlot: formDta.parkingSlot,
  };

  const validationSchema = Yup.object().shape({});
  const handleSubmit = async (values) => {
    const confirmed = window.confirm(
        "Are you sure you want to save the changes?"
      );
      if (!confirmed) {
        return;
      }
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
  const handleAdminView=()=>{
   setRes(true)
   }
  if(res){
    return<div>
      <UserViewAdminCheckList formDta={adminFormDta}/>
    </div>
  }
  return (
    <div className="employee-checklist">
      <h3 className="text-center mb-2 text-primary">
        New Bee Checklist Edit
      </h3>
      <div className="d-flex">
       {adminFormDta&&(
        <button className="btn btn-success" onClick={handleAdminView}>View Admin CheckList</button>
       )}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

          <Form>
            <div className="row">
              <div className="col-md-12 mb-4">
                <h5 className="text-center mt-2 mb-2">Joining Day</h5>
                <div style={{ marginTop: "50px" }} className="row">
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
                  <h5 className="text-center mt-4 mb-4">First Work Day</h5>
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
                Edit
              </button>
            </div>
          </Form>
      </Formik>
    </div>
  );
};

export default EmployeeChecklistEdit;
