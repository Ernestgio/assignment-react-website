import moment from "moment";
import { TimePeriod } from "../enums/timePeriod";
import { TransactionData } from "../store/slices/transactionSlice";

export const filterTransactions = (
  transactions: TransactionData[],
  period: string
): TransactionData[] => {
  const thisMonth: number = new Date().getMonth();
  const thisYear: number = new Date().getFullYear();

  const filtered = transactions.filter((transaction) => {
    const momentDate = moment(
      transaction.created_at,
      "YYYY-MM-DD kk:mm:ss.SSSSSS ZZ UTC",
      true
    );
    const transactionMonth = momentDate.month();
    const transactionYear = momentDate.year();

    switch (period) {
      case TimePeriod.THIS_MONTH:
        return transactionMonth === thisMonth && transactionYear === thisYear;
      case TimePeriod.LAST_MONTH:
        return (
          transactionMonth === (thisMonth === 0 ? 12 : thisMonth - 1) &&
          transactionYear === thisYear
        );
      case TimePeriod.THIS_YEAR:
        return transactionYear === thisYear;
      case TimePeriod.LAST_YEAR:
        return transactionYear === thisYear - 1;
      default:
        return true;
    }
  });

  return filtered;
};
