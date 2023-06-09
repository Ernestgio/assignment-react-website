import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RootState } from "../../store";
import { fetchUser, UserDispatch } from "../../store/slices/userSlice";
import { makeTransferRequest } from "../../utils/httpRequest";
import Modal from "../Modal/Modal";

import "./index.scss";

export default function TransferForm() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [amount, setAmount] = useState<number>(0);
  const [destWalletId, setDestWalletId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [successFullTransactionId, setSuccessFullTransactionId] = useState<
    number | undefined
  >(0);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await makeTransferRequest(
      amount,
      destWalletId,
      description,
      cookies.token
    );

    setSuccessFullTransactionId(response?.data?.id);

    if (response?.code === 201) {
      setSuccessFullTransactionId(response?.data?.id);
      clearForm();
      setShowModal(true);
      return;
    }

    toast(`Transaction ${response?.message}`, {
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

  const clearForm = () => {
    setAmount(0);
    setDestWalletId(0);
    setDescription("");
  };

  const handleAmtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleDestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestWalletId(Number(e.target.value));
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const { walletId, balance } = useSelector((state: RootState) => state.user);
  const dispatch: UserDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(cookies.token));
  }, [cookies.token, dispatch]);

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="fields__container">
      <form onSubmit={handleSubmit}>
        <h2>From</h2>
        <input
          type="tel"
          required
          value={walletId}
          data-testid="from-input"
          disabled={true}
          className="disabled"
        />
        <h2>To</h2>
        <input
          type="number"
          required
          value={destWalletId}
          onChange={handleDestChange}
        />
        <h2>Amount</h2>
        <input
          data-testid="amount-input"
          className={"input__amount " + (amount === 0 ? "error__input" : " ")}
          type="tel"
          required
          value={amount}
          onChange={handleAmtChange}
          min={10000}
        />
        {amount === 0 && (
          <p className="error" data-testid="amount-empty-warning">
            Please insert amount of transfer
          </p>
        )}
        {amount < 10000 && amount > 0 && (
          <p className="error" data-testid="amount-value-warning">
            Please enter a Minimum of Rp 10.000,00 for transfer
          </p>
        )}

        {amount > balance && (
          <p data-testid="insufficient-balance-warning" className="error">
            Insufficient balance
          </p>
        )}
        <h2>Description</h2>
        <input
          type="text"
          value={description}
          onChange={handleDescChange}
          placeholder="Bayar Hutang"
        />

        <div></div>
        <input type="submit" className="button" value="submit" />
      </form>
      <ToastContainer />
      <Modal
        show={showModal}
        onClose={handleModalClose}
        context="Transfer"
        to={destWalletId}
        from={walletId}
        amount={amount}
        description={description}
        id={successFullTransactionId}
      />
    </div>
  );
}
