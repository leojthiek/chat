import React from "react";
import "./registerPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/api";
import ErrorComponent from "../../component/errorcomponent/Errormessage";

export default function RegisterPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const navigate = useNavigate();


  const handleValidationErrors = (error) => {
    let errorMessage = "Registration failed";
    if (error.response && error.response.status === 400) {
      errorMessage = error.response.data.error;
    }
    setError(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

  

    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        navigate("/");
      } else {
        handleValidationErrors(error);
      }
    } catch (error) {
      handleValidationErrors(error);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-main">
        <h1 className="sign-in-header">Sign Up</h1>
        {error && <ErrorComponent error={error} />}
        <form className="signinForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign In</span>
        </p>
      </div>
    </div>
  );
}
