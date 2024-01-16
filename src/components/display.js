import React, { useEffect, useState } from "react";

function Display() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/getEmployees")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setEmployees(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement delete functionality using the employee id
    // Example: fetch(`http://localhost:8080/deleteEmployee/${id}`, { method: 'DELETE' })
  };

  const handleEdit = (id) => {
    // Implement edit functionality using the employee id
  };

  const handleUpdate = () => {
    // Implement update functionality
  };

  const handleAdd = () => {
    // Implement add functionality
  };

  return (
    <div className="App">
      <table id="customers">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {employees.map((data) => (
          <tr key={data.id}>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.email}</td>
            <td>
              <button onClick={() => handleDelete(data.id)}>Delete</button>
              <button onClick={() => handleEdit(data.id)}>Edit</button>
            </td>
          </tr>
        ))}
      </table>

      {/* Add form for adding new employee */}
      <div>
        <h2>Add Employee</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newEmployee.firstName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, firstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newEmployee.lastName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, lastName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add Employee</button>
      </div>
    </div>
  );
}

export default Display;


