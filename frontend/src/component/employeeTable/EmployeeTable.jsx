import React, { useState } from "react";
import "./employeeTable.css";
import { api } from "../../utils/api";

export default function EmployeeTable({ onEditClick }) {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [successDelete, setSuccessDelete] = useState('')
  const [errorMessage,setErrorMessage] = useState('')

  const userInfo = localStorage.getItem("dealsdray-user");
  const user = JSON.parse(userInfo);

  React.useEffect(() => {
    async function employeeData() {
      const response = await api.get("/employee/all-employee", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const data = response.data.allEmployee;

      if (response.status === 200) {
        setEmployees(data);
      }
    }
    employeeData();
    setSuccessDelete("")
  }, [user.token,successDelete]);

  const handleEdit = (id) => {
    onEditClick(id);
  };

  const handleDelete = (id) => {
    async function deleteEmployee(){
      const response = await api.delete('/employee/delete-employee',{
        params: {employeeId:id},
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      })

      if(response.status === 200){
         setSuccessDelete('Delete successfull')
      }else{
          setErrorMessage(response.data.error)
      }
    }
    deleteEmployee()
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employ) =>
    employ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="employeeTable-nav-container">
        <h1>Employee List</h1>
        <div className="employeeTable-secondNav-container">
          <p>
            Total count : <span>{employees && employees.length}</span>
          </p>
          <div className="employeeTable-search-container">
            <p>Search</p>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name"
            />
          </div>
        </div>
      </div>
      <div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm
              ? filteredEmployees.map((employ) => (
                  <tr key={employ._id}>
                    <td>{employ._id}</td>
                    <td>
                      <img
                        className="table-image"
                        src={employ.image}
                        alt="employer"
                      />
                    </td>
                    <td>{employ.name}</td>
                    <td>{employ.email}</td>
                    <td>{employ.mobile}</td>
                    <td>{employ.designation}</td>
                    <td>{employ.gender}</td>
                    <td>{employ.course}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEdit(employ._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(employ._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : employees.map((employ) => (
                  <tr key={employ._id}>
                    <td>{employ._id}</td>
                    <td>
                      <img
                        className="table-image"
                        src={employ.image}
                        alt="employer"
                      />
                    </td>
                    <td>{employ.name}</td>
                    <td>{employ.email}</td>
                    <td>{employ.mobile}</td>
                    <td>{employ.designation}</td>
                    <td>{employ.gender}</td>
                    <td>{employ.course}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEdit(employ._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(employ._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
