import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/display';
import Add from './components/add';
import './App.css';

function EmployeeForm({ onAddEmployee }) {
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee(newEmployee);
    setNewEmployee({ name: '', position: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={newEmployee.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Position:
        <input
          type="text"
          name="position"
          value={newEmployee.position}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Employee</button>
    </form>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees on component mount
    axios.get('http://localhost:3001/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const addEmployee = (newEmployee) => {
    axios.post('http://localhost:3001/api/employees', newEmployee)
      .then(response => setEmployees([...employees, response.data]))
      .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <div className="App">
      <Display employees={employees} />
      <Add onAddEmployee={addEmployee} />
      <h1>Employee App</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name} - {employee.position}</li>
        ))}
      </ul>
      <EmployeeForm onAddEmployee={addEmployee} />
    </div>
  );
}

export default App;
