// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Home from "./Home";
import AdminDashboardLayout from "./AdminDashBoardLayOut";
import SuperAdminDashboardLayOut from "./SuperAdminDashboardLayOut";

const App = () => {
  return (
    <div className="maincontainer">
      <Router>
        <Routes>
          <Route path="/dashboardlayout/*" element={<DashboardLayout />} />
          <Route path="/*" element={<Home />} />
          <Route path="/admindashboardlayout/*" element={<AdminDashboardLayout />} />
          <Route path="/superadmindashboardlayout/*" element={<SuperAdminDashboardLayOut />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
