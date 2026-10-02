
import React, { useState } from "react";
import axios from "axios";

const url = "http://localhost:4000/";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${url}create`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      // Add user to display list
      setUsers([...users, formData]);

      alert("Signup Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      alert("Signup Failed!");
    }
  };

  return (
    <div className="container mt-5">

      {/* Signup Form */}
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Sign Up
              </button>

            </form>

          </div>

        </div>
      </div>

      {/* Display Users */}
      {users.length > 0 && (
        <div className="row justify-content-center mt-5">

          <div className="col-md-8">

            <div className="card shadow">

              <div className="card-body">

                <h3 className="text-center mb-4">
                  Registered Users
                </h3>

                <table className="table table-bordered table-hover">

                  <thead className="table-dark">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Signup;

