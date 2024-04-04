import { useState } from "react";
import Register from "./Register";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onielogo from "./Logo";
import Otp from "./Otp";
import Login from "./Login";
import DashBoard from "./DashBoard";
import ForgetpasswordOtp from "./ForgetPasswordOtp";
import ForgetPasswordSet from "./ForgetPasswordSet";
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
import RaiseDispute from "./RaiseDispute";
import AdminDashBoard from "./AdminDashBoard";
import ViewAllAdminRegister from "./ViewAllAdminRegisters";
import ViewAllBankDetails from "./ViewAllBankDetails";
import ViewAllEmergencyDetails from "./ViewAllEmergencyDetails";
import ViewAllEmployeeDetails from "./ViewAllEmployeeDetails";
import ViewAllFamilyDetails from "./ViewAllFamilyDetails";
import ViewAllPersonalDetails from "./ViewAllPersonalDetails";
import ViewAdminPersonal from "./ViewAdminPersonal";
import Profile from "./UserProfile";
function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Onielogo />
          <Routes>
            <Route path="/reg" element={<Register />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/forgetpassword" element={<ForgetpasswordOtp />} />
            <Route path="/setforgetpassword" element={<ForgetPasswordSet />} />
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
            <Route path="/raisedispute" element={<RaiseDispute />} />
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
             <Route
              path="/viewadminpersonal"
              element={<ViewAdminPersonal />}
            />
             <Route
              path="/profile"
              element={<Profile/>}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
