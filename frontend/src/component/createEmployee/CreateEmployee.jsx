import React from "react"
import "./createEmployee.css"
import { api } from "../../utils/api"
import ErrorComponent from "../errorcomponent/Errormessage"

export default function CreateEmployee() {
  const [formdata, setFormdata] = React.useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  })

  const [successMessage, setSuccessMessage] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState("")

  const userInfo = localStorage.getItem("dealsdray-user")
  const user = JSON.parse(userInfo)

  const handleValidationErrors = (error) => {
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.error)
    }
    setSuccessMessage("")
  }

  const [courseOptions, setCourseOptions] = React.useState({
    bca: false,
    mca: false,
    bsc: false,
  })

  const handleCheckboxChange = (option) => {
    setCourseOptions((prevOptions) => ({
      ...Object.fromEntries(Object.entries(prevOptions).map(([key]) => [key, false])),
      [option]: true,
    }));
  
    setFormdata((prevData) => ({
      ...prevData,
      course: [option],
    }));
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormdata({
      ...formdata,
      image: file,
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === "radio" ? (checked ? value : "") : value
    setFormdata({
      ...formdata,
      [name]: inputValue,
    })
  }

  const handleSubmit = async (e) => {
     e.preventDefault()

    const newFormData = new FormData()
  
    Object.entries(formdata).forEach(([key, value]) => {
      if (key === "course" && Array.isArray(value)) {
        value.forEach((course) => {
          newFormData.append(key, course)
        })
      } else {
        newFormData.append(key, value)
      }
    })

    try {
      const response = await api.post(
        "/employee/create-employee",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (response.status === 200) {
        setFormdata({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          course: "",
          image: null,
        })
        setSuccessMessage("Successfully created new Employee")
        setErrorMessage("")
      } else {
        handleValidationErrors(response)}
    } catch (error) {
       handleValidationErrors(error)
    }
  
  }
  

  return (
    <div className='createemployee-container'>
      <div className='createemployee-main'>
        <h1 className='createemployee-title'>Create Employee</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <ErrorComponent error={errorMessage} />}
        <form className='createemployee-form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='createemployee-input-text'
            placeholder='Name'
            name='name'
            value={formdata.name}
            onChange={handleInputChange}
          />
          <input
            type='email'
            className='createemployee-input-text'
            placeholder='Email'
            name='email'
            value={formdata.email}
            onChange={handleInputChange}
          />
          <input
            type='text'
            className='createemployee-input-text'
            placeholder='Mobile No.'
            name='mobile'
            value={formdata.mobile}
            onChange={handleInputChange}
          />
          <select
            className='createemployee-input-dropdown'
            name='designation'
            value={formdata.designation}
            onChange={handleInputChange}
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
                value='Male'
                checked={formdata.gender === "Male"}
                onChange={handleInputChange}
              />
              <span>Male</span>
              <input
                type='radio'
                name='gender'
                value='Female'
                checked={formdata.gender === "Female"}
                onChange={handleInputChange}
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
                checked={courseOptions.bca}
                onChange={() => handleCheckboxChange("bca")}
              />
              <span>BCA</span>
              <input
                type='checkbox'
                name='mca'
                checked={courseOptions.mca}
                onChange={() => handleCheckboxChange("mca")}
              />
              <span>MCA</span>
              <input
                type='checkbox'
                name='bsc'
                checked={courseOptions.bsc}
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
            <button className='createemployee-btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
