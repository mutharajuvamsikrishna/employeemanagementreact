import React, { useState, useEffect } from "react";
import { getAllTicketDetails } from "./Services/Api";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./SuperAdminChart.css";

const UserPieChart = ({employee}) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    fetchAdminRaiseDisputeData();
  }, []);

  const fetchAdminRaiseDisputeData = async () => {
    setLoading(true);
    try {
      const response = await getAllTicketDetails();
      const findData=response.data.filter(empData=>empData.empId===employee.empId);
      setFormData(findData);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    } finally {
      setLoading(false);
    }
  };
if(formData.length===0){
return <div style={{paddingLeft:"300px",paddingTop:"200px"}}><h5 className="text-center">No Tickets Available</h5></div>
}
  const getStatusCounts = () => {
    const statusCounts = formData.reduce((acc, ticket) => {
      acc[ticket.selectedMainType] = (acc[ticket.selectedMainType] || 0) + 1;
      return acc;
    }, {});
    return statusCounts;
  };

  const getStatusIndividualCounts = (mainType) => {
    const filteredData = formData.filter(ticket => ticket.selectedMainType === mainType);
    const statusCounts = filteredData.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});
    return statusCounts;
  };

  const colors = ["#FF9933", "#32CD32", "#FF69B4", "#4169E1", "#FFD700", "#8A2BE2", "#CCCCCC"];
 

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-2">Loading...</h4>
      </div>
    );
  }

 

  const mainTypes = [...new Set(formData.map(ticket => ticket.selectedMainType))]; 

  return (
    <div className="super-pie">
      <div className="row d-flex">
        <h4 className="text-center mt-3">Ticket Pie Charts</h4>
        <div className="col-md-3">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(getStatusCounts()).map(([label, value], index) => ({
                  name: label,
                  value,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(getStatusCounts()).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={20}>
                {Object.values(getStatusCounts()).reduce((a, b) => a + b)}
              </text>
            </PieChart>
            <h5 className="text-center">Overall Distribution</h5>
            <div className="legend" >
              {Object.entries(getStatusCounts()).map((entry, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
                  <div className="legend-label" style={{ color: colors[index % colors.length] }}>{entry[0]}</div>
                </div>
              ))}
            </div>
          </ResponsiveContainer>
        </div>
        {mainTypes.map((mainType, index) => (
          <div key={index} className="col-md-3">
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={Object.entries(getStatusIndividualCounts(mainType)).map(([label, value], index) => ({
                      name: label,
                      value,
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(getStatusIndividualCounts(mainType)).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={20}>
                    {Object.values(getStatusIndividualCounts(mainType)).reduce((a, b) => a + b)}
                  </text>
                </PieChart>
              </ResponsiveContainer>
              <h5 className="text-center">{mainType}</h5>
              <div className="legend">
                {Object.entries(getStatusIndividualCounts(mainType)).map((entry, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
                    <div className="legend-label" style={{ color: colors[index % colors.length] }}>{entry[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPieChart;
