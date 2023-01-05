import moment from "moment";
import { TransactionData } from "../store/slices/transactionSlice";

export const convertToIdr = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(amount).replace("Rp", "IDR");
};

export const convertToNumString = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(amount).replace("Rp", "");
};

export const convertDate = (date: string): string => {
  const momentDate = moment(date, "YYYY-MM-DD kk:mm:ss.SSSSSS ZZ UTC", true);
  return moment.utc(momentDate).format("kk:mm - DD MMMM YYYY");
};

export const translateTransactions = (
  data: any,
  currentWallet: number
): TransactionData[] => {
  return data.map((transaction: any) => {
    let fromToUser: number;
    let transactionType: "DEBIT" | "CREDIT";

    if (transaction.to_wallet_id) {
      fromToUser =
        transaction.to_wallet_id === currentWallet
          ? transaction.wallet_id
          : transaction.to_wallet_id;
      transactionType =
        transaction.to_wallet_id === currentWallet ? "CREDIT" : "DEBIT";
    } else {
      fromToUser = transaction.source_of_fund_id;
      transactionType = "CREDIT";
    }

    return {
      id: transaction.id,
      to_wallet_id: transaction.to,
      from_to_user: fromToUser,
      amount: transaction.amount,
      description: transaction.description,
      created_at: transaction.created_at,
      type: transactionType,
    };
  });
};
