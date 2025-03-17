import { useState, useEffect } from 'react'
import axios from axios

function App(){
     const [workshops, setWorkshops] = useState([])
     const [newWorshop, setNewWorkshop] = useState({ date: "", subject:""})

     useEffect(()=>{
          axios.get("http://127.0.0.1.8000/workshops/")
          .then(response => setWorkshops(response.data))
          .catch(error => console.error("Error fetching Workshops:", error))
     }, [])

     const handleInputChange = (e) => {
          setNewWorkshop({...newWorshop, [e.tatget.name]: e.target.value})
     }

     const addWorkshop = async()=> {
          await axios.post("http://127.0.0.1:8000/workshops/", newWorkshop)
          setWorkshops([...workshops, newWorshop])
          setNewWorkshop({date:"", subject:""})
     }
     return(
          <div>
               <h1>Codebar Workshops</h1>
               <input 
               type="text" 
               name="date"
               value={newWorkshop.date}
               placeholdwer="Date"
               onChange={handleInputChange}
               />
               <input 
               type="text" 
               name="subject"
               value={newWorkshop.subject}
               placeholdwer="Subject"
               onChange={handleInputChange}
               />
               <button onClick={addWorkshop}>Add Workshop</button>
               <ul> {workshops.map((workshops, index) => (
                    <li key={index}>{workshops.date} -  {workshops.subject}</li>
               ))} </ul>
          </div>
     )
}
export default App