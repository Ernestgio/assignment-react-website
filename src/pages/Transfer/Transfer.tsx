import Navbar from "../../components/Navbar/Navbar";
import TransferForm from "../../components/TransferForm/TransferForm";

import "./index.scss";

export default function Transfer() {
  return (
    <div className="container">
      <Navbar />
      <div className="transfer__page__container">
        <h1 data-testid="transfer-header">Transfer</h1>
        <TransferForm />
      </div>
    </div>
  );
}
