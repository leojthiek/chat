import React, { useState, useEffect } from "react"
import "./editEmployee.css"
import { api } from "../../utils/api"
import ErrorComponent from "../errorcomponent/Errormessage"

export default function EditEmployee({ employeeId }) {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  })

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const userInfo = localStorage.getItem("dealsdray-user")
  const user = JSON.parse(userInfo)

  useEffect(() => {
    async function getOneEmployee() {
      try {
        const response = await api.get("/employee/one-employee", {
          params: { employeeId },
          headers: { Authorization: `Bearer ${user.token}` },
        })

        if (response.status === 200) {
          setFormdata(response.data.existingEmployee)
        } else {
          alert(response.data.error)
        }
      } catch (error) {
        console.error("Error fetching employee data:", error)
      }
    }

    getOneEmployee()
  }, [user.token, employeeId])

  const [courseOptions, setCourseOptions] = useState({
    bca: false,
    mca: false,
    bsc: false,
  })

  const handleCheckboxChange = (option) => {
    setCourseOptions((prevOptions) => ({
      ...Object.fromEntries(
        Object.entries(prevOptions).map(([key]) => [key, false])
      ),
      [option]: true,
    }))

    setFormdata((prevData) => ({
      ...prevData,
      course: [option],
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormdata({
      ...formdata,
      image: file,
    })
  }

  const handleValidationErrors = (error) => {
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const newForm = new FormData()

      Object.entries(formdata).forEach(([key, value]) => {
        newForm.append(key, value);
      });
      

      const response = await api.put(`/employee/update-employee`, newForm, {
        params: { employeeId },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      
      });
      

      if (response.status === 200) {
        setSuccessMessage("Updated Employee successfully")
        setFormdata({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          course: "",
          image: null,
        })
      } else {
        handleValidationErrors(response)
      }
    } catch (error) {
      handleValidationErrors(error.message)
    }
  }

  return (
    <div className='createemployee-container'>
      <div className='createemployee-main'>
        <h1 className='createemployee-title'>Update Employee</h1>
        {errorMessage && <ErrorComponent error={errorMessage}/>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className='createemployee-form' onSubmit={handleUpdate}>
          <input
            type='text'
            className='createemployee-input-text'
            placeholder='Name'
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
          />
          <input
            type='email'
            className='createemployee-input-text'
            placeholder='Email'
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
          />
          <input
            type='text'
            className='createemployee-input-text'
            placeholder='Mobile No.'
            value={formdata.mobile}
            onChange={(e) =>
              setFormdata({ ...formdata, mobile: e.target.value })
            }
          />
          <select
            className='createemployee-input-dropdown'
            value={formdata.designation}
            onChange={(e) =>
              setFormdata({ ...formdata, designation: e.target.value })
            }
          >
            <option value=''>Designation</option>
            <option value='Manager'>Manager</option>
            <option value='HR'>Hiring Manager</option>
            <option value='Sales'>Sales</option>
          </select>
          <div>
            <p className='createemployee-radio-title'>What is your Gender?</p>
            <div className='createemployee-input-radio-container'>
              <input
                type='radio'
                name='gender'
                value={formdata.gender}
                checked={formdata.gender === "Male"}
                onChange={(e) =>
                  setFormdata({ ...formdata, gender: e.target.checked })
                }
              />
              <span>Male</span>
              <input
                type='radio'
                name='gender'
                value={formdata.gender}
                checked={formdata.gender === "Female"}
                onChange={(e) =>
                  setFormdata({ ...formdata, gender: e.target.checked })
                }
              />
              <span>Female</span>
            </div>
          </div>
          <div>
            <p className='createemployee-checkbox-title'>Select Education:</p>
            <div className='createemployee-input-radio-container'>
              <input
                type='checkbox'
                name='bca'
                checked={formdata.course.includes("bca")}
                onChange={() => handleCheckboxChange("bca")}
              />
              <span>BCA</span>
              <input
                type='checkbox'
                name='mca'
                checked={formdata.course.includes("mca")}
                onChange={() => handleCheckboxChange("mca")}
              />
              <span>MCA</span>
              <input
                type='checkbox'
                name='bsc'
                checked={formdata.course.includes("bsc")}
                onChange={() => handleCheckboxChange("bsc")}
              />
              <span>BSC</span>
            </div>
          </div>
          <div>
            <p className='createemployee-file-title'>Upload Image:</p>
            <input
              type='file'
              accept='image/jpg,image/png'
              className='createemployee-file-input'
              onChange={handleFileChange}
            />
          </div>
          <div className='createemployee-btn-container'>
            <button type='submit' className='createemployee-btn'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
