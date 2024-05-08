import React,{useState,useEffect} from "react";
import { getProfiles } from "./Services/Api";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DashBoard from "./DashBoard";
import PersonalDetails from "./PersonalDetails";
import UserPersonalEdit from "./UserPersonalEdit";
import EmployeeDetails from "./EmployeeDetails";
import ViewEmployeeDetails from "./ViewEmployeeDetails";
import EditEmployeeDetails from "./EditEmployeeDetails";
import FamilyDetails from "./FamilyDetails";
import ViewAdminFamily from "./ViewAdminFamily";
import FamilyDetailsEdit from "./FamilyDetailsEdit";
import BankDetails from "./BankDetails";
import BankDetailsEdit from "./BankDetailsEdit";
import EmergencyDetails from "./EmergencyDetails";
import EmergencyDetailsEdit from "./EmergencyDetailsEdit";
import ViewTicket from "./ViewTicket";
import AdminDashBoard from "./AdminDashBoard";
import ViewAllAdminRegister from "./ViewAllAdminRegisters";
import ViewAllBankDetails from "./ViewAllBankDetails";
import ViewAllEmergencyDetails from "./ViewAllEmergencyDetails";
import ViewAllEmployeeDetails from "./ViewAllEmployeeDetails";
import ViewAllFamilyDetails from "./ViewAllFamilyDetails";
import ViewAllPersonalDetails from "./ViewAllPersonalDetails";
import ViewAdminPersonal from "./ViewAdminPersonal";
import Profile from "./UserProfile";
import Cropper from "./Cropper";
import RaiseTicket from "./RaiseTicket";
import ProfileImage from "./ProfileImage";
import EmployeeChecklist from "./EmployeeChecklist";
import UserPieChart from "./UserPieChart";
import UserViewAdminCheckList from "./UserViewAdminCheckList";
const DashboardLayout = () => {
  const [employee, setEmployee] = useState(null);
  const [load,setLoad]=useState(true);
  const location = useLocation();
  const data = location.state?.data;
  const empId=location.state?.data.empId;
  useEffect(() => {
    fetchEmployee(empId);
  }, [empId]);
  const fetchEmployee = (empId) => {
    // axios
    //  .get(`http://localhost:1279/reg?empId=${empId}`)
    getProfiles(empId)
      .then((response) => {
        setEmployee(response.data);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (load) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-2">Loading...</h4>
      </div>
    );
  }
  return (
    <div className="d-flex">
      <DashBoard data={data} />
      <ProfileImage employee={employee} />
          <Routes>
          <Route path="/piechart" element={<UserPieChart employee={employee} />} />
            <Route path="/personaldetails" element={<PersonalDetails />} />
            <Route path="/editpersonaldetails" element={<UserPersonalEdit />} />
            <Route path="/employeedetails" element={<EmployeeDetails />} />
            <Route
              path="/viewemployeedetails"
              element={<ViewEmployeeDetails />}
            />
            <Route
              path="/editemployeedetails"
              element={<EditEmployeeDetails />}
            />
            <Route path="/familydetails" element={<FamilyDetails />} />
            <Route path="/familydetailsedit" element={<FamilyDetailsEdit />} />
            <Route path="/bankdetails" element={<BankDetails />} />
            <Route path="/bankdetailsedit" element={<BankDetailsEdit />} />
            <Route path="/emergencydetails" element={<EmergencyDetails />} />
            <Route
              path="/emergencydetailsedit"
              element={<EmergencyDetailsEdit />}
            />
            <Route path="/admindashboard" element={<AdminDashBoard />} />
            <Route path="/registers" element={<ViewAllAdminRegister />} />
            <Route
              path="/viewallbankdetails"
              element={<ViewAllBankDetails />}
            />
            <Route
              path="/viewallemergencydetails"
              element={<ViewAllEmergencyDetails />}
            />
            <Route
              path="/viewallemployeedetails"
              element={<ViewAllEmployeeDetails />}
            />
            <Route
              path="/viewallfamilydetails"
              element={<ViewAllFamilyDetails />}
            />
            <Route path="/familydetailsview" element={<ViewAdminFamily />} />
            <Route
              path="/viewallpersonaldetails"
              element={<ViewAllPersonalDetails />}
            />
            <Route path="/viewadminpersonal" element={<ViewAdminPersonal />} />
            <Route path="/profile" element={<Profile  employee={employee}/>} />
            <Route path="/avatar" element={<Cropper />} />
            <Route path="/raiseticket" element={<RaiseTicket employee={employee} />} />
            <Route path="/viewticket" element={<ViewTicket />} />
            <Route path="/newbee" element={<EmployeeChecklist />} />
            <Route path="/checdetaisupdatedbyadmin" element={<UserViewAdminCheckList />} />
            
          </Routes>
    </div>
  );
};

export default DashboardLayout;
