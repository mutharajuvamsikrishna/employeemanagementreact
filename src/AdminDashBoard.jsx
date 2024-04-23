import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { Button } from "react-bootstrap";
import OnieLogoImage from "./Images/oniesoft-final1.png";
import "./Logo.css";
const AdminDashBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;

  const buttonStyle = {
    height: "50px",
    marginBottom: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

    color: "#fff",
    borderRadius: "10px",
    border: "none",
    background: "rgb(37 122 119 / 46%)",
  };

  const buttonTextStyle = {
    marginLeft: "10px",
    fontSize: "14px",
  };

  return (
    <>
      <div
        style={{ display: "flex", height: "99vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColer="#fff" backgroundColor="rgb(37 122 119 / 46%);">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <button 
             style={{
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: 0,
      }}onClick={()=>navigate("/admindashboardlayout",{state:{data:data}})}>
              <img
                src={OnieLogoImage}
                alt="ONiE SOFT"
                className="img-fluid"
              />
            </button>
          </CDBSidebarHeader>
          <CDBSidebarContent
            className="sidebar-content"
            style={{ display: "flex", marginLeft: "5px" }}
          >
            <CDBSidebarMenu>
              <Button
                variant="outline-info"
                size="sm"
                style={buttonStyle}
                onClick={() =>
                  navigate("/admindashboardlayout/viewallpersonaldetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="child">
                  <span style={buttonTextStyle}>Personal Details</span>
                </CDBSidebarMenuItem>
              </Button>

              <Button
                variant="outline-info"
                size="sm"
                style={buttonStyle}
                onClick={() =>
                  navigate("/admindashboardlayout/viewallemployeedetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="sticky-note">
                  <span style={buttonTextStyle}>Employee Details</span>
                </CDBSidebarMenuItem>
              </Button>

              <Button
                variant="outline-info"
                size="sm"
                style={buttonStyle}
                onClick={() =>
                  navigate("/admindashboardlayout/viewallfamilydetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="home">
                  <span style={buttonTextStyle}>Family Details</span>
                </CDBSidebarMenuItem>
              </Button>

              <Button
                variant="outline-info"
                size="sm"
                style={buttonStyle}
                onClick={() =>
                  navigate("/admindashboardlayout/viewallbankdetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="coins">
                  <span style={buttonTextStyle}>Bank Details</span>
                </CDBSidebarMenuItem>
              </Button>

              <Button
                variant="outline-info"
                size="sm"
                style={buttonStyle}
                onClick={() =>
                  navigate("/admindashboardlayout/viewallemergencydetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="ambulance">
                  <span style={buttonTextStyle}>Emergency Details</span>
                </CDBSidebarMenuItem>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                style={buttonStyle}
                onClick={() =>
                  navigate("/admindashboardlayout/adminticketreslove", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="headphones">
                  <span style={buttonTextStyle}>Tickets</span>
                </CDBSidebarMenuItem>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                style={buttonStyle}
                onClick={() =>
                  navigate("/admindashboardlayout/profile", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="user">
                  <span style={buttonTextStyle}>Profile</span>
                </CDBSidebarMenuItem>
              </Button>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{ padding: "20px 5px" }}
            >
              sidebar footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default AdminDashBoard;
