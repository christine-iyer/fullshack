import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [workshops, setWorkshops] = useState([]);
  const [newWorkshop, setNewWorkshop] = useState({ date: "", subject: "" });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/workshops")
      .then((response) => setWorkshops(response.data))
      .catch((error) => console.error("Error fetching Workshops:", error));
  }, []);

  const handleInputChange = (e) => {
    setNewWorkshop({ ...newWorkshop, [e.target.name]: e.target.value });
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

  return (
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
  );
}

export default App;
