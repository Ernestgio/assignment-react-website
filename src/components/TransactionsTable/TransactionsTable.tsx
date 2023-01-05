import { TransactionData } from "../../store/slices/transactionSlice";
import { convertDate, convertToNumString } from "../../utils/converter";

import "./index.scss";

export default function TransactionsTable(props: { data: TransactionData[] }) {
  return (
    <div style={{ overflow: "auto" }}>
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
          {props.data.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{convertDate(transaction.created_at)}</td>
                <td>{transaction.type}</td>
                <td>{transaction.from_to_user}</td>
                <td>{transaction.description}</td>
                <td
                  className={transaction.type === "CREDIT" ? "green__text" : ""}
                >
                  {(transaction.type === "CREDIT" ? "+" : "-") +
                    `${convertToNumString(transaction.amount)}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
