import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { TransactionRequest } from "../../interfaces/api";
import { RootState } from "../../store";

import TransactionsTable from "../TransactionsTable/TransactionsTable";

import {
  fetchTransactions,
  TransactionDispatch,
} from "../../store/slices/transactionSlice";
import { fetchUser, UserDispatch } from "../../store/slices/userSlice";

import "./index.scss";
import { TimePeriod } from "../../enums/timePeriod";

export default function Transactions() {
  const [params, setParams] = useState<TransactionRequest>({
    page: 1,
    size: 10,
    sortBy: "date",
    sortDir: "desc",
    search: "",
    period: "",
  } as TransactionRequest);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { walletId } = useSelector((state: RootState) => state.user);
  const { count, data } = useSelector((state: RootState) => state.transaction);

  const dispatch: UserDispatch = useDispatch();
  const dispatchTransaction: TransactionDispatch = useDispatch();

  const [searchKey, setSearchKey] = useState<string>("");
  const [search] = useDebounce(searchKey, 500);

  useEffect(() => {
    dispatch(fetchUser(cookies.token));
    const requestParameters = {
      ...params,
      token: cookies.token,
      currentWallet: walletId,
    };
    dispatchTransaction(fetchTransactions(requestParameters));
  }, []);

  useEffect(() => {
    const requestParameters = {
      ...params,
      token: cookies.token,
      currentWallet: walletId,
    };
    dispatchTransaction(fetchTransactions(requestParameters));
  }, [params]);

  useEffect(() => {
    setParams({ ...params, search: search });
  }, [search]);

  const handlePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setParams({ ...params, period: value });
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setParams({ ...params, sortBy: value });
  };

  const handleSortDir = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setParams({ ...params, sortDir: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  return (
    <div className="transactions__container">
      <div className="transactions__slicer__container">
        <div className="date__slicer__container">
          <p>Show</p>
          <select
            className="form-select"
            value={params.period}
            onChange={handlePeriod}
          >
            <option value="Last 10 transactions">Last 10 transactions</option>
            <option value={TimePeriod.THIS_MONTH}>This month</option>
            <option value={TimePeriod.LAST_MONTH}>Last month</option>
            <option value={TimePeriod.THIS_YEAR}>This year</option>
            <option value={TimePeriod.LAST_YEAR}>Last year</option>
          </select>
        </div>
        <div className="other__slicer__container">
          <p>Sort By</p>
          <select
            className="form-select sort__column"
            value={params.sortBy}
            onChange={handleSortBy}
          >
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
          <select
            className="form-select"
            value={params.sortDir}
            onChange={handleSortDir}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="search"
              value={searchKey}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <TransactionsTable data={data} />

      <ul className="pagination">
        <li
          className={`page-item ${params.page === 1 ? "disabled" : ""}`}
          onClick={() => setParams({ ...params, page: params.page - 1 })}
          style={{
            display: params.page === 1 ? "none" : "block",
          }}
        >
          <p className="page-link">Previous</p>
        </li>
        <li
          className={`page-item`}
          onClick={() => setParams({ ...params, page: params.page - 1 })}
          style={{
            display: params.page - 1 < 1 ? "none" : "block",
          }}
        >
          <span className="page-link">{params.page - 1}</span>
        </li>
        <li className={`page-item active`}>
          <span className="page-link">{params.page}</span>
        </li>
        <li
          className={`page-item`}
          onClick={() => setParams({ ...params, page: params.page + 1 })}
          style={{
            display: count / params.size <= params.page ? "none" : "block",
          }}
        >
          <span className="page-link">{params.page + 1}</span>
        </li>
        <li
          className={`page-item `}
          onClick={() => setParams({ ...params, page: params.page + 1 })}
          style={{
            display: count / params.size <= params.page ? "none" : "block",
          }}
        >
          <p className="page-link">Next</p>
        </li>
      </ul>
    </div>
  );
}
