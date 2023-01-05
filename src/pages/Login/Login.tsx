import loginImg from "./login.png";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";

import "./index.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <div className="login__page__container">
      <div className="image__container">
        <img src={loginImg} alt="" />
      </div>
      <div className="container">
        <PublicNavbar />
      </div>

      <div className="login__form__container container">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
