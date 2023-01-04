import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { makeRegisterRequest } from "../../utils/httpRequest";
import { validateRegister } from "../../utils/validateRequest";

import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameArr = name.split(" ");

    validateRegister(nameArr);

    const firstName = nameArr[0];
    const lastName = nameArr[nameArr.length - 1];

    const data = await makeRegisterRequest(
      firstName,
      lastName,
      email,
      password
    );

    clearForm();
    toast(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      if (data.code === 201) {
        navigate("/login");
      }
    }, 3000);
  };

  return (
    <div className="fields__container">
      <form onSubmit={handleSubmit}>
        <h2>Name</h2>
        <input
          type="text"
          placeholder="Asep Budianto Chandra"
          required
          value={name}
          onChange={handleNameChange}
          className={name.length === 0 ? "error__input" : ""}
        />
        {name.length === 0 && <p className="error">Name is required</p>}
        <h2>Email</h2>
        <input
          type="email"
          placeholder="asep.bs@gmail.com"
          required
          value={email}
          onChange={handleEmailChange}
          className={email.length === 0 ? "error__input" : ""}
        />
        {email.length === 0 && <p className="error">email is required</p>}
        <h2>Password</h2>
        <input
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
          minLength={8}
          className={password.length === 0 ? "error__input" : ""}
        />
        {password.length === 0 && <p className="error">Password is required</p>}
        <div></div>
        <input type="submit" className="button" value="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}
