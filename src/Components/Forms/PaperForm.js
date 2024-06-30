import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const PaperForm = () => {
  const { user } = useContext(UserContext);
  const [newPaper, setNewPaper] = useState({
    department: user.department,
    paper: "",
    year: "2023",
    students: [],
    semester: "Select Semester",
    teacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const list = await axios.get(`/staff/list/${user.department}`);
        setTeachers(list.data);
      } catch (err) {
        setError("Failed to fetch teachers.");
      }
    };
    getTeachers();
  }, [user]);

  const addPaper = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/paper", JSON.stringify(newPaper));
      navigate("../");
      toast.success(response.data.message);
    } catch (err) {
      setError("Failed to add paper.");
    }
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setNewPaper((prev) => ({ ...prev, [id]: value }));
  };

  if (user.role !== "HOD") {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="paper">
      <h2 className="mb-4 mt-3 text-4xl font-bold text-slate-50 underline">
        Add Paper
      </h2>
      <form className="w-full md:w-1/3" onSubmit={addPaper}>
        <label htmlFor="department">Department:</label>
        <input
          className="mb-4 block w-full p-2 rounded-md border"
          name="department"
          type="text"
          id="department"
          value={newPaper.department}
          disabled
        />

        <label htmlFor="paper">Paper:</label>
        <input
          className="mb-4 block w-full p-2 rounded-md border"
          type="text"
          name="paper"
          id="paper"
          value={newPaper.paper}
          required
          onChange={handleFormChange}
        />

        <label htmlFor="semester">Semester:</label>
        <select
          className="mb-4 block w-full p-2 rounded-md border"
          id="semester"
          value={newPaper.semester}
          required
          onChange={handleFormChange}
        >
          <option hidden>Select Semester</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
          <option value="V">V</option>
          <option value="VI">VI</option>
        </select>

        <label htmlFor="year">Year:</label>
        <input
          className="mb-4 block w-full p-2 rounded-md border"
          type="number"
          min="2000"
          max="2030"
          step="1"
          required
          id="year"
          value={newPaper.year}
          onChange={handleFormChange}
        />

        <label htmlFor="teacher">Teacher:</label>
        <select
          className="mb-4 block w-full p-2 rounded-md border"
          required
          id="teacher"
          name="teacher"
          value={newPaper.teacher}
          onChange={handleFormChange}
        >
          <option hidden>Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>

        <button
          className="mb-4 flex items-center gap-2 px-6 py-2 rounded-md border bg-slate-800 text-white hover:bg-slate-900"
          type="submit"
        >
          <FaPlus />
          Add
        </button>
      </form>
      {error && <ErrorStrip error={error} />}
    </main>
  );
};

export default PaperForm;
