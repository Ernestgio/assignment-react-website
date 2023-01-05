import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeLoginRequest } from "../../utils/httpRequest";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await makeLoginRequest(email, password);

    if (response?.data?.token) {
      setCookie("token", response?.data?.token, { path: "/" });
      toast("Login Successfull!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
      return;
    }

    toast(response?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="register__fields__container">
      <form onSubmit={handleSubmit}>
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
          placeholder="password"
        />
        {password.length === 0 && <p className="error">Password is required</p>}
        <div></div>
        <input type="submit" className="button" value="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}
