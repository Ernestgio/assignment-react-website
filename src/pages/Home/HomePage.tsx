import Navbar from "../../components/Navbar/Navbar";
import Transactions from "../../components/Transactions/Transactions";
import WelcomeHome from "../../components/WelcomeHome/WelcomeHome";

import "./index.scss";

export default function HomePage() {
  return (
    <div className="container text__left">
      <Navbar />
      <WelcomeHome />
      <Transactions />
    </div>
  );
}
