import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CDBSidebar, CDBSidebarHeader, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarFooter } from 'cdbreact';
import { Button } from 'react-bootstrap';
const DashBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state.data;

    return (
        <>
            <div style={{ display: 'flex', height: '99vh', overflow: 'scroll initial' }}>
                <CDBSidebar textColer="#fff" backgroundColor="rgb(37, 90, 122)">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <h5>Dashboard</h5>
                    </CDBSidebarHeader>
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <Button variant="outline-info" size='sm' style={{height:"50px",marginBottom:"10px",width:"200px"}}onClick={() => navigate("/personaldetails", { state: { data: data } })}>
                                <CDBSidebarMenuItem icon="columns">
                                   PersonalDetails       
                                </CDBSidebarMenuItem>
                            </Button>
                    
                            <Button variant="outline-info"  size='sm'style={{height:"50px",marginBottom:"10px",width:"200px"}} onClick={() => navigate("/employeedetails", { state: { data: data } })}>
                                <CDBSidebarMenuItem icon="columns">
                                   Employee Details
                                </CDBSidebarMenuItem>
                            </Button>
                            <Button variant="outline-info"  size='sm'style={{height:"50px",marginBottom:"10px",width:"200px"}} onClick={() => navigate("/familydetails", { state: { data: data } })}>
                                <CDBSidebarMenuItem icon="columns">
                                  Family Details
                                </CDBSidebarMenuItem>
                            </Button>
                            <Button variant="outline-info"  size='sm'style={{height:"50px",marginBottom:"10px",width:"200px"}} onClick={() => navigate("/bankdetails", { state: { data: data } })}>
                                <CDBSidebarMenuItem icon="columns">
                                Bank Details
                                </CDBSidebarMenuItem>
                            </Button>
                            <Button variant="outline-info"  size='sm'style={{height:"50px",marginBottom:"10px",width:"200px"}} onClick={() => navigate("/emergencydetails", { state: { data: data } })}>
                                <CDBSidebarMenuItem icon="columns">
                                Emergency Details
                                </CDBSidebarMenuItem>
                            </Button>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
                            sidebar footer
                        </div>
                    </CDBSidebarFooter>
                </CDBSidebar>
            </div>
        </>
    );
};

export default DashBoard;
