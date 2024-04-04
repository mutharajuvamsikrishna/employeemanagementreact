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
const AdminDashBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;

  return (
    <>
      <div
        style={{ display: "flex", height: "99vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColer="#fff" backgroundColor="rgb(37, 90, 122)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <h5>Dashboard</h5>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <Button
                variant="outline-info"
                size="sm"
                style={{ height: "50px", marginBottom: "10px", width: "200px" }}
                onClick={() =>
                  navigate("/registers", { state: { data: data } })
                }
              >
                <CDBSidebarMenuItem icon="columns">
                  Registrations
                </CDBSidebarMenuItem>
              </Button>

              <Button
                variant="outline-info"
                size="sm"
                style={{ height: "50px", marginBottom: "10px", width: "200px" }}
                onClick={() =>
                  navigate("/viewallbankdetails", { state: { data: data } })
                }
              >
                <CDBSidebarMenuItem icon="columns">
                  Bank Details
                </CDBSidebarMenuItem>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                style={{ height: "50px", marginBottom: "10px", width: "200px" }}
                onClick={() =>
                  navigate("/viewallemergencydetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="columns">
                  Emergency Details
                </CDBSidebarMenuItem>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                style={{ height: "50px", marginBottom: "10px", width: "200px" }}
                onClick={() =>
                  navigate("/viewallemployeedetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="columns">
                  Employee Details
                </CDBSidebarMenuItem>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                style={{ height: "50px", marginBottom: "10px", width: "200px" }}
                onClick={() =>
                  navigate("/viewallfamilydetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="columns">
                  Family Details
                </CDBSidebarMenuItem>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                style={{ height: "50px", marginBottom: "10px", width: "200px" }}
                onClick={() =>
                  navigate("/viewallpersonaldetails", {
                    state: { data: data },
                  })
                }
              >
                <CDBSidebarMenuItem icon="columns">
                  Personal Details
                </CDBSidebarMenuItem>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                style={{ height: "50px", marginBottom: "10px", width: "200px" }}
                onClick={() => navigate("/profile", { state: { data: data } })}
              >
                <CDBSidebarMenuItem icon="columns">Profile</CDBSidebarMenuItem>
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
