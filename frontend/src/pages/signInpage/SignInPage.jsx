import React from "react"
import "./signin.css"
import {useNavigate} from "react-router-dom"

import {api} from "../../utils/api"
import ErrorComponent from "../../component/errorcomponent/Errormessage"

export default function SignInPage() {
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")

  const [error, setError] = React.useState("")
  const [successMessage, setSuccessMessage] = React.useState("")

 const navigate = useNavigate()


  React.useEffect(()=>{
    if(localStorage.getItem('dealsdray-user')){
      navigate('/dashboard')
    }
  },[navigate])


  const handleValidationErrors = (error) => {
    let errorMessage = "Registration failed";
    if (error.response && error.response.status === 400) {
      errorMessage = error.response.data.error;
    }
    setError(errorMessage);
  };



  const handleSubmit = async(e) => {
     e.preventDefault()

     if(!email ||!password){
       setError("Please fill in all required fields.")
       return
     }
     try {
      const response = await api.post('/user/login',{email,password},{
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.status === 200) {
        localStorage.setItem('dealsdray-user', JSON.stringify(response.data.user));
        setSuccessMessage("Login Successfull");
        navigate("/dashboard");
      } else {
        handleValidationErrors(error);
      }
     } catch (error) {
       handleValidationErrors(error)
     }
  }
  return (
    <div className='sign-in-container'>
      <div className='sign-in-main'>
        <h1 className='sign-in-header'>Sign In</h1>
        {error && <ErrorComponent error={error}/>}
        <form className='signinForm' onSubmit={handleSubmit}>
          <input type='text' placeholder='Username' value={email} onChange={(e)=> setEmail(e.target.value)} />
          <input type='password' placeholder='Password'value={password} onChange={(e)=> setPassword(e.target.value)} />
          <button type='submit'>Sign In</button>
        </form>
        <p>Not yet register? <span onClick={(e)=> navigate('/register')}>Register</span></p>
      </div>
    </div>
  )
}
