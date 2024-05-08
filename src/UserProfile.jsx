import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "./UserProfile.css";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";
const UserProfile = ({ employee }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const empId = location.state.data.empId;
  const data = {
    empId: empId,
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="profile" style={{ padding: "7%" }}>
      <div>
        <h3
          style={{
            textDecoration: "underline",
            color: "blue",
            textAlign: "center",
          }}
        >
          Profile
        </h3>
      </div>
      <div>
        <br />
        {employee && (
          <div className="row justify">
            <center>
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                <th>Name</th>
                  <th>Tel Number</th>
                  <th>Per-Email</th>
                  <th>Email</th>
                  <th>Employee ID</th>
                  <th>Role</th>
                  <th>Designation</th>
                  <th>CTC</th>
                  </tr>
                </tbody>
                <tr>
                <td>{employee.name}</td>
                    <td>{employee.mob}</td>
                    <td>{employee.personalEmail}</td>
                    <td>{employee.email}</td>
                    <td>{employee.empId}</td>
                    <td>{employee.roles}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.ctc}</td>
                </tr>
              </table>
            </center>
            <div className="profile-info">
              <br />
              <center>
                <button onClick={handleLogOut}>
                  <SlLogout style={{ height: "20px", width: "20px" }} />
                  <br />
                  LogOut
                </button>
              </center>
            </div>
          </div>
        )}
      </div>
      <br /> <br />
      <center></center>
    </div>
  );
};

export default UserProfile;
