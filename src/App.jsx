// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Home from "./Home";
import AdminDashboardLayout from "./AdminDashBoardLayOut";

const App = () => {
  return (
    <div className="maincontainer">
      <Router>
        <Routes>
          <Route path="/dashboardlayout/*" element={<DashboardLayout />} />
          <Route path="/*" element={<Home />} />
          <Route path="/admindashboardlayout/*" element={<AdminDashboardLayout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
