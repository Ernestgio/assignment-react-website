import "./index.scss";

export default function Transactions() {
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
      </table>
    </div>
  );
}
