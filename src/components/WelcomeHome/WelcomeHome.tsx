import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchUser, UserDispatch } from "../../store/slices/userSlice";
import { convertToIdr } from "../../utils/converter";
import "./index.scss";

export default function WelcomeHome() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { userName, walletId, balance, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch: UserDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(cookies.token));
  }, []);

  return (
    <div className="welcome__container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p className="welcome__text">Good Morning, {userName}</p>
      <div className="flex__welcome">
        <p>Account: {walletId}</p>
        <p>Balance:</p>
      </div>
      <h2>{convertToIdr(balance)}</h2>
    </div>
  );
}
