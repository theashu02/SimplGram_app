import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify"; // for notify error password
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // toast position css
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  // for not give direct access 
   useEffect(() => {
     if (localStorage.getItem("chat-app-user")) {
       navigate("/");
     }
   }, []);


  const handleSubmit = async(event) => {
    event.preventDefault();
    // if this is true then call the api
    if (handleValidation()) {
      console.log("Validation", registerRoute);
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute,{
        username,
        email,
        password,
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate("/");
      }
    }
  };

  // for throwing error when password username email is invalid
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password should be the same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be graeter then 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or graeter then 8 characters",
        toastOptions
      );
      return false;
    } else if (email.length === 0) {
      toast.error("Email should not be empty", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContsiner>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="Logo" />
            <h1>SimpLchat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login page</Link>
          </span>
        </form>
      </FormContsiner>
      <ToastContainer />
    </>
  );
}

// style of the form

const FormContsiner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      curser: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
