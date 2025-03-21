import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [workshops, setWorkshops] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([])
  const [newWorkshop, setNewWorkshop] = useState({ date: "", subject: "" });
  const [newStudent, setNewStudent] = useState({ full_name: "", reason: "" });
  const [newInstructor, setNewInstructor] = useState({ full_name: "", bio: "", skills: [] });

  const handleInputChange = (e) => {
    setNewWorkshop({ ...newWorkshop, [e.target.name]: e.target.value });
  };
  const handleStudentInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };
  const handleInstructorInputChange = (e) => {
    setNewInstructor({ ...newInstructor, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/workshops")
      .then((response) => setWorkshops(response.data))
      .catch((error) => console.error("Error fetching Workshops:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching Workshops:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/instructors")
      .then((response) => setInstructors(response.data))
      .catch((error) => console.error("Error fetching Instructors:", error));
  }, []);

  const addStudent = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/students", newStudent);
      setStudents([...students, newStudent]);
      setNewStudent({ full_name: "", reason: "" });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const addWorkshop = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/workshops", newWorkshop);
      setWorkshops([...workshops, newWorkshop]);
      setNewWorkshop({ date: "", subject: "" });
    } catch (error) {
      console.error("Error adding workshop:", error);
    }
  };

  const addInstructor = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/instructors", newInstructor);
      setInstructors([...instructors, newInstructor]);
      setNewInstructor({ full_name: "", bio: "" });
    } catch (error) {
      console.error("Error adding instructor:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Codebar Workshops</h1>
        <input
          type="text"
          name="date"
          value={newWorkshop.date}
          placeholder="Date"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          value={newWorkshop.subject}
          placeholder="Subject"
          onChange={handleInputChange}
        />
        <button onClick={addWorkshop}>Add Workshop</button>
        <ul>
          {workshops.map((workshop, index) => (
            <li key={index}>
              {workshop.date} - {workshop.subject}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Codebar Students</h1>
        <input
          type="text"
          name="full_name"
          value={newStudent.full_name}
          placeholder="Name"
          onChange={handleStudentInputChange}
        />
        <input
          type="text"
          name="reason"
          value={newStudent.reason}
          placeholder="Reason"
          onChange={handleStudentInputChange}
        />
        <button onClick={addStudent}>Add Student</button>
        <ul>
          {students?.map((student, index) => (
            <li key={index}>
              {student.full_name} - {student.reason}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Codebar Instructors</h1>
        <input
          type="text"
          name="full_name"
          value={newInstructor.full_name}
          placeholder="Name"
          onChange={handleInstructorInputChange}
        />
        <input
          type="text"
          name="bio"
          value={newInstructor.bio}
          placeholder="Bio"
          onChange={handleInstructorInputChange}
        />
        <button onClick={addInstructor}>Add Instructor</button>
        <ul>
          {instructors?.map((instructor, index) => (
            <li key={index}>
              {instructor.full_name} - {instructor.bio}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
