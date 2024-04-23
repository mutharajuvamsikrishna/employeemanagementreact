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
  const email = location.state.data.email;
  const data = {
    email: email,
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
                    <td>Name</td>
                    <td>{employee.name}</td>

                    <td>Email</td>
                    <td>{employee.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile Number</td>
                    <td>{employee.mob}</td>
                    <td>Role</td>
                    <td>{employee.roles}</td>
                  </tr>
                </tbody>
              </table>
            </center>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admindashboardlayout/avatar", { state: { data: data } })}
              >
                Upload Avatar
              </button>
            </div>
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
