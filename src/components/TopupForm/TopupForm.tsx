import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { RootState } from "../../store";
import {
  fetchSources,
  FundSourceDispatch,
} from "../../store/slices/fundSourceSlice";
import { fetchUser, UserDispatch } from "../../store/slices/userSlice";
import { makeTopupRequest } from "../../utils/httpRequest";

import "./index.scss";

export default function TopupForm() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [amount, setAmount] = useState<number>(50000);
  const [sourceOfFund, setSourceOfFund] = useState<number>(1);

  const { walletId } = useSelector((state: RootState) => state.user);
  const { sources } = useSelector((state: RootState) => state.fundSource);

  const dispatch: UserDispatch = useDispatch();
  const dispatchFundSource: FundSourceDispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await makeTopupRequest(
      amount,
      sourceOfFund,
      cookies.token
    );

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

  const handleAmtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceOfFund(Number(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchUser(cookies.token));
    dispatchFundSource(fetchSources(cookies.token));
  }, []);

  return (
    <div className="fields__container">
      <form onSubmit={handleSubmit}>
        <h2>From</h2>
        <select
          className="form-select form-select-sm"
          required
          value={sourceOfFund}
          onChange={handleSourceChange}
        >
          {sources.map((source) => {
            return (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            );
          })}
        </select>
        <h2>To</h2>
        <input
          type="number"
          required
          value={walletId}
          disabled={true}
          className="disabled"
        />
        <h2>Amount</h2>
        <input
          className="input__amount"
          type="tel"
          required
          value={amount}
          onChange={handleAmtChange}
          placeholder="50000"
          min={50000}
        />
        {amount < 50000 && (
          <p className="error">
            Please enter a Minimum of Rp 50.000,00 for topup
          </p>
        )}
        <div></div>
        <input type="submit" className="button" value="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}
