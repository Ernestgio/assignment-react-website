import React from "react";
import { useNavigate } from "react-router-dom";
import { convertToNumString } from "../../utils/converter";
import "./index.scss";

export default function Modal(props: {
  show: boolean;
  onClose: () => void;
  context: string;
  to: number;
  from: number;
  description: string | undefined;
  amount: number;
  id: number | undefined;
}) {
  const navigate = useNavigate();

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
    navigate("/");
  };

  return (
    <div
      className="modal__screen"
      onClick={props.onClose}
      style={{
        display: props.show ? "block" : "none",
      }}
    >
      <div className="modal__container">
        <i className="fa-solid fa-circle-check"></i>
        <h1>{props.context} Success</h1>
        <div className="modal__detail__container">
          <div className="row__flex">
            <div>Amount</div>
            <div className="amount__text">
              {convertToNumString(props.amount)}
            </div>
          </div>
          <div className="row__flex">
            <div>TransactionId</div>
            <div>{props.id}</div>
          </div>
          <div className="row__flex">
            <div>From</div>
            <div>{props.from}</div>
          </div>
          <div className="row__flex">
            <div>To</div>
            <div>{props.to}</div>
          </div>
          <div className="row__flex">
            <div>Description</div>
            <div>{props.description}</div>
          </div>
        </div>
        <div className="button__flex">
          <button
            className="print__button"
            onClick={handlePrint}
            data-testid="print-button"
          >
            Print
          </button>
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
