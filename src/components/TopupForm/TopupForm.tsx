import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RootState } from "../../store";
import { fetchUser, UserDispatch } from "../../store/slices/userSlice";

import "./index.scss";

export default function TopupForm() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { walletId } = useSelector((state: RootState) => state.user);

  const dispatch: UserDispatch = useDispatch();

  const [amount, setAmount] = useState<number>(10000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAmtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchUser(cookies.token));
  }, []);

  return (
    <div className="fields__container">
      <form onSubmit={handleSubmit}>
        <h2>From</h2>
        <select className="form-select" required name="category">
          <option value="Web development">Web Dev</option>
          <option value="Biography">Biography</option>
          <option value="Fiction">Fiction</option>
        </select>
        <h2>To</h2>
        <input type="number" required value={walletId} disabled={true} />
        <h2>Amount</h2>
        <input
          className="input__amount form-select"
          type="tel"
          required
          value={amount}
          onChange={handleAmtChange}
        />
        <div></div>
        <input type="submit" className="button" value="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}
