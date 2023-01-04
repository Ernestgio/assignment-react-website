import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RootState } from "../../store";
import { fetchUser, UserDispatch } from "../../store/slices/userSlice";

import "./index.scss";

export default function TransferForm() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [amount, setAmount] = useState<number>(10000);
  const [destWalletId, setDestWalletId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const { walletId } = useSelector((state: RootState) => state.user);
  const dispatch: UserDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(cookies.token));
  }, []);

  return (
    <div className="fields__container">
      <form onSubmit={handleSubmit}>
        <h2>From</h2>
        <input
          type="number"
          required
          value={walletId}
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
          className={"input__amount " + (amount === 0 ? "error__input" : "")}
          type="number"
          required
          value={amount}
          onChange={handleAmtChange}
        />
        {amount === 0 && (
          <p className="error">Please insert amount of transfer</p>
        )}
        <h2>Description</h2>
        <input
          type="text"
          required
          value={description}
          onChange={handleDescChange}
          placeholder="Bayar Hutang"
        />

        <div></div>
        <input type="submit" className="button" value="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}
