import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import CreateEmployee from "../../component/createEmployee/CreateEmployee";
import EmployeeTable from "../../component/employeeTable/EmployeeTable";
import EditEmployee from "../../component/editEmployee/EditEmployee";

export default function DashBoard() {
  const [username, setUserName] = useState("");
  const [activeComponent, setActiveComponent] = useState("home");
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const navigate = useNavigate();

  const components = {
    createEmployee: <CreateEmployee />,
    employeeTable: <EmployeeTable onEditClick={(employeeId) => handleEditClick(employeeId)} />,
  };

  const handleEditClick = (employeeId) => {
    setActiveComponent("editEmployee");
    setEditEmployeeId(employeeId);

  };

  useEffect(() => {
    if (!localStorage.getItem("dealsdray-user")) {
      navigate("/");
    } else {
      const user = localStorage.getItem("dealsdray-user");
      const userObject = JSON.parse(user);

      setUserName(userObject.name);
    }
  }, [navigate]);

  const renderDashboardComponent = (component) => {
    setActiveComponent(component);
    setEditEmployeeId(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("dealsdray-user");
    navigate("/");
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-nav-container'>
        <div className='dashboard-nav-first-container'>
          <p
            className={`dashboard-nav-item ${
              activeComponent === "home" ? "active" : ""
            }`}
            onClick={() => renderDashboardComponent("home")}
          >
            Home
          </p>
          <p
            className={`dashboard-nav-item ${
              activeComponent === "createEmployee" ? "active" : ""
            }`}
            onClick={() => renderDashboardComponent("createEmployee")}
          >
            Create Employee
          </p>
          <p
            className={`dashboard-nav-item ${
              activeComponent === "employeeTable" ? "active" : ""
            }`}
            onClick={() => renderDashboardComponent("employeeTable")}
          >
            Employee Table
          </p>
        </div>
        <div className='dashboard-nav-second-container'>
          <p className='dashboard-nav-item'>{username && username}</p>
          <p className='dashboard-nav-item' onClick={handleLogOut}>
            Logout
          </p>
        </div>
      </div>

      <div className='dashboard-body-container'>
      {editEmployeeId ? (
          <EditEmployee employeeId={editEmployeeId} />
        ) : (
          components[activeComponent] || (
            <div className="dashboard-body-home">
              <h1>Welcome to Admin Panel</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
}
