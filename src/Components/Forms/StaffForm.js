import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorStrip from "../ErrorStrip";

// Staff Registration Form
const StaffForm = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const addStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/staff", JSON.stringify(staff));
      navigate("/");
      toast.success(response.data.message);
    } catch (err) {
      setError("Failed to register staff.");
    }
  };

  return (
    <form className="w-full max-w-md p-4 mx-auto font-medium tracking-wide accent-slate-600" onSubmit={addStaff}>
      <label htmlFor="name">Name:</label>
      <input
        className="mb-4 block w-full p-2 rounded-md border"
        type="text"
        name="name"
        id="name"
        value={staff.name}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        className="mb-4 block w-full p-2 rounded-md border"
        type="email"
        name="email"
        id="email"
        value={staff.email}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="department">Department:</label>
      <select
        className="mb-4 block w-full p-2 rounded-md border"
        name="department"
        id="department"
        value={staff.department}
        onChange={handleFormChange}
        required
      >
        <option hidden>Select Department</option>
        <option value="Computer">Computer</option>
      </select>

      <label htmlFor="username">Username:</label>
      <input
        className="mb-4 block w-full p-2 rounded-md border"
        type="text"
        name="username"
        id="username"
        value={staff.username}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        className="mb-4 block w-full p-2 rounded-md border"
        type="password"
        name="password"
        id="password"
        value={staff.password}
        onChange={handleFormChange}
        required
      />

      <button
        type="submit"
        className="mb-4 block w-full p-2 rounded-md border bg-slate-800 text-white font-bold hover:bg-slate-900"
      >
        Register
      </button>

      {error && <ErrorStrip error={error} />}
    </form>
  );
};

export default StaffForm;
