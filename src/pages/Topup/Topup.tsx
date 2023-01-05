import Navbar from "../../components/Navbar/Navbar";
import TopupForm from "../../components/TopupForm/TopupForm";

import "./index.scss";

export default function Topup() {
  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="topup__page__container">
        <h1>Topup</h1>
        <TopupForm />
      </div>
    </div>
  );
}
