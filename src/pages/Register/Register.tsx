import registerimg from "./register.png";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";

import "./index.scss";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
export default function Register() {
  return (
    <div className="register__page__container">
      <div className="image__container">
        <img src={registerimg} alt="" />
      </div>
      <div className="container">
        <PublicNavbar />
      </div>

      <div className="form__container container">
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
