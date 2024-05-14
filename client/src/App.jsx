import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [empId, setEmpId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dept, setDept] = useState("");
  const [designation, setDesignation] = useState("");
  const [doj, setDoj] = useState(Date);
  const [salary, setSalary] = useState("");
  const [empData, setEmpData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async () => {
    const data = {
      empId: empId,
      firstName: firstName,
      lastName: lastName,
      department: dept,
      designation: designation,
      dateOfJoining: doj,
      salary: salary
    }
    // console.log(data)
    try {

      const res = await axios.post("http://localhost:3000/add-employee", data)
      if (res) {
        alert(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (empId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/delete-employee/${empId}`)
      if (res.status == 200) {
        alert("Employee data deleted")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const getEmpFirstLetters = (firstname, lastname) => {
    const firstNameFirstLetter = firstname.charAt(0)
    const lastNameFirstLetter = lastname.charAt(0)
    return `${firstNameFirstLetter.toUpperCase() + lastNameFirstLetter.toUpperCase()}`
  }

  const searchEmp = async (term) => {
    try {
      const res = await axios.get(`http://localhost:3000/search/${term}`)
      if (res) {
        setSearchResults(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    const fetchEmpDetails = async () => {
      try {
        const res = await axios.get("http://localhost:3000")
        if (res) {
          console.log(res.data)
          setEmpData(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchEmpDetails()
  }, [])

  return (

    <div>
      <nav className='nav-section'>

        <div className='profile-section'>
          <button className='profile-btn'>A</button>
        </div>

        <div className='input-section'>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" className='input-field' placeholder='Search' />
          <button type='submit' onClick={() => searchEmp(searchTerm)} className='search-btn'>Search</button>
        </div>

        <div className='add-btn-section'>
          <button onClick={handleModalToggle} className='add-btn'>+</button>
        </div>

      </nav>
      {/* nav ends */}

      <main className='view-section'>

        <div className='employee-title'>
          <p>EMPLOYEE</p>
        </div>
        {/* cards */}
        <div className='cards'>
          {
            empData.length > 0 && searchResults.length==0 ? empData.map((data, index) => (

              <div className='card' key={index}>
                <div className='emp-id-section'>
                  <p>{data.empId}</p>

                  <h2 className='avatar'>{getEmpFirstLetters(data.firstName, data.lastName)}</h2>
                </div>
                <div className='emp-details'>
                  <p>Name: {data.firstName}{" "}{data.lastName}</p>
                  <p>Designation: {data.designation}</p>
                  <p>Department: {data.department}</p>
                  <p>Date of Joining: {formatDate(data.dateOfJoining)}</p>
                  <p>Salary: {data.salary}/month</p>
                </div>
                <div className='emp-controls'>
                  <img src="https://cdn-icons-png.flaticon.com/512/5251/5251816.png" alt="Edit" />
                  <img src="https://w7.pngwing.com/pngs/220/888/png-transparent-computer-icons-button-encapsulated-postscript-viewing-text-logo-black-thumbnail.png" alt="View" />
                  <img onClick={() => handleDelete(data.empId)} src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="Delete" />
                </div>
              </div>
            )) : searchResults.length>0 && searchResults.map((data, index) => (

              <div className='card' key={index}>
                <div className='emp-id-section'>
                  <p>{data.empId}</p>

                  <h2 className='avatar'>{getEmpFirstLetters(data.firstName, data.lastName)}</h2>
                </div>
                <div className='emp-details'>
                  <p>Name: {data.firstName}{" "}{data.lastName}</p>
                  <p>Designation: {data.designation}</p>
                  <p>Department: {data.department}</p>
                  <p>Date of Joining: {formatDate(data.dateOfJoining)}</p>
                  <p>Salary: {data.salary}/month</p>
                </div>
                <div className='emp-controls'>
                  <img src="https://cdn-icons-png.flaticon.com/512/5251/5251816.png" alt="Edit" />
                  <img src="https://w7.pngwing.com/pngs/220/888/png-transparent-computer-icons-button-encapsulated-postscript-viewing-text-logo-black-thumbnail.png" alt="View" />
                  <img onClick={() => handleDelete(data.empId)} src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="Delete" />
                </div>
              </div>
            ))
          }

          {showModal && (
            <div className="modal">
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }} className="modal-content">
                <span className="close" onClick={handleModalToggle}>&times;</span>
                <h2>Edit Employee Details</h2>
                <input value={empId} onChange={(e) => {
                  setEmpId(e.target.value)
                }} type="text" placeholder="EmpId" />
                <input value={firstName} onChange={(e) => {
                  setFirstName(e.target.value)
                }} type="text" placeholder="Firstname" />
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Lastname" />
                <input value={designation} onChange={(e) => setDesignation(e.target.value)} type="text" placeholder="Designation" />
                <input value={dept} onChange={(e) => setDept(e.target.value)} type="text" placeholder="Department" />
                <input value={doj} onChange={(e) => setDoj(e.target.value)} type="Date" placeholder="Date of Joining" />
                <input value={salary} onChange={(e) => setSalary(e.target.value)} type="text" placeholder="Salary" />
                <button type='submit'>ADD</button>
              </form>
            </div>
          )}


        </div>

      </main>
    </div>

  )
}

export default App