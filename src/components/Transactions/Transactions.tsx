import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { TransactionRequest } from "../../interfaces/api";
import { RootState } from "../../store";
import {
  fetchTransactions,
  TransactionDispatch,
} from "../../store/slices/transactionSlice";
import { fetchUser, UserDispatch } from "../../store/slices/userSlice";
import { convertDate } from "../../utils/converter";
import "./index.scss";

export default function Transactions() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { walletId } = useSelector((state: RootState) => state.user);
  const { page, count, size, data } = useSelector(
    (state: RootState) => state.transaction
  );

  const dispatch: UserDispatch = useDispatch();
  const dispatchTransaction: TransactionDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(cookies.token));
    const requestParams: TransactionRequest = {
      page,
      size,
      count,
      currentWallet: walletId,
      sortBy: "date",
      sortDirection: "desc",
      token: cookies.token,
    };
    dispatchTransaction(fetchTransactions(requestParams));
  }, []);

  return (
    <div className="transactions__container">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <td>Date & Time</td>
            <td>Type</td>
            <td>From / To</td>
            <td>Description</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{convertDate(transaction.created_at)}</td>
                <td>{transaction.type}</td>
                <td>{transaction.from_to_user}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
