import { useState } from 'react'
import Register from './Register'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onielogo from './Logo';
import Otp from './Otp';
import Login from './Login';
import DashBoard from './DashBoard';
import ForgetpasswordOtp from './ForgetPasswordOtp';
import ForgetPasswordSet from './ForgetPasswordSet';
import PersonalDetails from './PersonalDetails';
import UserPersonalEdit from './UserPersonalEdit';
import EmployeeDetails from './EmployeeDetails';
import ViewEmployeeDetails from './ViewEmployeeDetails';
import EditEmployeeDetails from './EditEmployeeDetails';
import FamilyDetails from './FamilyDetails';
import FamilyDetailsView from './FamilyDetailsView';
import FamilyDetailsEdit from './FamilyDetailsEdit';
import BankDetails from './BankDetails';
import BankDetailsEdit from './BankDetailsEdit';
import EmergencyDetails from './EmergencyDetails';
import EmergencyDetailsEdit from './EmergencyDetailsEdit';
function App() {
  return (
    <>
<div className='maincontainer'>
<Router>
<Onielogo/>
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
          <Route path="/viewemployeedetails" element={<ViewEmployeeDetails />} />
          <Route path="/editemployeedetails" element={<EditEmployeeDetails />} />
          <Route path="/familydetails" element={<FamilyDetails />} />
          <Route path="/familydetailsview" element={<FamilyDetailsView />} />
          <Route path="/familydetailsedit" element={<FamilyDetailsEdit />} />
          <Route path="/bankdetails" element={<BankDetails />} />
          <Route path="/bankdetailsedit" element={<BankDetailsEdit />} />
          <Route path="/emergencydetails" element={<EmergencyDetails />} />
          <Route path="/emergencydetailsedit" element={<EmergencyDetailsEdit />} />
          </Routes>
          </Router>
</div>
      </>
  )
}

export default App
