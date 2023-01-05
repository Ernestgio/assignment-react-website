import moment from "moment";

export const convertToIdr = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(amount);
};

export const convertDate = (date: string): string => {
  const momentDate = moment(date, "YYYY-MM-DD kk:mm:ss.SSSSSS ZZ UTC", true);
  return momentDate.format("kk:mm - DD MMMM YYYY");
};
